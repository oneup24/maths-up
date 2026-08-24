# AUDIT v6 — Contradiction & Evidence Report
### Prepared: August 24, 2026
### Prompt source: docs/prompts/v6_regen.md
### Purpose: Stage 1 gate before writing MASTER_PLAN.md. Do NOT proceed to Stage 2 until APPROVED.

---

## A. VERDICT TABLE

All evidence strings include the shell command that produced them.

| # | Claim | v4 says | v5.1 says | Evidence (command → output) | Verdict |
|---|-------|---------|-----------|----------------------------|---------|
| 1 | Sentry integrated | ✅ DONE | "still BLOCKING soft launch" | `grep '@sentry' package.json → "@sentry/react": "^10.49.0"` (line 26) | ✅ `src/lib/sentry.js:1` — v5.1 was wrong |
| 2a | PostHog integrated | ✅ DONE | ✅ DONE | `grep 'posthog' package.json → "posthog-js": "^1.367.0"` (line 35) | ✅ `src/lib/posthog.js:1` |
| 2b | PostHog event count = 12 | "12 events" | "12 events" | `rg "track\('" src/ → 18 distinct call-sites` (see Section B) | ⚠️ Both plans wrong: real count = 18; 2 plan-listed names differ from code; 1 absent → NEEDS FOUNDER (§6 Q1) |
| 3 | Generator count | "217" (Layer 1 box) / "~600+" (Phase 1 bullet) — v4 is internally inconsistent | "600+" | `rg -c '\(\)=>\{' src/engine/grades/*.js → grade1:38 grade2:45 grade3:55 grade4:78 grade5:60 grade6:53 = 329` | ⚠️ Neither plan correct; real = **329** → NEEDS FOUNDER (§6 Q1) |
| 4a | question_bank schema | ✅ DONE | "NOT STARTED" | `ls supabase/question_bank.sql → exists; wc -l → 97` | ✅ `supabase/question_bank.sql:1` — v5.1 was wrong |
| 4b | question_bank seeded 2,004 rows | ✅ "2,004 inserted, 331 deduped, 9 invalid" | "NOT STARTED" | `ls scripts/seed_question_bank.mjs → exists; wc -l → 137` — live row count not in files | ⚠️ Seed script confirmed; live row count → NEEDS FOUNDER (§6 Q4) |
| 5 | contexts.js wired | ✅ DONE | "NOT STARTED" | `grep 'contexts' src/engine/config.js → export { CTX, nm, ... } from './contexts.js'` (config.js last line) | ✅ `src/engine/config.js:41` — v5.1 was wrong |
| 6 | gradeRules.js wired | ✅ DONE | "NOT STARTED" | `grep 'validateQuestion' src/engine/exam.js → import line at :8` | ✅ `src/engine/exam.js:8` — v5.1 was wrong |
| 7 | PDF export shipped | ✅ DONE | "In Progress" | `rg 'pdf_export' src/ → src/components/ExportPDFButton.jsx:269` | ✅ `src/components/ExportPDFButton.jsx:2` |
| 8 | Password reset flow | ✅ DONE | ☐ pending | `rg 'resetPasswordForEmail' src/ → src/hooks/useAuth.js:55` | ✅ `src/hooks/useAuth.js:55` — v5.1 was wrong |
| 9 | Capacitor build fixed | ✅ "removed dead capacitor.js loader" | ☐ pending | `ls src/capacitor.js public/capacitor.js → both absent` | ✅ capacitor.js absent from src/ and public/ |
| 10 | E2E + Lighthouse done | ✅ DONE (manual) | ☐ pending | `ls .github/ → no such dir; find . -name 'playwright*' -o -name 'cypress*' -o -name 'lighthouserc*' → nothing` | ☐ no automated E2E or Lighthouse artifacts in repo |
| 11 | future_tables.md complete | ✅ DONE | ✅ DONE | `ls docs/future_tables.md → exists` — documents 5 tables: student_profiles, subscriptions, quest_progress, topic_map, knowledge_gaps | ✅ `docs/future_tables.md` |
| 12 | Commit count | "v1.2-beta" (no count) | "26 commits, 2 releases" (Apr 17 snapshot) | `git rev-list --count HEAD → 98` | ⚠️ v5.1 stale; current HEAD = **98** commits → NEEDS FOUNDER for release count |
| 13 | GitHub repo name | not stated | `oneup24/maths-exam` | `git remote -v → https://github.com/oneup24/maths-up` | ⚠️ v5.1 wrong — actual repo is `oneup24/maths-up` |
| 14 | Deployed URL | "live on Vercel" | `maths-exam.vercel.app` | `grep vercel README.md → nothing`; no vercel.json in repo; `index.html` title = "Maths-Up" | ⚠️ Cannot verify from code; v5.1 URL likely stale → NEEDS FOUNDER |
| 15 | Capacitor appId / appName | not stated | not stated | `cat capacitor.config.json → appId:"com.mathexam.app", appName:"math-exam"` | ⚠️ Pre-rename (stale) → NEEDS FOUNDER (§6 Q7) |
| 16 | Brand name consistency | "Maths Quests (數學特訓)" | "Maths Quests" + `maths-exam.vercel.app` | `rg 'maths-exam\|maths-up\|Maths Quests\|Maths-Up\|math-exam' -g '!node_modules' → 5 variants in 25+ locations` (see Section B) | ⚠️ 5 different names active across codebase → NEEDS FOUNDER (§6 Q7) |
| 17 | RLS policies | ✅ stated done | ✅ stated done | `cat supabase/setup.sql → USING(true) on questions, WITH CHECK(true) on user_errors INSERT`; exam_sessions RLS absent from all .sql files | ⚠️ 2 `USING(true)` policies violate new plan rules (§4 F5); exam_sessions RLS not version-controlled → NEEDS FOUNDER (§6 Q5) |
| 18 | Per-question responses table | not mentioned | not mentioned | `rg 'responses' supabase/ → no match` | ☐ does not exist |
| 19 | topic_map as real deployed table | ☐ planned Phase 4B | ☐ planned Phase 4B | `grep 'topic_map' supabase/question_bank.sql → not found`; schema only in docs/future_tables.md | ☐ schema-only in docs, not deployed |
| 20 | exam_sessions stores per-question data | not mentioned | not mentioned | `sed -n '7,16p' src/services/api.js → insert payload: {user_id, level, topic_code, topic_breakdown, total_questions, correct_count, score_percentage, time_spent}` — no questions JSONB, no answer array | ☐ aggregate only; per-question data unrecoverable from existing records |
| 21 | Guest mode skips Supabase | "minus cloud sync" | "minus sync/print" | `grep -n 'if(user)' src/App.jsx → :208 if(user){ saveExamResult(...) }` | ✅ `src/App.jsx:208` — gated on authenticated user |
| 22 | Orphan files at root / stray files | N/A | N/A | `ls app.json → exists; cat app.json → Expo config {name:"Math Exam", slug:"math-exam"}`; `ls src/questions.js.save → exists` (shell commands, not JS) | ⚠️ `app.json` is an Expo config at root (Capacitor project should not have this); `src/questions.js.save` is a stray editor backup |
| 23 | Google OAuth | not mentioned | ✅ "Supabase email auth, Google OAuth" | `rg 'signInWithOAuth\|google' src/ → no match`; README.md line 24 says "Auth (Google + Email)" but README is wrong | ☐ No OAuth in codebase; v5.1 claim incorrect; README incorrect |

