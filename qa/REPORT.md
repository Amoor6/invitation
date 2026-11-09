# Verification — 2026-11-06

## Installation diagnosis
The prior handoff occurred while asynchronous npm installation was still running. The retained npm log `/home/amoor/.npm/_logs/2026-11-06T14_14_58_629Z-debug-0.log` records successful installation (exit 0). No registry, TLS, or dependency-resolution failure is recorded there. Thus `tsc: command not found` was a premature build attempt, not proof of failed installation. Exact cause of the initial delay cannot be established from the retained log. Fresh `npm ci` completed successfully, with zero audit vulnerabilities. No security checks were disabled. Environment: Node 26.8.1, npm 11.19.0; npm lockfile retained.

## Changes
- `src/vite-env.d.ts`: standard Vite asset declarations fix TypeScript 7 CSS import errors.
- `src/main.tsx`: deterministic Armenian month/weekday names because Chromium locale data fell back to English; date fields use configured zoned date; accessible envelope name includes visible text.
- `src/style.css`: closed envelope covers its insert; darker seal lettering meets contrast requirements.
- `index.html`: inline favicon prevents 404.
- `package.json`, `package-lock.json`: classify build tooling as development dependencies; document Node minimum.
- `qa/`: browser results, screenshots, Lighthouse JSON, test scripts and this report.
- `README.md`: updated verification status.

## Successful checks
- Clean npm installation, strict TypeScript, production Vite build.
- Playwright Chromium: 320, 375, 390, 430, 768, 1440 widths; no horizontal overflow or captured console/page errors.
- Repeated envelope opening across independent sessions; mobile touch, desktop mouse; Enter and Space keyboard activation; focus transfers to main heading; reduced-motion immediate opening.
- Armenian font loaded, responsive image variants loaded, scrolling after opening, countdown within 3 seconds of expected Asia/Yerevan instant.
- Simulated countdown crossing event time stops at celebration, remains stopped; Temporal rejects nonexistent/ambiguous New York DST times.
- Screenshots captured for envelope at all widths and hero/details/countdown/closing at 390 and 1440; visual inspection led to envelope and localization fixes.
- Lighthouse default mobile initial envelope: performance 100, accessibility 100, best practices 100; CLS 0.002. This does not measure the full opened experience.

## Limits
No ESLint configuration or preexisting test suite exists. QA scripts require Playwright (installed separately under /tmp/invitation-qa for this run) and system Chromium. Safari/iOS hardware testing was not performed. No real Google Maps URL exists: verified pending state only. Client must approve Armenian copy and replace sample names/date/venue. Build retains nonfatal third-party use-client directive warnings and a 525 kB raw JS chunk warning (163 kB gzip). No warnings were suppressed. Ready for a clearly labeled client design preview, not final guest distribution. Nothing deployed.
