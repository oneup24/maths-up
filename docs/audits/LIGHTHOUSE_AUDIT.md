# Lighthouse Audit — 2026-09-17

**Tool:** Lighthouse 13.4.1  
**Browser:** Headless Chrome 150 (macOS 12)  
**Form factor:** Mobile (default)  
**Throttling:** Simulated (default)  
**Script:** `pnpm lighthouse:audit`  
**Latest summary:** `docs/audits/lighthouse-latest.json`  
**Raw reports:** `docs/audits/lighthouse-{timestamp}.json`

## Production Build Baseline (2026-09-17)

Built with `pnpm build`, served via `pnpm preview` on port 4175.

### Scores

| Category | Score |
|----------|------:|
| Performance | 39 |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | 92 |

### Core Web Vitals (mobile, simulated)

| Metric | Value | Target | Verdict |
|--------|------:|--------|---------|
| FCP | 3.7 s | ≤ 1.8 s | ⚠️ Borderline (acceptable for SPA) |
| LCP | 14.1 s | ≤ 2.5 s | ❌ Slow — needs work |
| TBT | 1,110 ms | ≤ 200 ms | ❌ Main thread blocked |
| CLS | 0 | ≤ 0.1 | ✅ Perfect |
| SI | 6.5 s | ≤ 3.4 s | ❌ Slow |
| TTI | 14.1 s | ≤ 3.8 s | ❌ Slow |

### Bundle analysis

Total main bundle: 698 KB (gzip 224 KB). Major chunks:
- `index-BdmgduJK.js` — 698 KB (app code)
- `vendor-supabase-C1O-LcLB.js` — 188 KB
- `vendor-react-adNNY7oV.js` — 182 KB
- `vendor-posthog-CwUQoJpK.js` — 178 KB
- `html2canvas-CQioh8bo.js` — 200 KB (used for PDF export)
- `vendor-motion-CN4dsgdW.js` — 132 KB (framer-motion)
- `vendor-sentry-TpWLy5B_.js` — 83 KB

### Top remaining issues (production)

1. **LCP 14.1s** — Largest content paint is the slowest metric. Investigation needed: which element is LCP? (Likely the Curlboo mascot SVG or splash image.)
2. **TBT 1.1s** — Main thread blocked. 4.3s bootup-time. Likely PostHog + Sentry initialization. Consider deferring.
3. **`unused-javascript` 349 KB savings** — Much better than dev mode (2.5 MB). Library code that's not tree-shaken. Could be addressed with route-level code-splitting.
4. **`valid-source-maps`** — Missing source maps in production deploy. Add `build.sourcemap = true` in vite.config.js.
5. **`robots.txt`** — 48 errors. Vite preview doesn't ship a robots.txt; production deploy should include one.
6. **`cache-insight`** — Cache lifetimes. Add `Cache-Control: public, max-age=...` headers in Vercel config.

### How to reproduce production audit

```bash
pnpm build
pnpm preview --port 4175 &  # separate terminal
node scripts/lighthouse-audit.mjs http://localhost:4175/
```

---

## Dev Mode Baseline (2026-09-17)

For reference — dev mode runs (vite dev server, unminified source). Scores are noisy due to dev mode artefacts; use production baseline above for real metrics.

| Category | Dev Score |
|----------|----------:|
| Performance | 29–47 (high variance) |
| Accessibility | **100** (after `<main>` fix) |
| Best Practices | **100** (after Sentry DSN fix) |
| SEO | 92 |

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
