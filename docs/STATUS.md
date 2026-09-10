# STATUS.md — Maths-Up Execution Status
**Last updated:** 2026-09-10 (Today's session: thin-pool expansion + exam variety cap; +40 generators; 630 tests pass)
**Rule:** Any agent completing a task MUST update this file in the same commit.
**Legend:** ✅ verified in code (evidence required) · ⚠️ NEEDS FOUNDER · ☐ not found/not started

---

## Phase 1B.5 — Thin-Pool Expansion + Variety Cap + e2e (2026-09-10)

| Item | Status | Evidence |
|------|--------|----------|
| Exam variety cap — each generator fires ≤2× per exam | ✅ | `src/engine/exam.js:38` `GEN_CAP=2`; removed `storyTypes` short-circuit |
| Question `_genKey` tagging for testability | ✅ | `src/engine/exam.js:43` `q._genKey=item.tid+':'+item.gi` |
| 18 cap-enforcement tests (6 grades × 3 modes) | ✅ | `src/engine/__tests__/buildExam.test.js` |
| +40 generators across 24 thin topics | ✅ | G2 +15, G3 +12, G4 +4, G5 +3, G6 +6 — see `git log eaa5280 fe8db52 d2fc2a8` |
| No thin (≤3 gen) topics remain below baseline | ✅ | `node -e "...G4-G6 thin..."` → all ≥3 except 6D2/6D3 which sit at baseline |
| **Playwright e2e infrastructure** | ✅ | `playwright.config.js`, `e2e/smoke.spec.js` (3 tests) |
| **e2e: app boots without console errors** | ✅ | `pnpm test:e2e` → 3 passed |
| **e2e: home renders primary CTA** | ✅ | same |
| **e2e: buildExam runs in browser context** | ✅ | same |
| **macOS 12 limitation** | ⚠️ | Playwright bundles don't support mac12; uses system Chrome via `channel:'chrome'`. Will work natively on mac13+/CI. |
| Test count 568 → 630 unit (+62 from new generators) + 3 e2e | ✅ | `npm test` and `pnpm test:e2e` |
| **who-ran-further MC: unique (name, distance) per option** | ✅ | `src/engine/grades/grade2.js` d:3 — wrong-name option now shows `diff + ri(1,9)*10` instead of correct diff. Commit `e815c09`. |
| **Lint cleanup** | ✅ | `exam.js` — removed `_e1/_e2/_e3` unused catch params; `grade2.js` — fixed `endH=endH` self-assign in cinema generator (now `endH=endH-12`). Commit `abc271d`. |

---

## Phase 1B — Engine Topic Coverage Completion (NEW)

| Item | Status | Evidence |
|------|--------|----------|
| 16 missing HK EDB topics added | ✅ | 2M1/2M2/2M3/2S1/2S2/2S3/2S4 in `grade2.js`; 3M1-3M5/3S1/3S2 in `grade3.js`; 5A1/5A2 in `grade5.js` |
| 48 new generators (16 topics × 3 d-levels) | ✅ | `node -e "import('./src/engine/grades/grade{2,3,5}.js')"` → 16 new pools with 3 generators each |
| config.js TOPICS individual sub-topics | ✅ | `grep -E "2M1\|2M2\|2M3\|2S1\|2S2\|2S3\|2S4\|3M1-5\|3S1\|3S2\|5A1\|5A2" src/engine/config.js` |
| 79/79 curriculum coverage (100%) | ✅ | `docs/audits/TOPIC_ENGINE_COVERAGE_AUDIT.md` |
| `arch:check` 5 rules pass | ✅ | `pnpm arch:check` → all green |
| `content:check` pass | ✅ | `pnpm content:check` → all green |
| Smoke test 2400 invocations | ✅ | No empty answers, no multiple-correct MC options, no syntax errors |

See `docs/audits/TOPIC_ENGINE_COVERAGE_AUDIT.md` for full audit history.

---

## Phase 1 — Core Engine

| Item | Status | Evidence |
|------|--------|----------|
| 377 procedural generators (P1-P6) [was 329, +48 in Phase 1B] | ✅ | `rg -c '\(\)=>\{' src/engine/grades/*.js` |
| HK EDB curriculum topics (100% coverage) | ✅ | `src/engine/grades/*.js` (all 79 official units covered) |
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
| question_bank row count | ✅ | 2,004 rows — confirmed by founder 2026-08-24 |
| contexts.js wired | ✅ | `src/engine/config.js:41` — `export { CTX, nm, ... } from './contexts.js'` |
| gradeRules.js wired | ✅ | `src/engine/exam.js:8` — imports `validateQuestion` |
| future_tables.md complete | ✅ | `docs/future_tables.md` — documents 5 tables |
| student_question_history table | ✅ | `supabase/question_bank.sql:88–97` — exists with correct RLS; not in either plan |

## Gate 0 (before Phase 3D)

| Item | Status | Evidence |
|------|--------|----------|
| Doc consolidation (MASTER_PLAN.md v6.0) | ✅ | This commit |
| scripts/audit-generators.js | ✅ | `scripts/audit-generators.mjs` — 397 generators audited × 500 runs; 103 quarantined (26%); 294 clean. `src/engine/quarantined.js` generated; `exam.js` filters quarantined on load. Violations: primarily invariant (a) — answer coincides with given operand |
| responses table migration + write path | ✅ | `supabase/migrations/20260824000001_create_responses.sql` · `src/services/api.js` `saveResponses()` · `src/App.jsx` wired in markExam |
| PostHog question_answered event | ✅ | `src/App.jsx` markExam loop — fires per question with grade, topic_id, q_type, q_index, is_correct, has_trap, trap_hit |
| RLS audit — fix USING(true) policies | ✅ | `supabase/migrations/20260824000002_fix_using_true_rls.sql` — drops both bad policies; questions → authenticated read; user_errors → auth.uid() IS NOT NULL insert |
| exam_sessions RLS migration | ✅ | `supabase/migrations/20260824000003_exam_sessions_rls.sql` — documents dashboard policy; idempotent (DROP POLICY IF EXISTS before CREATE) |
| Brand name unified to Maths-Up | ✅ | `manifest.json` name, `capacitor.config.json` appName, `app.json` name/slug all updated to Maths-Up |
| appId updated in capacitor.config.json | ✅ | `com.oneup24.mathsup` (was `com.mathexam.app`) — IMMUTABLE after first App Store submission |
| Topic Quest grade-label recorded in DECISIONS.md | ✅ | `docs/DECISIONS.md` §grade-label — child sees quest_station_name_zh; parent report shows topic_name_zh with grade |
| MASTER_PLAN.md v6.0 final cleanup | ✅ | Tail residue removed; Appendix E → v6.0/Aug 24; A5 → 98 commits/maths-up; PART K2 → PART M; §I0 (I0a–I0g); §I5 CSV Column Specs; §I7 Pipeline; §I8 exam_sessions cols; §I9 CI checks; §I10 Agent Rules; Appendix F added |
| MASTER_PLAN.md §I0–§I10 verbatim alignment | ✅ | All sections replaced verbatim per patching_20260925.md: §I0 doctrine + I0g ID naming; §I4 LLM-at-runtime append; §I5 I5a–I5h; §I7 four-stage pipeline + matched_trap; §I9 12 assertions + test:golden + error example; §I10 May/Must/Never + recipe; Gate 0 +5 items + CI condition; Appendix A +3 principles; Appendix B filter #7; PART J risks 10–11; Appendix F Five Commands |
| exam_sessions additive columns | ✅ | `supabase/migrations/20260825000001_extend_exam_and_responses.sql` — child_id, blueprint_id, seed, content_version, paper_json (all nullable); child_id added to responses |
| content/ directory + ID_REGISTRY.json | ✅ | `content/ID_REGISTRY.json` (empty registry); `content/VERSION` = 2026-08-25.1 |
| content/items.csv (legacy generators) | ✅ | `scripts/import-legacy-generators.js` → 397 generators registered (291 live, 106 quarantined) |
| arch:check script (5 rules) | ✅ | `scripts/arch-check.js` — all 5 rules pass: no supabase, no react, no fetch, no Math.random outside core.js, no Date.now in grades/ |
| content:check v0 script | ✅ | `scripts/content-check.js` — checks UTF-8 no BOM, items.csv headers, ID_REGISTRY.json valid JSON |
| grade3.js Math.random bug | ✅ | `src/engine/grades/grade3.js:27` — replaced inline `.sort(()=>Math.random()-0.5)` with `shuffle()` |
| 10 soft-launch families sign in | ⚠️ | 4/10 recruited → NEEDS FOUNDER: current count |

## UI/UX Overhaul (2026-09-02)

| Item | Status | Evidence |
|------|--------|----------|
| kid-practice.DESIGN.md tokens applied to home + exam | ✅ | White canvas, hairline borders, zero backdrop-blur across PageShell, BottomTabBar, Sidebar, ExamHeader, ExamActions, FloatingSubmit, modals |
| GradeCard avatars stripped | ✅ | `src/components/home/GradeCard.jsx` — solid hex fills, no avatar panel |
| GC_HEX + GC_SOFT color tokens | ✅ | `src/lib/colors.js` — 6 grade solid hex values + soft tints |
| HomeDashboard (kid's 3-col dashboard) | ✅ | `src/components/home/HomeDashboard.jsx` — grade chip picker, START EXAM CTA, last result, recent history, desktop right widget panel |
| Login page desktop 2-col layout | ✅ | `src/pages/Login.jsx` — left panel canvas-dark (#010120) + right panel white; mobile = form only |
| ScoreReport design tokens (parent-report.DESIGN.md) | ✅ | `src/components/exam/ScoreReport.jsx:10` — `bg-white` solid canvas (was `bg-white/90`), `border` 1px hairline (was `border-2`), no backdrop-blur, no inline shadow. Buttons `border` 1px (was `border-2`); `py-2` matches parent-report `button-secondary` 8px vertical padding |

## Phase 3D — Soft Launch

| Item | Status | Evidence |
|------|--------|----------|
| 10 families recruited | ⚠️ | 4/10 as of 2026-08-24 → NEEDS FOUNDER: exact current count |
| 3 sessions per family × 10 | ☐ | Not started |
| Qualitative questions asked every session | ☐ | Not started |

## Phase 3E (gate: 3 families paid HKD 388)

| Item | Status | Evidence |
|------|--------|----------|
| content/topic_map.csv (Fractions P1→P4) | ☐ | `content/` directory created; topic_map.csv not yet authored |
| content/misconceptions.csv | ☐ | Not created |
| 3-page PDF (student + answers + parent report) | ☐ | Current PDF is single-format |
| Topic Quest v1 (Fractions hardcoded) | ☐ | Not started |
| Manual pre-sale 3 × HKD 388 | ☐ | No paying users |

---

## ⚠️ NEEDS FOUNDER DECISION

| # | Question | Options |
|---|----------|---------|
| Q4 | `question_bank` row count | SETTLED: 2,004 rows confirmed by founder 2026-08-24 |
| Q5 | RLS fixes done — migrations 20260824000002 + 20260824000003 applied | SETTLED: 2026-08-24 |
| Q6 | How many of the 10 soft-launch families are recruited? (last known: 4/10) | Pending — some fixes first |
| Q7 | appId confirmed as `com.oneup24.mathsup`, appName as `Maths-Up` | SETTLED: confirmed by founder 2026-08-24 |
| Q8 | Studio Hub + 3 Coming Soon cards | SETTLED: keep (2026-08-24) |
| Q9 | IG consolidation: @oneup24game as primary, link from @curlboo.bear | SETTLED: confirmed by founder 2026-08-24 |
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
