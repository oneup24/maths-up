# CLAUDE.md — Maths Quests

## Project
HK primary school maths exam app (P1-P6). Brand: OneUp24 / Curlboo Bear mascot.
React 19 + Vite 8 + Tailwind 4 + Supabase + Capacitor (iOS).
Current version: **v1.2-beta** — live on Vercel.

## Quick reference
- `pnpm dev` — start dev server
- `pnpm build` — production build to dist/
- `pnpm preview` — preview production build
- `pnpm dev` runs on port 5175 (strictPort — won't auto-increment)
- Main branch: `main` (supabase-auth merged)
- Deployed: Vercel (production)

## Architecture
- **Monolithic SPA** — routing + state in `src/App.jsx` (~426 lines) via useState + `view` variable
- **15+ extracted components** — `src/components/{ui,home,settings,exam,modals}/`
- **Question engine** — `src/engine/` (modular: core.js, config.js, contexts.js, gradeRules.js, exam.js, history.js, grades/grade1–6.js) — 329 generators across 68 topics
- **Design system** — `src/lib/colors.js` (grade/category/difficulty colors), `src/lib/animations.js` (shared Framer Motion variants)
- **Onboarding** — `src/Onboarding.jsx` — 6-step "hook before ask" flow (runs BEFORE auth)
- **Auth** — `src/hooks/useAuth.js` wraps Supabase; guest mode supported
- **Cloud** — `src/services/api.js` saves exam results to Supabase `exam_sessions` table
- **i18n** — `src/lib/i18n.js`, use `t(lang, key)` — always support both zh and en
- **Sounds** — `src/lib/sounds.js` via Web Audio API
- **Analytics** — `src/lib/track.js` — fire-and-forget PostHog + Supabase, 18 events

## Key files
| File | What |
|------|------|
| `src/App.jsx` | Main app: routing, exam UI, state, marking |
| `src/engine/` | Question generators, exam builder, answer checker (modular, 8 files) |
| `src/hooks/useAuth.js` | Supabase session management |
| `src/services/api.js` | Cloud save/load operations |
| `src/pages/Login.jsx` | Auth page (returning users only) |
| `src/Profile.jsx` | Settings, stats, PIN |
| `src/Onboarding.jsx` | 6-step onboarding (lang→value→grade→question→result→auth) |
| `src/lib/colors.js` | Grade/category/difficulty color tokens |
| `src/lib/animations.js` | Shared Framer Motion variants |
| `src/components/` | 15+ extracted components (ui, home, settings, exam, modals) |
| `src/lib/track.js` | Event tracking (fire-and-forget Supabase insert) |
| `src/components/ExportPDFButton.jsx` | PDF exam report export |
| `supabase/setup.sql` | Applied RLS policies (documentation only) |

## Conventions
- All UI strings must be bilingual (zh + en) via i18n
- localStorage for offline persistence; Supabase for cloud (authenticated only)
- Parent PIN (4-digit) protects answer reveal during exams
- Guest mode = full features minus cloud sync and print
- Question generators are pure functions returning `{d, tp, q, a, sc, ...}`
- Answer checker `chkAns()` handles units, fractions, multi-part, tolerance
- Mascot mood: happy (>=80%), ok (50-79%), sad (<50%)

## Do NOT
- Break guest mode — app must work without auth
- Add questions without matching HK EDB curriculum
- Hardcode Chinese-only strings — always use i18n
- Modify src/engine/core.js (chkAns) question format without updating marking logic in App.jsx

## Business Context
- Brand mascot: Curlboo Bear (emotional IP layer)
- Key differentiator: "Trap Item Training" system
- Revenue model: Freemium → subscription
- See full business plan: github.com/oneup24/Oneup24 (private)

## App Flow
1. Onboarding (first time): language → value splash → grade → try question → result → auth gate
2. Login (returning users only, if not signed in)
3. Home → Settings → Exam → Results → Profile

## Docs
- `docs/CHANGELOG.md` — commit history and features
- `docs/CONTEXT_PRIMER.md` — architecture deep dive
- `docs/MASTER_PLAN.md` — strategy (WHAT and WHY)
- `docs/STATUS.md` — execution status (WHETHER — update this in every task commit)
- `docs/DECISIONS.md` — settled decisions, do not reopen
- `docs/AUDIT_v6.md` — Stage 1 audit (contradiction evidence, real numbers)
- `docs/_archive/` — legacy plans, do NOT reference

## Agent Rules (v6.0 — do not override)
- **Single source of truth:** `docs/MASTER_PLAN.md` (strategy) + `docs/STATUS.md` (status). If docs conflict: STOP and ask — never pick one.
- **Completing any task requires updating STATUS.md in the same commit.**
- `content/*.csv` is source of truth for curriculum data. Agents may NOT add or alter any math question, answer, trap, or misconception text — only parsers/validators/renderers/migrations.
- AI must never output a numeric answer; only `answer_expr`, evaluated by Layer 1.
- All schema changes go through `supabase/migrations/*.sql`. Never instruct the user to edit the Supabase dashboard (agents cannot verify dashboard state).
- Every new table: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` + a policy scoped to `auth.uid()` in the same migration. `USING(true)` is forbidden.
- `SERVICE_ROLE_KEY` must never carry a `VITE_` prefix.
- Never `DROP` or `TRUNCATE` `question_bank`.
- Every answered question must write a `responses` row.
- **Frozen:** `android/`, `ios/` until 20 paying users. Do not propose IAP or RevenueCat.
- **Settled:** web + Stripe only; annual HKD 388 primary; no grade labels inside a Quest; one Fractions topic chain until Gate 3E passes.
