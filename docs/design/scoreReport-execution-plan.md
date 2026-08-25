# ScoreReport Design Execution Plan
**Source audit:** parent-report.DESIGN.md (Stripi-inspired system)
**Desktop-first. Mobile-responsive secondary.**
**Screenshots:** save to `docs/design/screenshots/batch-N-before.png` and `batch-N-after.png` before approving each batch.

---

## Ambiguities — resolve before the batch indicated

| # | Question | Blocks |
|---|---|---|
| A | Score headline (48px number): `{colors.primary}` `#533afd` (celebratory display) or `{colors.ink}` `#0d253d` (data number)? DESIGN says primary = CTA/link only, not body text. | Batch 2 |
| B | Export PDF button: `button-primary-pill` (filled indigo) or `button-secondary` (outlined indigo)? Four CTAs in one row — two filled will compete. | Batch 3 |
| C | Semantic pass/fail colors (emerald/amber/red on progress bars, topic cards, "show wrong" toggle): keep as product-UI exception, or map to `{colors.primary}` / `{colors.ruby}`? | Batch 5 |

---

## Batch 1 — PDF RGB constants
**Files:** `src/components/ExportPDFButton.jsx`
**Tokens:** `{colors.primary}`, `{colors.primary-deep}`, `{colors.ink}`, `{colors.ink-secondary}`, `{colors.ink-mute}`, `{colors.hairline}`, `{colors.primary-bg-subdued-hover}`
**Risk:** None to screen UI. PDF output only.
**Rollback:** `git checkout src/components/ExportPDFButton.jsx`
**Screenshot:** Export a PDF → eyeball title/table header color shift from muted `#3730a3` to electric `#533afd`, and footer text darkening from near-white-gray to ink-mute navy.
**Save to:** `docs/design/screenshots/batch-1-before.png` · `batch-1-after.png`

| Line | Current | Replacement | Token |
|---|---|---|---|
| 82 | `setTextColor(55,48,163)` | `setTextColor(83,58,253)` | `{colors.primary}` |
| 86 | `setTextColor(120,120,120)` | `setTextColor(100,116,141)` | `{colors.ink-mute}` |
| 92–93 | `setTextColor(55,65,81)` | `setTextColor(39,57,81)` | `{colors.ink-secondary}` |
| 103–104 | `setTextColor(75,85,99)` | `setTextColor(13,37,61)` | `{colors.ink}` |
| 110 | `setDrawColor(200,200,200)` | `setDrawColor(227,232,238)` | `{colors.hairline}` |
| 148 | `fillColor:[238,242,255]` | `fillColor:[185,185,249]` | `{colors.primary-bg-subdued-hover}` |
| 149 | `textColor:[55,48,163]` | `textColor:[83,58,253]` | `{colors.primary}` |
| 195 | `fillColor:[238,242,255]` | `fillColor:[185,185,249]` | `{colors.primary-bg-subdued-hover}` |
| 196 | `textColor:[55,48,163]` | `textColor:[83,58,253]` | `{colors.primary}` |
| 243 | `fillColor:[224,242,254]` | `fillColor:[185,185,249]` | `{colors.primary-bg-subdued-hover}` |
| 244 | `textColor:[7,89,133]` | `textColor:[68,52,212]` | `{colors.primary-deep}` |
| 265 | `setTextColor(160,160,160)` | `setTextColor(100,116,141)` | `{colors.ink-mute}` |

---

## Batch 2 — Screen surface and text colors
**Files:** `src/components/exam/ScoreReport.jsx`
**Tokens:** `{colors.primary}`, `{colors.ink}`, `{colors.ink-secondary}`, `{colors.ink-mute}`, `{colors.canvas}`, `{colors.canvas-soft}`, `{colors.hairline}`
**Requires:** Ambiguity A resolved (score headline color)
**Risk:** Low — pure color swaps, no layout change.
**Rollback:** `git checkout src/components/exam/ScoreReport.jsx`
**Screenshot:** Score screen at 100%, 65%, 35% results at 1280px desktop. Eyeball body text in navy ink scale, card border, score number intensity.
**Save to:** `docs/design/screenshots/batch-2-before.png` · `batch-2-after.png`

---

## Batch 3 — Elevation token + Export/verify button colors
**Files:** `src/components/exam/ScoreReport.jsx`, `src/components/ExportPDFButton.jsx`
**Tokens:** Level 2 shadow `rgba(0,55,112,0.08) 0 8px 24px, rgba(0,55,112,0.04) 0 2px 6px`, `{button-primary-pill}` or `{button-secondary}`, `{colors.primary}`, `{colors.on-primary}`
**Requires:** Ambiguity B resolved (Export PDF button style)
**Risk:** Medium — shadow and Export button color change are visible but contained.
**Rollback:** `git checkout src/components/exam/ScoreReport.jsx src/components/ExportPDFButton.jsx`
**Screenshot:** Score screen at 1280px — full button row visible. Card shadow should read lighter/bluer vs current warm-gray `shadow-lg`. Export PDF button should feel unified with indigo system.
**Save to:** `docs/design/screenshots/batch-3-before.png` · `batch-3-after.png`

---

## Batch 4 — Typography weights and tnum
**Files:** `src/components/exam/ScoreReport.jsx`
**Tokens:** `{typography.display-xl}` (300, -0.96px), `{typography.heading-sm}` (300), `{typography.body-md}` (300), `{typography.body-tabular}` (tnum)
**Risk:** Medium-High — weight 300 at 48px is visually dramatic vs current font-black. Font fallback matters.
**Rollback:** `git checkout src/components/exam/ScoreReport.jsx`
**Screenshot:** Score screen at 1280px immediately after marking. Confirm 48px score number reads as intentionally thin/editorial, not broken. Spot-check at 768px to confirm 300-weight doesn't collapse.
**Save to:** `docs/design/screenshots/batch-4-before.png` · `batch-4-after.png`

---

## Batch 5 — Button pill shape and off-palette colors
**Files:** `src/components/exam/ScoreReport.jsx`, `src/components/ExportPDFButton.jsx`
**Tokens:** `{rounded.pill}` 9999px, `{button-secondary}`, `{colors.hairline}`, `{colors.ink-mute}` — plus Ambiguity C resolution
**Requires:** Ambiguity C resolved (semantic red/rose states)
**Risk:** High — pill shape changes the gestalt of the entire button row. Full-width "Review Wrong" pill may need `max-w` cap at desktop to avoid "stadium" effect.
**Rollback:** `git checkout src/components/exam/ScoreReport.jsx src/components/ExportPDFButton.jsx`
**Screenshot:** Score screen at **1280px desktop** with all buttons including full-width "Review Wrong" row. Then spot-check at 768px tablet for flex-wrap behavior.
**Save to:** `docs/design/screenshots/batch-5-before.png` · `batch-5-after.png`