### Additional corrections not in original 23-item list

| # | Claim | v4 says | v5.1 says | Evidence | Verdict |
|---|-------|---------|-----------|----------|---------|
| 24 | Exam targets | "practice 12, test 15, exam 24" | not stated | `grep 'EXAM_TARGETS' src/engine/config.js → {practice:10, test:20, exam:35}` | ⚠️ v4 wrong on all three; real values: 10/20/35 |
| 25 | Section ratios | "calc 28%, fill 18%, MC 12%, short 22%, working 20%" | not stated | `grep 'SECT_RATIOS' src/engine/config.js → {mc:.15, fill:.20, calc:.20, short:.15, work:.30}` | ⚠️ v4 wrong on all five; real: mc 15%, fill 20%, calc 20%, short 15%, work 30% |
| 26 | Difficulty labels | "Basic / Standard / Challenge" | "Basic / Standard / Challenge" | `grep 'DIFF_INFO' src/engine/config.js → 基礎鞏固 / 呈分實戰 / 奧數拔尖` | ⚠️ Both plans wrong; real labels are Chinese |
| 27 | exam_sessions column: score_percent vs score_percentage | `score_percent` | not stated | `grep 'score_perc' src/services/api.js → line 14: score_percentage: scorePercent` | ⚠️ v4 schema docs say score_percent; code inserts to score_percentage → NEEDS FOUNDER to confirm live column name |
| 28 | scripts/ directory | not mentioned | not mentioned | `ls scripts/ → convert-images.mjs, seed_question_bank.mjs` | ✅ scripts/ exists with 2 files |

