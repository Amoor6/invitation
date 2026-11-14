import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion} from 'motion/react';
import {ArrowDown, Hand} from 'lucide-react';
import {Temporal} from '@js-temporal/polyfill';
import '@fontsource/noto-serif-armenian/armenian-400.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import {invitation as c} from './config/invitation';
import './style.css';
const event = Temporal.PlainDateTime.from(c.date).toZonedDateTime(c.timezone,{disambiguation:'reject'});
const date = new Date(Number(event.epochMilliseconds));
const monthName = ['հունվար','փետրվար','մարտ','ապրիլ','մայիս','հունիս','հուլիս','օգոստոս','սեպտեմբեր','հոկտեմբեր','նոյեմբեր','դեկտեմբեր'][event.month-1];
function Ornament(){return <svg aria-hidden="true" viewBox="0 0 180 36" className="ornament"><path d="M4 18h50m72 0h50M64 18l26-13 26 13-26 13zM74 18l16-8 16 8-16 8zM54 18l8-5m-8 5 8 5m64-5-8-5m8 5-8 5" fill="none" stroke="currentColor" strokeWidth=".85"/><circle cx="90" cy="18" r="2" fill="currentColor"/></svg>}
function Reveal({children,className=''}:{children:React.ReactNode,className?:string}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.9}}>{children}</motion.div>}
function Countdown(){const [remaining,setRemaining]=useState(()=>Math.max(0,Number(event.epochMilliseconds)-Date.now()));useEffect(()=>{const id=setInterval(()=>{const n=Math.max(0,Number(event.epochMilliseconds)-Date.now());setRemaining(n);if(!n)clearInterval(id)},1000);return()=>clearInterval(id)},[]);const s=Math.floor(remaining/1000);return <section className="countdown"><Reveal><h2>Մինչ մեր գեղեցիկ օրը</h2>{remaining>0?<div className="digits" role="timer" aria-label="Մնացած ժամանակը">{[Math.floor(s/86400),Math.floor(s/3600)%24,Math.floor(s/60)%60,s%60].map((v,i)=><div key={i}><span>{String(v).padStart(2,'0')}</span><small>{['օր','ժամ','րոպե','վայրկյան'][i]}</small></div>)}</div>:<p>{c.celebration}</p>}</Reveal></section>}
function EnvelopePocket(){return <svg className="pocket" aria-hidden="true" viewBox="0 0 430 280" preserveAspectRatio="none">
<defs>
<linearGradient id="pocketLeft" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stopColor="#edddc2"/>
<stop offset="100%" stopColor="#dfcba9"/>
</linearGradient>
<linearGradient id="pocketRight" x1="100%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" stopColor="#ebd9ba"/>
<stop offset="100%" stopColor="#dcc6a2"/>
</linearGradient>
<linearGradient id="pocketBottom" x1="50%" y1="0%" x2="50%" y2="100%">
<stop offset="0%" stopColor="#f0e0c4"/>
<stop offset="100%" stopColor="#dfcba9"/>
</linearGradient>
</defs>
{/* Subtle shadow along the V throat edge */}
<path d="M0 2L215 170L430 2" fill="none" stroke="rgba(96,64,52,0.14)" strokeWidth="3"/>
{/* Left and right side folds */}
<path d="M0 0L215 168L0 280Z" fill="url(#pocketLeft)" stroke="#dfd0be" strokeWidth=".8"/>
<path d="M430 0L215 168L430 280Z" fill="url(#pocketRight)" stroke="#dfd0be" strokeWidth=".8"/>
{/* Soft diagonal crease shadow under bottom fold */}
<path d="M0 280L200 150Q215 140 230 150L430 280Z" fill="rgba(110,78,60,0.08)" transform="translate(0 -2)"/>
{/* Bottom overlapping fold */}
<path d="M0 280L200 152Q215 142 230 152L430 280Z" fill="url(#pocketBottom)" stroke="#e6d7c6" strokeWidth=".9"/>
</svg>}
function EnvelopeFlap(){return <svg className="flap" aria-hidden="true" viewBox="0 0 430 174" preserveAspectRatio="none">
<defs>
<linearGradient id="flapGrad" x1="50%" y1="0%" x2="50%" y2="100%">
<stop offset="0%" stopColor="#efdfc3"/>
<stop offset="70%" stopColor="#e7d3b1"/>
<stop offset="100%" stopColor="#ddc5a0"/>
</linearGradient>
</defs>
<path d="M0 0L430 0L229 162Q215 172 201 162Z" fill="url(#flapGrad)" stroke="#decbb8" strokeWidth="1"/>
<path d="M22 4L215 151L408 4" fill="none" stroke="rgba(164,124,114,0.28)" strokeWidth=".9" strokeDasharray="3 2"/>
</svg>}
function App(){const [phase,setPhase]=useState<'closed'|'opening'|'open'>('closed');const reduce=useReducedMotion();const heading=useRef<HTMLHeadingElement>(null);useEffect(()=>{if(phase==='opening'){const id=setTimeout(()=>setPhase('open'),2250);return()=>clearTimeout(id)}if(phase==='open')heading.current?.focus()},[phase]);return <>{phase!=='open'?<main className={`intro ${phase}`}><button className={`envelope ${phase}`} disabled={phase==='opening'} onClick={()=>setPhase(reduce?'open':'opening')} aria-label={`${c.initials} — Մեր պատմության նոր էջը — Բացել հրավերը`}><span className="envelope-back"/><span className="letter"><span className="letter-frame"><Ornament/><span className="letter-initials">{c.initials}</span><span className="letter-names">{c.names.armenian.join(' և ')}</span><small>Մեր պատմության նոր էջը</small></span></span><EnvelopePocket/><EnvelopeFlap/><span className="seal"><span className="seal-ring">{c.initials}</span></span></button><button className="tap-indicator" disabled={phase==='opening'} onClick={()=>setPhase(reduce?'open':'opening')} aria-label="Բացել հրավերը"><Hand size={23} strokeWidth={1.3} aria-hidden="true"/></button></main>:<motion.main className="page" initial={reduce?false:{opacity:0}} animate={{opacity:1}} transition={{duration:.75,ease:'easeOut'}}><header><span>{c.initials}</span><span>ՆՇԱՆԱԴՐՈՒԹՅՈՒՆ</span><span>{new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'2-digit',year:'2-digit',timeZone:c.timezone}).format(date)}</span></header><section className="hero"><div className="hero-copy"><Reveal><Ornament/><h1 ref={heading} tabIndex={-1}><span>{c.names.armenian[0]}</span><em>և</em><span>{c.names.armenian[1]}</span></h1><div className="rule"/><p className="occasion">Մենք նշանադրվում ենք</p><p className="hero-date">{`${event.day} ${monthName} · ${event.year}`}</p></Reveal></div><Reveal className="portrait-wrap"><div className="portrait-border"><img src={c.image} style={{objectPosition:c.focalPoint}} width="1024" height="1536" alt="Զույգի տրամադրված լուսանկարը"/></div></Reveal><a className="scroll" href="#invitation" aria-label="Կարդալ հրավերը"><ArrowDown size={18}/></a></section><section id="invitation" className="invitation-section" aria-label="Նշանադրության հրավեր"><Reveal className="invitation-card"><div className="card-content"><p className="card-families">{c.families}</p><p className="card-introduction">{c.introduction}</p><h2 className="card-names">{c.invitationNames}</h2><p className="card-message">{c.message}</p><p className="card-closing">{c.closing}</p></div></Reveal></section><Countdown/><footer className="compact-footer"><p>{c.names.armenian.join(' և ')} · {event.year}</p><a className="creator-credit" href="https://github.com/Amoor6" target="_blank" rel="noopener noreferrer">© {new Date().getFullYear()} Amoor6</a></footer></motion.main>}</>};
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
