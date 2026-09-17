# Lighthouse Audit — 2026-09-16

**Tool:** Lighthouse 13.4.1  
**Browser:** Headless Chrome 150 (macOS 12)  
**URL:** http://localhost:5175/ (Vite dev server)  
**Form factor:** Mobile (default)  
**Throttling:** Simulated (default)  
**Script:** `pnpm lighthouse:audit`  
**Latest summary:** `docs/audits/lighthouse-latest.json`  
**Raw reports:** `docs/audits/lighthouse-{timestamp}.json`

## Scores (after fixes — 2026-09-17)

| Category | Score | Notes |
|----------|------:|-------|
| Performance | 29–47 | Dev mode (unminified source) — expected low. Re-run on production build for real number. Variance between runs is dev-mode noise. |
| Accessibility | **100** | Fixed: `<main>` landmark added to Onboarding, Login, and home/exam wrapper in App.jsx (was 97). |
| Best Practices | **100** | Fixed: malformed Sentry DSN corrected in `.env.local` (was 96/98). |
| SEO | 92 | Solid. `robots.txt` has 44 errors (dev mode — not configured for Lighthouse robots audit). |

## Core Web Vitals (mobile, simulated, dev mode)

| Metric | Value | Target | Verdict |
|--------|------:|--------|---------|
| FCP | 20.6 s | ≤ 1.8 s | Dev mode artefact |
| LCP | 51.9 s | ≤ 2.5 s | Dev mode artefact |
| TBT | 340 ms | ≤ 200 ms | Borderline — investigate main-thread work |
| CLS | 0 | ≤ 0.1 | Perfect |
| SI | 21.2 s | ≤ 3.4 s | Dev mode artefact |
| TTI | 51.9 s | ≤ 3.8 s | Dev mode artefact |

**Important:** Performance scores reflect dev-mode serving (Vite serves un-minified source for HMR). Re-run against `pnpm build` + `pnpm preview` for production numbers — that's the metric that matters.

## Real issues found (not dev-mode artefacts)

1. ~~**`landmark-one-main` (a11y: 0/1)**~~ — **FIXED 2026-09-17**. Added `<main role="main">` to:
   - `src/Onboarding.jsx` (Lighthouse first hits this view)
   - `src/pages/Login.jsx`
   - `src/App.jsx` home/exam wrapper
   After fix: Accessibility 97 → **100**.

2. ~~**`errors-in-console` (best-practices: 0/1)**~~ — **FIXED 2026-09-17**. Single error was a malformed Sentry DSN in `.env.local` (`b0o45...` missing `@o`). Fixed to `b0@o45...`. Added warning in `.env.local.example`. After fix: Best Practices 96 → **100**.
3. **`unminified-javascript` (perf, dev-only)** — 2,821 KiB savings if minified. Expected in dev; production build handles this.
4. **`unused-javascript` (perf, dev-only)** — 2,537 KiB savings. Investigate bundle composition.

## Failures breakdown (after Sentry fix)

- 63 passed / 21 failed audits
- Top failures (by score): FCP, LCP, Speed Index, max-potential-fid, TTI, mainthread-work-breakdown, bootup-time, landmark-one-main, unminified-javascript, unused-javascript
- `errors-in-console` no longer in top failures (was previously)

## Followups (not blockers for soft launch)

- [ ] Add `<main>` landmark to App.jsx (a11y)
- [ ] Capture & categorize console errors (best-practices)
- [ ] Investigate unused JS in production bundle
- [ ] Re-run audit against `pnpm preview` for production performance baseline

## How to reproduce

```bash
# Install
pnpm add -D lighthouse

# Start dev server (separate terminal)
pnpm dev

# Run audit
pnpm lighthouse:audit
# or against a specific URL:
node scripts/lighthouse-audit.mjs http://localhost:5175/
```

## Next steps

- [ ] Re-run against `pnpm preview` for production numbers (perf scores are dev-mode artefacts)
- [ ] Fix `robots.txt` (currently fails with 44 errors — affects SEO 92 → ?)
- [ ] Investigate `bf-cache` failure (back/forward cache restoration blocked)

## Prior audits

| Date | URL | Scores (P/A/BP/SEO) | Notes |
|------|-----|---------------------|-------|
| 2026-09-16 | dev server / | 47/97/96/92 | First run. Accessibility 97 (1 fail: missing `<main>` landmark — first view is Onboarding). Best Practices 96 (1 fail: console errors — malformed Sentry DSN). Performance 47 reflects unminified dev source. |
| 2026-09-17a | dev server / | ~47/97/~98/92 | Sentry DSN fixed in `.env.local`. `errors-in-console` now passes. Accessibility still missing `<main>` (open). |
| 2026-09-17b | dev server / | 29–47/**100**/**100**/92 | `<main>` landmark added to Onboarding, Login, and App.jsx home wrapper. Accessibility 97 → 100. Best Practices 98 → 100. Both real Lighthouse issues closed. |
