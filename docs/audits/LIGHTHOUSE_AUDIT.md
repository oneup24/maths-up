# Lighthouse Audit — 2026-09-16

**Tool:** Lighthouse 13.4.1  
**Browser:** Headless Chrome 150 (macOS 12)  
**URL:** http://localhost:5175/ (Vite dev server)  
**Form factor:** Mobile (default)  
**Throttling:** Simulated (default)  
**Script:** `pnpm lighthouse:audit`  
**Latest summary:** `docs/audits/lighthouse-latest.json`  
**Raw reports:** `docs/audits/lighthouse-{timestamp}.json`

## Scores

| Category | Score | Notes |
|----------|------:|-------|
| Performance | 47 | Dev mode (unminified source) — expected low. Re-run on production build for real number. |
| Accessibility | 97 | Excellent. One fail: missing `<main>` landmark. |
| Best Practices | 96 | One fail: console errors logged. |
| SEO | 92 | Solid. |

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

1. **`landmark-one-main` (a11y: 0/1)** — Document does not have a `<main>` landmark. App.jsx uses generic `<div>` containers. Add `<main>` around the primary content area.
2. **`errors-in-console` (best-practices: 0/1)** — Browser errors logged to console. Investigate; capture & categorize.
3. **`unminified-javascript` (perf, dev-only)** — 2,801 KiB savings if minified. Expected in dev; production build handles this.
4. **`unused-javascript` (perf, dev-only)** — 2,568 KiB savings. Investigate bundle composition.

## Failures breakdown

- 63 passed / 21 failed audits
- Top 10 failures (by score): FCP, LCP, Speed Index, errors-in-console, TTI, mainthread-work-breakdown, bootup-time, landmark-one-main, unminified-javascript, unused-javascript

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

## Prior audits

| Date | URL | Scores (P/A/BP/SEO) | Notes |
|------|-----|---------------------|-------|
| 2026-09-16 | dev server / | 47/97/96/92 | First run. Accessibility 97 (1 fail: missing `<main>` landmark — first view is Onboarding). Best Practices 96 (1 fail: console errors). Performance 47 reflects unminified dev source — not representative of production. |
