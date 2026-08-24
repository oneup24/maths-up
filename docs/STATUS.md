# STATUS.md — Maths-Up Execution Status
**Last updated:** 2026-08-24 (Gate 0 — question_answered event)
**Rule:** Any agent completing a task MUST update this file in the same commit.
**Legend:** ✅ verified in code (evidence required) · ⚠️ NEEDS FOUNDER · ☐ not found/not started

---

## Phase 1 — Core Engine

| Item | Status | Evidence |
|------|--------|----------|
| 329 procedural generators (P1-P6) | ✅ | `rg -c '\(\)=>\{' src/engine/grades/*.js → 329 total` |
| HK EDB curriculum topics | ✅ | `src/engine/grades/*.js` |
| 5 question types, 3 difficulties | ✅ | `grep 'SECT_RATIOS\|DIFF_INFO' src/engine/config.js` |
| Answer checker (chkAns) | ✅ | `src/engine/core.js:1` |
| Trap items, SVG figures | ✅ | `src/engine/grades/*.js` |
| Onboarding wizard | ✅ | `src/Onboarding.jsx:1` |
| Curlboo moods, confetti, sounds | ✅ | `src/lib/sounds.js`, `src/components/` |
| PWA support | ✅ | `public/manifest.json:1` |

## Phase 2 — Auth + Cloud

| Item | Status | Evidence |
|------|--------|----------|
| Supabase email auth | ✅ | `src/hooks/useAuth.js:1` |
| Guest mode (localStorage only) | ✅ | `src/App.jsx:208` — gated on `if(user)` |
| Cloud save to exam_sessions | ✅ | `src/services/api.js:1` |
| Password reset | ✅ | `src/hooks/useAuth.js:55` |
| Parent PIN lock | ✅ | `src/Profile.jsx:167` |
| Print gate (auth required) | ✅ | `src/components/ExportPDFButton.jsx:2` |
| Google OAuth | ☐ | `rg 'signInWithOAuth\|google' src/ → no match` — README incorrect |

## Phase 3A — Testing & Fixes

| Item | Status | Evidence |
|------|--------|----------|
| Merge supabase-auth to main | ✅ | Current branch: main |
| Vite port 5175 | ✅ | `vite.config.js` |
| PDF export (ExportPDFButton) | ✅ | `src/components/ExportPDFButton.jsx:2` |
| Production Vercel deployment (v1.2-beta) | ✅ | `index.html` title = Maths-Up |
| Capacitor.js dead file removed | ✅ | `ls src/capacitor.js → absent` |
| End-to-end testing | ☐ | `find . -name 'playwright*\|cypress*' → nothing` |
| Lighthouse audit | ☐ | `find . -name 'lighthouserc*' → nothing` |
| Stray files removed (app.json, src/questions.js.save) | ☐ | Both files exist at root/src |

## Phase 3B — Instrumentation

| Item | Status | Evidence |
|------|--------|----------|
| PostHog integrated | ✅ | `package.json:35 "posthog-js": "^1.367.0"` |
| PostHog 18 events (verified) | ✅ | `rg "track\('" src/ → 18 call-sites (see AUDIT_v6.md §B)` |
| Sentry integrated | ✅ | `package.json:26 "@sentry/react": "^10.49.0"` · `src/lib/sentry.js:1` |
| Event name discrepancies | ⚠️ | Plans say `exam_start`/`exam_complete`; code uses `quiz_start`/`quiz_complete`. Plans say 12 events; code has 18. → NEEDS FOUNDER: should plan names be updated to match code? |

## Phase 3C — Data Layer Prep

| Item | Status | Evidence |
|------|--------|----------|
| question_bank schema | ✅ | `supabase/question_bank.sql:1` (97 lines) |
| Seed script | ✅ | `scripts/seed_question_bank.mjs:1` (137 lines) |
| question_bank row count | ⚠️ | Cannot verify from files → NEEDS FOUNDER: run `SELECT count(*) FROM question_bank` in Supabase dashboard |
| contexts.js wired | ✅ | `src/engine/config.js:41` — `export { CTX, nm, ... } from './contexts.js'` |
| gradeRules.js wired | ✅ | `src/engine/exam.js:8` — imports `validateQuestion` |
| future_tables.md complete | ✅ | `docs/future_tables.md` — documents 5 tables |
| student_question_history table | ✅ | `supabase/question_bank.sql:88–97` — exists with correct RLS; not in either plan |

## Gate 0 (before Phase 3D)

