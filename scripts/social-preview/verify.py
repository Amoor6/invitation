"""Run after npm run build; requires Pillow."""
from pathlib import Path
from html.parser import HTMLParser
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]
BASE='https://biayna-adrik.armac-group.ir/'
class Meta(HTMLParser):
 def __init__(self): super().__init__(); self.tags={}
 def handle_starttag(self,tag,attrs):
  if tag!='meta':return
  a=dict(attrs);key=a.get('property',a.get('name'))
  if key:
   assert key not in self.tags, f'Duplicate metadata: {key}'
   self.tags[key]=a.get('content')
p=Meta();p.feed((ROOT/'dist/index.html').read_text());m=p.tags
required=['og:type','og:title','og:description','og:url','og:image','og:image:secure_url','og:image:width','og:image:height','og:image:type','og:image:alt','og:site_name','twitter:card','twitter:title','twitter:description','twitter:image']
assert all(m.get(k) for k in required)
assert m['robots']=='noindex,nofollow'
assert m['og:url']==BASE
for k in ['og:image','og:image:secure_url','twitter:image']:assert m[k]==BASE+'og-preview.jpg'
assert (m['og:image:width'],m['og:image:height'],m['og:image:type'])==('1200','630','image/jpeg')
assert m['twitter:card']=='summary_large_image'
assert m['og:title']==m['twitter:title']
assert m['og:description']==m['twitter:description']==m['description']
for folder in ['public','dist']:
 path=ROOT/folder/'og-preview.jpg'
 with Image.open(path) as im:
  assert im.format=='JPEG' and im.size==(1200,630)
  im.verify()
 assert path.stat().st_size<300_000
assert (ROOT/'public/og-preview.jpg').read_bytes()==(ROOT/'dist/og-preview.jpg').read_bytes()
print('PASS: JPEG encoding, 1200×630, <300 KB, dist copy, all 15 social tags, no duplicates, production URLs and noindex.')
