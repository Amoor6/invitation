# Armenian engagement invitation

## Run

Node 22.12+ required. Run `npm install`, then `npm run dev`.
`npm run build` type-checks and produces `dist`; `npm run preview` serves it.

## Content

Edit `src/config/invitation.ts` for Armenian copy, names, portrait and event date.
The event is December 22, 2026 at 19:00 in Asia/Tehran. The supplied hall placeholder remains in the invitation text.
The countdown uses Temporal with DST ambiguity rejection and stops at zero.

## Design and assets

Warm garden scenery, champagne stationery and pale floral details. Three active images are documented in `public/images/ASSETS.md`. The favicon is a small SVG envelope. Fonts are locally hosted. CSS handles envelope animation; Motion handles reveals. Reduced-motion preferences are respected.

## Validation

Run `npm run typecheck` and `npm run build`. Historical screenshots and obsolete browser scripts were removed because they described an earlier layout and event date. Current browser visual verification is pending.

## Hosting

Static output is in `dist`. No backend, tracking or external runtime API is needed.
The page includes `noindex`, which discourages search indexing but does not provide access control.
