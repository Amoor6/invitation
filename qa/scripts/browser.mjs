import {chromium} from 'playwright';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true});
const errors=[];const results=[];
for(const width of [320,375,390,430,768,1440]){
const page=await browser.newPage({viewport:{width,height:900},hasTouch:width<768,isMobile:width<768});
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto('http://127.0.0.1:4173');await page.evaluate(()=>document.fonts.ready);
await page.screenshot({path:`qa/screenshots/envelope-${width}.png`});
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
if(width<768)await page.locator('button').tap();else await page.locator('button').click();
await page.locator('.hero').waitFor();await page.waitForTimeout(1100);
assert(await page.locator('h1').evaluate(e=>e===document.activeElement));
assert(await page.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0));
assert(await page.evaluate(()=>document.fonts.check('16px "Noto Serif Armenian"','Արամ')));
for(const selector of ['.hero','.details','.countdown','footer']){await page.locator(selector).scrollIntoViewIfNeeded();await page.waitForTimeout(1000);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(width===390||width===1440)await page.locator(selector).screenshot({path:`qa/screenshots/${selector.replace('.','')}-${width}.png`});}
assert(await page.evaluate(()=>scrollY>0));assert.equal(await page.locator('a.map-button').count(),0);
const values=await page.locator('.digits span').allTextContents();const actual=values.map(Number).reduce((a,v,i)=>a+v*[86400,3600,60,1][i],0);assert(Math.abs(actual-(Date.parse('2027-06-19T14:00:00Z')-Date.now())/1000)<3);
results.push({width,passed:true,image:await page.locator('img').evaluate(e=>e.currentSrc)});await page.close();}
const p=await browser.newPage({reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4173');await p.keyboard.press('Tab');assert.equal(await p.locator('button').evaluate(e=>e===document.activeElement),true);await p.keyboard.press('Enter');await p.locator('.hero').waitFor({timeout:1000});
await p.reload();await p.locator('button').focus();await p.keyboard.press('Space');await p.locator('.hero').waitFor({timeout:1000});
assert.deepEqual(errors,[]);console.log(JSON.stringify({results,errors,keyboard:true,reducedMotion:true},null,2));await browser.close();