---

## B. REAL NUMBERS

### Generator count — 329 total
Command: `rg -c '\(\)=>\{' src/engine/grades/grade1.js src/engine/grades/grade2.js src/engine/grades/grade3.js src/engine/grades/grade4.js src/engine/grades/grade5.js src/engine/grades/grade6.js`

| File | Count |
|------|-------|
| grade1.js | 38 |
| grade2.js | 45 |
| grade3.js | 55 |
| grade4.js | 78 |
| grade5.js | 60 |
| grade6.js | 53 |
| **Total** | **329** |

v4's "217" was the pre-EDB-audit count. v4 is itself internally inconsistent ("217" in the Layer 1 appendix, "~600+" in Phase 1 bullet). "600+" in both plans is not a count of functions — it may refer to question instances generatable.

---

### Commit count — 98
Command: `git rev-list --count HEAD → 98`

v5.1's "26 commits" was an April 17, 2026 snapshot.

---

### Capacitor config — exact values
Command: `cat capacitor.config.json`

- `appId`: `com.mathexam.app`
- `appName`: `math-exam`
- `webDir`: `dist`
- iOS `contentInset`: `always`
- Android `allowMixedContent`: `true`
- SplashScreen `launchShowDuration`: `3000`

Warning: `appId` becomes the immutable App Store bundle ID on first submission. Changing it after submission = new App Store listing. The current value is stale (pre-Maths-Up rename).

---

### PostHog event names — 18 found in code
Command: `rg "track\('" src/ --no-heading`

| Event name | File:line | In both plans? |
|---|---|---|
| `onboarding_start` | src/Onboarding.jsx:72 | ☐ not in plans |
| `onboarding_language` | src/Onboarding.jsx:79 | ☐ not in plans |
| `onboarding_grade` | src/Onboarding.jsx:80 | ☐ not in plans |
| `onboarding_question_answered` | src/Onboarding.jsx:87 | ☐ not in plans |
| `onboarding_guest` | src/Onboarding.jsx:94 | ☐ not in plans |
| `onboarding_signup` | src/Onboarding.jsx:103 | ☐ not in plans |
| `onboarding_login` | src/Onboarding.jsx:107 | ☐ not in plans |
| `onboarding_complete` | src/App.jsx:127 | ✅ |
| `quiz_start` | src/App.jsx:134 | ❌ plans say `exam_start` |
| `quiz_complete` | src/App.jsx:154 | ❌ plans say `exam_complete` |
| `results_view` | src/App.jsx:155 | ✅ |
| `retry_click` | src/App.jsx:218 | ✅ |
| `guest_signup_prompt_shown` | src/App.jsx:446 | ✅ |
| `guest_signup_prompt_clicked` | src/App.jsx:272 | ✅ |
| `grade_selected` | src/App.jsx:290 | ✅ |
| `pdf_export` | src/components/ExportPDFButton.jsx:269 | ✅ |
| `parent_pin_set` | src/Profile.jsx:167 | ✅ |
| `signup_complete` | src/hooks/useAuth.js:39 | ✅ |
| `lang_switch` | **NOT IN CODE** | ✅ listed in plans — absent |

Plans say 12 events; code has 18. Plans list `exam_start`/`exam_complete` — code uses `quiz_start`/`quiz_complete`. Plans list `lang_switch` — not in code.

---

### Brand names — all active occurrences
Command: `rg -n 'maths-exam|maths-up|Maths Quests|Maths-Up|math-exam' -g '!node_modules' -g '!dist' -g '!*.lock'`