| Item | Status | Evidence |
|------|--------|----------|
| Doc consolidation (MASTER_PLAN.md v6.0) | ✅ | This commit |
| scripts/audit-generators.js | ☐ | Not created |
| responses table migration + write path | ✅ | `supabase/migrations/20260824000001_create_responses.sql` · `src/services/api.js` `saveResponses()` · `src/App.jsx` wired in markExam |
| PostHog question_answered event | ✅ | `src/App.jsx` markExam loop — fires per question with grade, topic_id, q_type, q_index, is_correct, has_trap, trap_hit |
| RLS audit — fix USING(true) policies | ☐ | `supabase/setup.sql:3` (questions) and `supabase/setup.sql:8` (user_errors INSERT) still use USING/WITH CHECK(true) |
| exam_sessions RLS migration | ⚠️ | Applied in Supabase dashboard only; not version-controlled → NEEDS FOUNDER: should this be migrated to supabase/migrations/? |
| Brand name unified to Maths-Up | ☐ | 5 name variants still active: `public/manifest.json:2` says "Curlboo & Fluffy's Maths Quests" |
| appId updated in capacitor.config.json | ☐ | Current: `com.mathexam.app` / `math-exam` — must change to `com.oneup24.mathsup` / `Maths-Up` BEFORE App Store submission |
| Topic Quest grade-label recorded in DECISIONS.md | ☐ | DECISIONS.md not yet written |
| 10 soft-launch families sign in | ⚠️ | 4/10 recruited → NEEDS FOUNDER: current count |

## Phase 3D — Soft Launch

| Item | Status | Evidence |
|------|--------|----------|
| 10 families recruited | ⚠️ | 4/10 as of 2026-08-24 → NEEDS FOUNDER: exact current count |
| 3 sessions per family × 10 | ☐ | Not started |
| Qualitative questions asked every session | ☐ | Not started |

## Phase 3E (gate: 3 families paid HKD 388)

| Item | Status | Evidence |
|------|--------|----------|
| content/topic_map.csv (Fractions P1→P4) | ☐ | `content/` directory does not exist |
| content/misconceptions.csv | ☐ | Not created |
| 3-page PDF (student + answers + parent report) | ☐ | Current PDF is single-format |
| Topic Quest v1 (Fractions hardcoded) | ☐ | Not started |
| Manual pre-sale 3 × HKD 388 | ☐ | No paying users |

---

## ⚠️ NEEDS FOUNDER DECISION

| # | Question | Options |
|---|----------|---------|
| Q4 | How many rows in `question_bank` in Supabase right now? | Run `SELECT count(*) FROM question_bank` |
| Q5 | RLS: should USING(true) policies be corrected (setup.sql) and exam_sessions RLS added as a migration file? | (A) Yes, Gate 0 item · (B) Fix USING(true) but leave dashboard RLS · (C) No change |
| Q6 | How many of the 10 soft-launch families are recruited? (last known: 4/10) | Exact number |
| Q7 | appId confirmed as `com.oneup24.mathsup`, appName as `Maths-Up`? | (A) Confirm · (B) Different values |
| Q8 | Studio Hub + 3 Coming Soon cards | SETTLED: keep (2026-08-24) |
| Q9 | IG consolidation: @oneup24game (200) as primary, link from @curlboo.bear? | (A) Confirm · (B) Keep both · (C) Other |
| Q10 | First Topic Quest chain | SETTLED: Fractions P1→P4 (2026-08-24) |

---

## Technical Correctness Audit Results

| Claim | Plan value | Actual (code-verified) |
|-------|-----------|----------------------|
| Generator count | "600+" | 329 (`rg -c '\(\)=>\{' src/engine/grades/*.js`) |
| Commit count | "26" (v5.1) | 98 (`git rev-list --count HEAD`) |
| GitHub repo | oneup24/maths-exam | oneup24/maths-up |
| PostHog event count | 12 | 18 |
| event names | exam_start / exam_complete | quiz_start / quiz_complete |
| Exam targets | 12 / 15 / 24 | 10 / 20 / 35 (`EXAM_TARGETS` in config.js) |
| Section ratios | calc 28%, fill 18%, MC 12%, short 22%, work 20% | mc 15%, fill 20%, calc 20%, short 15%, work 30% |
| Difficulty labels | Basic / Standard / Challenge | 基礎鞏固 / 呈分實戰 / 奧數拔尖 |
| Google OAuth | "Supabase email + Google OAuth" | Email only — no OAuth in codebase |
| capacitor appId | not stated | com.mathexam.app (stale — update at Gate 0) |
| Deployed URL | maths-exam.vercel.app | Unknown — not in repo; founder knows |
