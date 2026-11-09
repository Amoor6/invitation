# Armenian engagement invitation

Local client preview. No deployment has been performed.

## Run

Use Node 22.12+ and npm. Run `npm install`, then `npm run dev`.
`npm run typecheck` checks strict TypeScript. `npm run build` checks types and creates the static `dist` directory. `npm run preview` serves that build locally.

## Customize

Edit `src/config/invitation.ts`: names, initials, local event date, IANA timezone, venue, address, map URL, copy, photo and focal point. All supplied names/date are examples. Armenian copy requires fluent-speaker/client approval. Set `preview` false after approval. Update the page title and metadata in `index.html`.

The date is a local wall-clock time in the configured timezone. Temporal resolves its UTC instant and rejects ambiguous or nonexistent DST times. Countdown stops at zero. For such a DST time, choose an unambiguous local time before building.

Replace the WebP photograph variants in `public/images` (480, 800, 1145 pixels wide). Preserve aspect ratio and adjust focalPoint as needed. Update the srcSet if filenames change. Only resizing/compression was applied to the supplied photograph.

## Design

Ivory paper, champagne, antique gold, locally hosted Armenian Noto Serif and Latin Cormorant Garamond. Lightweight geometric ornaments are contemporary decorative interpretations, not reproductions of historic Armenian artifacts. CSS perspective handles the envelope; Motion handles viewport reveals. Reduced-motion users skip the opening sequence. No backend, forms, tracking or runtime external APIs.

## Cloudflare Pages

Push the project to your chosen Git repository and create a Cloudflare Pages project. Build command: `npm run build`. Output directory: `dist`. Production needs no Node server. Alternatively upload the built dist folder through Pages Direct Upload. Deployment requires explicit approval and is intentionally not automated here.

`noindex` discourages indexing; it does not provide privacy or access control. Anyone with the deployed URL may view the invitation.

## Verification status

Clean installation, strict TypeScript, production build and Chromium browser checks passed. See [QA report](qa/REPORT.md) for evidence, Lighthouse scores, screenshots and remaining limitations. The build is ready for a sample-content client preview; Armenian copy and actual event details still need approval. No deployment performed.