| Name | Locations |
|------|-----------|
| **Maths-Up** | `index.html:8` (title), `index.html:19` (apple-mobile-web-app-title), `index.html:33` (og:title), `src/lib/i18n.js:3` (appTitle zh), `src/lib/i18n.js:99` (appTitle en), `src/components/ui/Sidebar.jsx:35` |
| **maths-up** | `package.json:2` (name field) |
| **Maths Quests** | `README.md:1`, `CLAUDE.md:1`, `src/Onboarding.jsx:156`, `src/PrivacyPolicy.jsx:34`, `src/components/home/CurlbooHero.jsx:25`, `src/components/ExportPDFButton.jsx:82`, `src/components/ExportPDFButton.jsx:266`, `public/manifest.json:2`, `docs/CHANGELOG.md:3`, `docs/data_schema.md:1`, `docs/CONTEXT_PRIMER.md:3` |
| **math-exam** | `capacitor.config.json:3` (appName), `app.json:4` (Expo slug) |
| **maths-exam** | `docs/OU_MASTER_PLAN_V5.1.md` (6 occurrences — all stale) |

5 variants in active use. Critical: `public/manifest.json:2` still says "Curlboo & Fluffy's Maths Quests" — this is what displays on PWA home screen install.

---

### RLS policies found in version-controlled files

| File | Table | Policy type | Condition | Risk |
|------|-------|-------------|-----------|------|
| `supabase/setup.sql:3` | `questions` | SELECT | `USING (true)` | ⚠️ Fully public read, no auth — forbidden under new rules (§4 F5) |
| `supabase/setup.sql:8` | `user_errors` | INSERT | `WITH CHECK (true)` | ⚠️ Anyone can insert — forbidden under new rules |
| `supabase/setup.sql:11` | `user_errors` | SELECT | `USING (false)` | ✅ No read = intentional |
| `supabase/question_bank.sql:68` | `question_bank` | SELECT | `USING (status = 'verified')` | ⚠️ Public read of verified questions (no auth.uid() check) |
| `supabase/question_bank.sql:94` | `student_question_history` | ALL | `USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)` | ✅ Correctly user-scoped |

`exam_sessions` RLS: **not in any .sql file**. Applied directly in Supabase dashboard (confirmed by founder). Not version-controlled.

---

## C. NEEDS FOUNDER — §6 QUESTIONS

All 10 questions from v6_regen.md §6. Prior-session answers noted where available.

**§6 Q1 — Real generator count: 217, 600+, or 329?**
`rg -c '\(\)=>\{' src/engine/grades/*.js` → **329 total** (grade1:38, grade2:45, grade3:55, grade4:78, grade5:60, grade6:53).
*Prior session: founder confirmed 329 as authoritative.* ✅ SETTLED

**§6 Q2 — Sentry: actually live?**
`grep '@sentry' package.json → "@sentry/react": "^10.49.0"` (line 26); `src/lib/sentry.js:1` exists.
*Prior session: confirmed ✅ live.* ✅ SETTLED

**§6 Q3 — PDF export: complete or in progress?**
`rg 'pdf_export' src/components/ExportPDFButton.jsx → :269` (track call present = file ships in production).
*Prior session: confirmed ✅ complete.* ✅ SETTLED

**§6 Q4 — question_bank: how many rows in Supabase right now?**
Seed script `scripts/seed_question_bank.mjs` exists (137 lines). v4 claims 2,004 inserted. Live row count is not verifiable from files.
*Prior session: founder answered "Unsure".* ⚠️ NEEDS FOUNDER — please run `SELECT count(*) FROM question_bank` in Supabase dashboard and provide the number.

**§6 Q5 — RLS: migration files or Supabase dashboard?**
Only 2 .sql files in `supabase/`. `exam_sessions` RLS is not in either. `questions` and `user_errors` are in `setup.sql`; `question_bank` and `student_question_history` are in `question_bank.sql`.
*Prior session: founder confirmed exam_sessions RLS is dashboard-only.*
→ **Additional sub-question for new plan (§4 F5):** All future schema changes must go through `supabase/migrations/*.sql`. Should setup.sql be converted to a migration? And should the 2 `USING(true)` policies be corrected? **Yes / No / Gate 0 item**

**§6 Q6 — How many of the 10 soft-launch families are recruited so far?**
No code artifact. *Prior session: founder said "Partial — seem close, user used".* ⚠️ NEEDS FOUNDER — exact number (e.g. 3/10, 7/10)?

**§6 Q7 — Final brand name + final appId?**
*Prior session: founder confirmed:*
- *User-facing app name: Maths-Up*
- *Marketing/docs name: Maths-Up*
- *appId/appName should be updated in capacitor.config.json*
- *But did NOT specify new appId and appName values*
⚠️ NEEDS FOUNDER — what should the new `appId` and `appName` be? (e.g. `com.oneup24.mathsup` / `Maths-Up`) — Note: appId becomes immutable on App Store submission.

