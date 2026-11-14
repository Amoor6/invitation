"""Run from any directory: python3 scripts/social-preview/render.py (Pillow required)."""
from pathlib import Path
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
ROOT = Path(__file__).resolve().parents[2]
S=2
W,H=1200,630
rng=random.Random(27)
im=Image.new('RGB',(W*S,H*S),'#f0e3cc')
# Fine paper grain, reproducible and deliberately subtle.
pixels=im.load()
for y in range(H*S):
 for x in range(W*S):
  n=rng.choice((-1,0,0,0,1));pixels[x,y]=(240+n,227+n,204+n)
shadow=Image.new('RGBA',im.size); d=ImageDraw.Draw(shadow)
d.rounded_rectangle((45*S,40*S,1155*S,602*S),radius=6*S,fill=(89,69,46,34))
im=Image.alpha_composite(im.convert('RGBA'),shadow.filter(ImageFilter.GaussianBlur(14*S)))
card=Image.new('RGB',(1112*S,546*S),'#fdf2e3')
asset=Image.open(ROOT/'public/images/sweet-pea-stationery.png').convert('RGB').resize((560*S,840*S),Image.Resampling.LANCZOS)
# Recompose existing botanical corners without distorting petal proportions.
for box,pos in [((280*S,0,560*S,330*S),(832*S,0)),((0,510*S,280*S,840*S),(0,216*S))]:
 patch=asset.crop(box); mask=Image.new('L',patch.size); mp=mask.load()
 for y in range(patch.height):
  for x in range(patch.width):
   edge=min(x,patch.width-1-x,y,patch.height-1-y)/(42*S)
   mp[x,y]=int(220*max(0,min(1,edge)))
 card.paste(patch,pos,mask)
im.paste(card,(44*S,38*S));d=ImageDraw.Draw(im)
d.rounded_rectangle((65*S,59*S,1135*S,563*S),radius=3*S,outline='#cfb994',width=S)
fontdir=ROOT/'node_modules/@fontsource'
def font(f,size):return ImageFont.truetype(str(fontdir/f),size*S)
latin='cormorant-garamond/files/cormorant-garamond-latin-400-normal.woff'
armenian='noto-serif-armenian/files/noto-serif-armenian-armenian-400-normal.woff'
def centered(text,y,f,color):
 box=d.textbbox((0,0),text,font=f);width=box[2]-box[0]
 assert width<940*S
 d.text(((W*S-width)/2,y*S-box[1]),text,font=f,fill=color)
centered('Բ · Ա',130,font(armenian,32),'#826343')
centered('Biayna & Adrik',231,font(latin,104),'#59452e')
d.line((552*S,366*S,582*S,366*S),fill='#ad8c5b',width=S)
d.polygon([(600*S,361*S),(605*S,366*S),(600*S,371*S),(595*S,366*S)],outline='#ad8c5b')
d.line((618*S,366*S,648*S,366*S),fill='#ad8c5b',width=S)
centered('Engagement Invitation',410,font(latin,40),'#6c5942')
im=im.convert('RGB').resize((W,H),Image.Resampling.LANCZOS)
out=ROOT/'public/og-preview.jpg';im.save(out,'JPEG',quality=92,optimize=True,progressive=True,subsampling=0)
im.resize((360,189),Image.Resampling.LANCZOS).save(ROOT/'scripts/social-preview/mobile-preview.jpg',quality=92)
print(f'{out}: {out.stat().st_size:,} bytes')
