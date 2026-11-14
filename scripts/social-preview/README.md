# Social preview artwork

Typography-first editorial stationery using the site's Cormorant Garamond and Noto Serif Armenian fonts, champagne palette and existing sweet-pea artwork. The portrait is not used or modified. Armenian initials are copied from the invitation configuration. English text follows the requested preview copy.

## Regenerate

Requires installed project dependencies (`npm ci`) and Python 3 with Pillow (tested with Pillow 13.0.0 and FreeType WOFF support). No network access is used by rendering.

```sh
python3 scripts/social-preview/render.py
npm run build
python3 scripts/social-preview/verify.py
```

The renderer writes `public/og-preview.jpg` and the review-only `scripts/social-preview/mobile-preview.jpg`. Both are actual JPEGs. Source art remains in `public/images/sweet-pea-stationery.png`; fonts are read from the existing @fontsource dependencies. Fixed random seed makes the paper grain reproducible. Main output is 1200 × 630, 66,984 bytes in the tested environment. Quality 92, progressive JPEG, RGB. Names fit centrally with generous margins; arbitrary square crops may truncate decorations, which carry no information.

## Verified

TypeScript and Vite build passed. Verification checks the built HTML's 15 required social tags, uniqueness, matching descriptions/titles, production URLs, preserved noindex meta, JPEG encoding/dimensions/size and exact copy to dist. Full image and 360 × 189 rendering were visually inspected. No src files, dependencies, server configuration, deployment files or existing images changed.

A read-only request to the existing production page returned HTTP 200, Content-Type text/html, and X-Robots-Tag: noindex, nofollow. This task does not modify that header. No production deployment was performed.

## After deployment

Check that `/og-preview.jpg` returns HTTP 200 with Content-Type image/jpeg and that the production HTML contains the new tags, including for messaging crawler user agents. Share the production URL in the target apps to verify their current rendering and cached preview behavior. These live checks cannot validate the new artwork until deployment; platform caching and crop behavior may vary. No DNS, Nginx, SSL, robots/sitemap or authentication changes are needed by this artifact.