**§6 Q8 — Studio Hub + 3 "Coming Soon" cards: keep or defer?**
v6_regen.md §4 E4 flags this as contradicting Principle #10 ("Maths Quests first, everything else frozen"). Building marketing for frozen products = working on them.
*Not answered in prior session.* ⚠️ NEEDS FOUNDER — (A) keep 3 Coming Soon cards, or (B) 1 live app + newsletter capture only, defer cards until Maths-Up has revenue?

**§6 Q9 — Two IG accounts (@curlboo.bear 132 + @oneup24game 200): consolidate or keep both?**
*Not answered in prior session.* ⚠️ NEEDS FOUNDER — (A) keep both, (B) consolidate to one, (C) consolidate with redirect?

**§6 Q10 — First Topic Quest chain: fractions (P1→P4) as assumed, or another topic?**
v6_regen.md §4 A4 specifies Phase 3E ships Topic Quest v1 on **one single hardcoded chain**. §4 D2 assumes fractions P1→P4 (~5 rows in topic_map.csv) as the first chain.
*Not answered in prior session.* ⚠️ NEEDS FOUNDER — which topic should be the first Quest chain? (A) Fractions P1→P4, (B) another topic?

---

## D. OTHER FINDINGS (no founder decision needed — document for completeness)

- **`app.json` at root** — An Expo config (`{"expo": {"name": "Math Exam", "slug": "math-exam", ...}}`). Capacitor projects should not have this file. It is a stray Expo artifact from an earlier setup attempt. Unlike `src/questions.js.save` (editor backup), this file is referenced by nothing in the current codebase and should be removed (but removal is in root, outside `docs/**` scope of this task).

- **`src/questions.js.save`** — Contains shell commands (`mkdir -p src/lib`, `nano src/lib/engine.js`), not JavaScript. Dead file.

- **`student_question_history` table** — Defined in `supabase/question_bank.sql:88–97` with correct RLS (`auth.uid() = user_id`). Stores `(user_id, question_id, served_at, was_correct, time_spent_seconds)`. Not mentioned in either plan or `docs/future_tables.md`. It is Phase 4B "no-repeat serving" infrastructure already schema'd — this should be documented in `future_tables.md`.

- **`questions` table** — Has an RLS policy in `supabase/setup.sql`. Not documented in either plan, `future_tables.md`, or `data_schema.md`. Appears to be a legacy table predating `question_bank`. Its schema is not in any .sql file.

- **`public/manifest.json`** — Says `"name": "Curlboo & Fluffy's Maths Quests"`. This is the PWA install name shown on phone home screens. Must be updated when brand is unified to Maths-Up.

- **`docs/(OUTDATED)MASTER_PLAN_v2.md` and `docs/(OUTDATED)MASTER_PLAN_v3.md`** — Already prefixed "(OUTDATED)". These pre-date v4 and v5.1; they should be moved to `docs/_archive/` in Stage 2.

- **`README.md` line 24** — Says "Auth (Google + Email)". No OAuth in codebase. Must be corrected.

- **`docs/CONTEXT_PRIMER.md` line 3** — References "v1.3-beta" — check whether this is still the current version.

- **Exam targets**: Both plans state "practice 12, test 15, exam 24". Code: `EXAM_TARGETS={practice:10, test:20, exam:35}` at `src/engine/config.js`. Both plans are wrong. Correct values are 10/20/35.

- **Section ratios**: v4 states "calc 28%, fill 18%, MC 12%, short 22%, working 20%". Code: `SECT_RATIOS={mc:.15, fill:.20, calc:.20, short:.15, work:.30}`. v4 is wrong on all five. Work:30% (not 20%) is the largest section.

- **Difficulty labels**: Both plans use "Basic / Standard / Challenge". Code: `基礎鞏固 / 呈分實戰 / 奧數拔尖`. Both plans are wrong.

---

## AWAITING APPROVAL — reply "APPROVED v6" plus answers to §6 Q4, Q6, Q7, Q8, Q9, Q10 above.
(Q1–Q3 and Q5 are settled from prior session; Q7 is partially settled but needs the actual appId/appName values.)
