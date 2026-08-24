TASK: Regenerate the OneUp24 Master Plan as v6.0
0. ROLE
You are doing a documentation consolidation and correction pass on this repo. You are NOT writing product code. Two legacy plan documents have drifted apart and now contradict each other in ~14 places. Your job is to produce one authoritative set of docs, with every status claim backed by evidence from the actual codebase.

1. HARD CONSTRAINTS — read before anything else
MUST NOT:

Edit anything in src/, supabase/, content/, android/, ios/, scripts/
Run any migration, or DROP/TRUNCATE anything (question_bank reportedly holds 2,004 verified questions)
Write ✅ on any item without a file path + line/symbol as evidence
Summarize, condense, or "tidy up" strategic content. You are reorganizing and correcting, not rewriting. When unsure whether to keep something → keep it
Invent dates, metrics, follower counts, commit counts, or generator counts
Create any file named *_v6.md, *_v7.md etc. (version numbers live in the header, not the filename)
MAY EDIT: docs/** only.

Status legend — use exactly these, nothing else:

✅ = verified in code. Must be followed by evidence e.g. ✅ (src/lib/sentry.js:1)
⚠️ = the two source docs disagree, OR cannot be verified from code. Must be followed by → NEEDS FOUNDER
☐ = searched, not found in codebase
**CONTEXT DISCIPLINE — hard rule, not a suggestion:**

- NEVER `Read` a file longer than ~400 lines in full. Use `rg` / `grep` / `wc -l` /
  `sed -n 'X,Yp'` to extract only what you need.
- All COUNTING tasks must use shell commands. Report the command AND its output as
  the evidence string. Do not count by reading.
- `src/engine/**` may contain hundreds of generators in very large files.
  ⛔ Do NOT open it in full. Count with something like:
      rg -c '^\s*(export\s+)?(function|const)\s+gen' src/engine/
      wc -l src/engine/*.js
- Same for brand-name audit: `rg -n 'maths-exam|maths-up|Maths Quests' -g '!node_modules'`
- If you find yourself about to read >400 lines, stop and tell me which file and why.

2. STAGE 1 — AUDIT ONLY. Do not write the new plan yet.
2.1 Read
docs/MASTER_PLAN_V5.1.md (or whatever the v5.1 file is named)
docs/Master_Plan_v4.md
CLAUDE.md
README.md
package.json, capacitor.config.json, index.html, vite.config.js
docs/future_tables.md, docs/data_schema.md (if they exist)
Directory listing of src/, supabase/, scripts/, content/
2.2 Verify every disputed claim against code
Produce docs/AUDIT_v6.md containing a table with these columns:
Claim | v4 says | v5.1 says | Evidence found | Verdict

Items to verify (this list is not exhaustive — add anything else you find contradictory):

#	Claim	How to check
1	Sentry integrated	grep @sentry, Sentry.init; check package.json deps
2	PostHog integrated + how many events	grep posthog; list the actual event name strings you find in track.js or equivalent
3	Generator count (v4 says 217, v5.1 says 600+)	count generator functions/exports in src/engine/**. Report the real number
4	question_bank table created + seeded	check supabase/question_bank.sql and seed script exist. Row count is NOT verifiable from code → ⚠️
5	contexts.js exists and is wired into generators	grep imports
6	gradeRules.js exists and is wired into exam build	grep validateQuestion / imports
7	PDF export shipped	grep ExportPDFButton
8	Password reset flow	grep resetPasswordForEmail
9	Capacitor build fixed / dead capacitor.js removed	check file existence
10	E2E + Lighthouse done	look for test files / CI config / reports. If none → ☐
11	future_tables.md complete	check file + which tables it documents
12	Commit count	git rev-list --count HEAD
13	Repo name + remote	git remote -v
14	Deployed URL	grep in README / vercel config
15	Capacitor appId and appName	read capacitor.config.json — quote the exact values
16	Brand name consistency	grep for maths-exam, Maths Quests, maths-up, mathsexam across repo. List every file + line
17	RLS policies	list every policy found in supabase/**. Flag any using (true). If policies live only in the Supabase dashboard → ⚠️
18	Does a per-question responses table exist anywhere	grep. Expected: no
19	Does topic_map exist as a real table	grep. Expected: schema only
20	Does exam_sessions store ANY per-question data	inspect the insert payload in api.js — is there a questions JSONB, an answers array, anything item-level? This determines whether historical data is partially recoverable
21	Guest mode: does it write to Supabase at all	trace the guest code path
22	Orphan/dead files at root	check for App.js, app.json (Expo signatures). grep -r for references before concluding
23	Stray/unused files	anything in src/ not imported
2.3 Then STOP
Output in chat:

The full verdict table
A numbered list of every ⚠️ NEEDS FOUNDER item, phrased as a direct yes/no or one-of-N question
The exact real numbers for: generator count, commit count, appId, PostHog event names, brand-name occurrences
Then write literally: AWAITING APPROVAL — reply "APPROVED v6" plus answers to the questions above.

Do not proceed to Stage 2 until I reply.

3. STAGE 2 — Write the new docs (only after approval)
### 3.0 Execution order — commit after EVERY step

Create docs/prompts/v6_progress.md as a checklist, tick after each commit:

  [ ] 1.  cp baseline + commit
  [ ] 2.  GROUP A (structural: doc split, Gate 0, Phase 3E, Phase 4 order, gate table)
  [ ] 3.  GROUP B (responses table, blocked-features table, time matrix, guest policy)
  [ ] 4.  GROUP C (generator quarantine, AI-emits-template, coverage math, copyright)
  [ ] 5.  GROUP D (content CSV layer, topic_map, grade-label fix, trap merge, report standard)
  [ ] 6.  GROUP E (Stripe-only, break-even, CAC assumption, Studio Hub, appId)
  [ ] 7.  GROUP F edits inside MASTER_PLAN.md (KPIs, 3D questions, next-5-actions)
  [ ] 8.  Appendix E — v6.0 changelog listing every applied edit
  [ ] 9.  STATUS.md
  [ ] 10. DECISIONS.md
  [ ] 11. CLAUDE.md append (F5)
  [ ] 12. Archive move + banners + final acceptance check (§7)

RULES:
- One commit per step. Commit message: "docs(v6): step N — <what>"
- After each commit, tick the box in v6_progress.md and include it in that commit.
- If context gets low: STOP. Report the last completed step. Do NOT rush ahead
  and do NOT compress remaining work.
- Steps 2-7 each touch MASTER_PLAN.md only. Steps 9-11 create new files.
3.1 Output files
reasonml
docs/
  MASTER_PLAN.md      ← strategy only. ZERO checkboxes, ZERO status marks
  STATUS.md           ← the ONLY place execution status exists
  DECISIONS.md        ← settled decisions, not to be reopened
  AUDIT_v6.md         ← from Stage 1, keep it
  _archive/
    Master_Plan_v4.md
    MASTER_PLAN_V5.1.md

Every archived file gets this as line 1:
> ⛔ HISTORICAL — DO NOT REFERENCE. Superseded by docs/MASTER_PLAN.md + docs/STATUS.md (v6.0, <date>).

Write and commit one file at a time so nothing is lost if context runs short.

### 3.2 MASTER_PLAN.md — build by COPY-THEN-EDIT, never by retyping

STEP 1  cp docs/MASTER_PLAN_V5.1.md docs/MASTER_PLAN.md
        git add -A && git commit -m "docs: baseline MASTER_PLAN from v5.1"
        ← this commit is the safety net. Do this FIRST, before any edit.

STEP 2  Apply §4 edits to docs/MASTER_PLAN.md using Edit / MultiEdit ONLY.
        Surgical diffs. One GROUP per commit.
        ⛔ Never rewrite a whole Part from memory when an Edit will do.
        ⛔ Never regenerate the file from scratch.

STEP 3  Header → Version 6.0, date, Status: ACTIVE.
        Add the line: "Execution status lives ONLY in docs/STATUS.md.
        This file describes WHAT and WHY, never WHETHER."

STEP 4  git mv the two legacy files into docs/_archive/ and prepend the banner.

RATIONALE: this makes §5 PRESERVE automatic. Content survives by construction,
not by your diligence. My review method is `git diff`, so keep diffs minimal
and semantically meaningful.

VERIFY:  wc -w docs/MASTER_PLAN.md   must be >= 85% of
         wc -w docs/_archive/MASTER_PLAN_V5.1.md
         If below, you over-summarized → git revert and redo with Edit only.
3.3 STATUS.md
Short, scannable, dated
One table per Phase: Item | Status | Evidence | Owner
Every row uses the §1 legend with evidence
Bottom section: ⚠️ NEEDS FOUNDER DECISION — the unresolved items, so they stay visible
Header rule: Any agent completing a task MUST update this file in the same commit.
3.4 DECISIONS.md
Format per entry: Date | Decision | Reason | Status: SETTLED — do not reopen

Seed it with the decisions in §4 that I approve, plus a template for future ones.

4. EDITS TO APPLY
GROUP A — structural
A1. The doc split above.

A2. D0–D3 become epic labels only (like Jira tags). Phase 1–6 is the single scheduling authority. Every D-item must be assigned to exactly one Phase. Delete the v5.1 line "They are SEPARATE. Don't confuse them." — replace with the new rule. No D-item may be "PARTIAL across phases"; split it into two items with different IDs instead.

A3. Insert a new Gate 0 phase, positioned before Phase 3D, containing:

Doc consolidation (this task)
scripts/audit-generators.js + quarantine flag
responses table migration + write path
PostHog question_answered event
RLS audit (including hunting using (true) policies)
Brand name + appId unification
Topic Quest grade-label decision recorded in DECISIONS.md
Soft-launch families sign in (no guest mode)
Gate condition: audit script reports 0 violations (or all violators quarantined) + responses table receiving rows + RLS verified + naming unified → only then may family #1 be onboarded.

A4. Insert a new Phase 3E between 3D and Phase 4:

topic_map.csv hand-authored for ONE prerequisite chain only (fractions P1→P4, ~5 rows)
misconceptions.csv ~25 rows with parent_advice_zh
Misconception report = 各單元表現 + exactly one recommended action
PDF becomes a 3-page set: ① student paper ② answers + worked solutions ③ parent report
Topic Quest v1 on that single hardcoded chain (do not wait for full topic_map system)
Manual pre-sale: 3 parents × HKD 388 via FPS/PayMe, manually inserted into subscriptions
Expand context bank
Gate condition: 3 parents have actually paid. If not → revise the report, do not build mobile.

A5. Explicit Phase 4 execution order, stated at the top of Part D5:
4B-lite → 4C (Stripe web) → 4A (mobile)
Rationale to include: 4A is distribution; distribution before product-market fit is wasted. 4B contains Topic Quest = paywall gate 4 = the plan's own highest-intent conversion moment. Build what makes people pay before what makes people download.

A6. Add a consolidated Gate table as a new Part before Part L:

Gate	Condition	If not met
0 → 3D	docs unified + generator audit clean + responses live + RLS verified	no families
3D → 3E	10 families × 3 sessions + both interview questions asked	no new features
3E → 4	3 parents paid HKD 388	fix the report, don't build mobile
4B → 4C	full Topic Quest chain works + traps mapped to misconceptions	don't open Stripe
4C → 4A	20 paying users	android/ ios/ stay frozen
4A → 5	MRR > HKD 10K for 2 consecutive months	no pitch deck
GROUP B — the data moat (highest priority content change)
B1. Add a responses table to Part I3 as a Gate 0 deliverable, and add a subsection explaining why: exam_sessions.topic_breakdown is aggregate counts per topic per session. It cannot answer: which question, what the child answered, seconds per question, which attempt. It is not backfillable.

sql
create table responses (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references exam_sessions(id) on delete cascade,
  user_id         uuid references auth.users(id) on delete cascade,
  question_id     uuid,              -- question_bank.id; null if Layer 1 generated
  generator_id    text,              -- Layer 1 generator identifier
  topic_id        text not null,
  q_index         int not null,
  is_correct      boolean not null,
  raw_answer      text,
  matched_trap    text,              -- which trap/distractor was hit
  time_spent_ms   int,
  attempt_no      int default 1,
  content_version text,
  created_at      timestamptz default now()
);
alter table responses enable row level security;
create policy "owner" on responses using (user_id = auth.uid());
create index on responses (user_id, topic_id, is_correct);
create index on responses (question_id);

Keep topic_breakdown as a read cache. responses becomes the source of truth.

B2. Add a table listing the 8 features in the existing plan that are blocked until responses exists: Daily Challenge's "3-5 error-based questions" (Phase 4B P0), spaced repetition (D3c), no-repeat question serving, "report wrong answer", question_bank quality learning (times_served/times_correct/avg_time_spent), trap_fall_rate, per-station Quest analytics, empirical difficulty calibration.

B3. Add the time_spent_ms diagnostic matrix to Part D:

fast	slow
correct	mastered	knows it, not fluent → drill for fluency
wrong	careless / guessing	conceptual gap → re-teach
Note: "knows it but slow" and "doesn't know it" produce completely different parent advice.

B4. Add a Guest Mode Data Policy subsection. Guest = localStorage only = zero cloud diagnostic data, while also being the frictionless default path. For Phase 3D: all 10 families sign in (the founder is hand-holding them anyway). Post-3D option: anonymous device_id sessions merged on signup. Keep the existing NEVER break guest mode rule intact — this is additive.

B5. Add content_version (sourced from content/VERSION) to responses, and note why: after fixing a generator bug you must be able to query which sessions were affected.

GROUP C — correctness & risk
C1. The 8 known generator bugs (Part D6) currently have no owner and no date, while Phase 3C is marked done and Phase 3D is in progress. Give them an explicit owner phase: Gate 0, using quarantine, not refactor:

scripts/audit-generators.js: every generator × 500 generations, machine-check 6 invariants — (a) answer ≠ any given value [bug 4] (b) division yields an integer where the grade requires it [bug 2] (c) no diagram label equals an unknown value [bug 1] (d) answer > 0 [bug 6] (e) MC options unique and format-consistent [bug 8] (f) shape aspect ratio ≤ 5:1 [bug 5]
Violators get status: 'quarantined' and are excluded from buildExam — do not attempt the 3-layer schema refactor before soft launch. Rationale to state explicitly: 150 clean generators beats 600 buggy ones, because a small bank can be grown later but trust cannot be rebuilt (this is the plan's own Risk #7).
3-layer schema (given/unknown/display) stays as a real fix, scheduled at Phase 4B.
C2. Rewrite the Phase 4B AI validation pipeline. Step 2 "Math verification: solve independently using Layer 1 chkAns" is not achievable — chkAns compares a student string against a stored answer; it cannot solve a natural-language word problem. Replace the architecture with:

AI emits templates, never finished questions. AI outputs {skill_id, body_zh with {{slots}}, slots, constraints, answer_expr, traps[{expr, misconception_code}]}. Layer 1 fills parameters and computes the answer from answer_expr. The AI never asserts an answer.

Add the payoff: Risk #7 shifts from mitigated to structurally eliminated; human review drops from 20 questions to 1 template; validation becomes algebraic evaluation instead of NLP; question_bank is unchanged, with a new item_templates layer beside it.

Frame it as an extension of the plan's own principle: AI-as-Factory — the factory should build the machines, not the products.

C3. Add a Content Coverage subsection quantifying the founder's "not rich enough" complaint:
2,004 questions ÷ (6 grades × ~8 topics × 3 difficulties × 5 types ≈ 720 buckets) ≈ 2.8 per bucket. For P4: ~334 questions ÷ 9 topics ÷ 3 difficulties ≈ 12 per topic-difficulty. Consequences: a single 15-question single-topic paper exhausts a bucket; the "no repeat per student" rule is mathematically impossible; a Topic Quest station retried 3 times must repeat; ~3 months of weekly use burns >50% of a grade's bank.
Conclusion: the fix is templates × contexts × parameter space, not more finished questions. Recalculate these numbers using the real generator count from Stage 1.

C4. Add a Past-paper copyright policy subsection. Mathematical structures, concepts and question types are not protected; expression is. Past papers are a source of blueprint intelligence, not content. Safe to extract: which skills are tested, mark distribution, timing, format mix, mathematical structure. Never store: original wording; never use school names in marketing. Add derived_structure as a question_bank.source value. CI must hard-fail any license: restricted. Add the rule: the notes column must never contain original wording.

GROUP D — content layer
D1. Add a content/ CSV layer to Part I as additive metadata on top of the existing engine — explicitly NOT a replacement for question_bank, contexts.js, gradeRules.js or the generators:

ebnf
content/
  README.md              (Chinese column documentation — mandatory)
  topic_map.csv          ← D1a. CSV beats hand-written SQL INSERTs
  skills.csv             ← sub-skill layer, ONLY for the first 3 topics (~18 rows, not 900)
  traps.csv              ← trap + distractor + misconception, merged
  misconceptions.csv     ← parent_advice_zh library
  item_templates.csv     ← the richness fix
  contexts.csv           ← exported from contexts.js, made non-engineer editable
  blueprints.csv
  blueprint_sections.csv
  VERSION

Three hard rules: multi-value fields use | not commas; files must be UTF-8 (Excel corrupts Traditional Chinese by default — author in Google Sheets, export CSV, CI checks encoding + BOM); IDs are never renamed or reused once live, because responses references them.

D2. topic_map.csv must include a quest_station_name_zh column. topic_id must match the existing topicId values in the engine — do not invent a parallel ID system.

D3. Resolve a direct contradiction. v4: "No grade labels shown inside a Quest." v5.1's own D2d mockup shows "起點：平均分（P1）… 終點站：異分母加減（P4）". v5.1's version violates the plan's own core premise that the child must not feel sent backwards. Resolution: one dataset, two renderings — child view shows quest_station_name_zh only; parent report shows topic_name_zh (grade). Record in DECISIONS.md. This also aligns with the newly split desktop parent UI / tablet student UI.

D4. Merge Trap Item Engine with distractors + misconceptions into a single system. They are the same thing from different angles: trap = the planted wrong path; distractor = the wrong answer it produces; misconception = the name of the reasoning error; trap_fall_rate = the measurement. One traps.csv, one engine. State the benefit: the #1 differentiator becomes the #1 diagnostic asset, and trap_fall_rate upgrades from a number into a parent report sentence. This reduces total build scope.

D5. Granularity. topic_map.prerequisites at topic level is sufficient for Topic Quest routing but insufficient for specific parent advice. Add a sub_skill layer for the first 3 topics only (~6 each ≈ 18 rows). Do not build a 900-skill taxonomy.

D6. Add the actionable report standard to Part D, as the product's core requirement:

❌ "Fractions: 60% / Measurement: 85%"
✅ "This week's focus: adding fractions with the same denominator. She added the denominators together 3 times — this is conceptual, not arithmetic carelessness. → [Start the Fractions Quest] or [Print 8 targeted questions]"

State plainly: every schema decision above exists to support that one sentence. If the report cannot produce it, the schema was wasted.

D7. blueprint_sections.csv includes use_weak_topics (boolean). Note: this single flag is the retention mechanism — the paper visibly adapts to the specific child. Not gamification.

GROUP E — money & focus
E1. Payments: Stripe web only until 20 paying users. Defer RevenueCat, IAP and cross-platform entitlements. Correct the reasoning in the plan: Apple/Google take 15%, not 30%, under the Small Business Program (<US$1M annual proceeds) and Google's first-US$1M tier — so the real argument is integration complexity for a solo founder (3 integrations + webhooks + receipt validation), not the cut. Keep pricing exactly as-is (HKD 48 / 388 / 78 / 628), push annual as primary (Stripe HK fee burden ≈ 4.0% on HKD 388/yr vs ≈ 8.3% on HKD 48/mo), monthly as decoy.

E2. Re-derive infra break-even. The plan claims 53 Pro subscribers. Actual likely stack (Supabase Pro ~$25 + Vercel Pro ~$20 + PostHog free + Sentry free + domain) ≈ US$50–70/mo ≈ HKD 390–550 ≈ 8–12 subscribers. Show both numbers and label clearly which is infrastructure break-even vs operations including founder salary. Mark ⚠️ if you cannot verify the actual plan tiers in use.

E3. Add a caveat to the unit economics: CAC < HKD 30 and 12.8:1 LTV:CAC are unvalidated assumptions — 332 combined IG followers, no paid ads run, no users. Label them ASSUMPTION not TARGET.

E4. Studio Hub + 3 "Coming Soon" cards contradicts the plan's own Principle #10 ("Maths Quests first, everything else frozen") — building marketing for frozen products is still working on them. Recommend: 1 live app + newsletter capture; drop the 3 cards until app #1 has revenue. Flag as a founder decision, do not unilaterally delete Part F.

E5. Add naming/appId unification as a Gate 0 item, listing every location found in Stage 1. Include the warning: capacitor.config.json's appId becomes the immutable App Store bundle ID. Use the real current value from Stage 1.

GROUP F — engineering hygiene
F1. Add npm run content:check + CI as a Gate 0/Phase 1 requirement, asserting: (1) all cross-file ID references resolve (2) no cycles in prereq_topic_ids (3) every template × 100 seeds satisfies constraints and computes an answer (4) every example_seed still yields example_answer — regression guard (5) license=restricted fails the build (6) plausible_min/max always present (7) UTF-8, no BOM (8) live templates have ≥2 traps (9) every topic_map row has quest_station_name_zh. Errors must print Chinese + filename + line number, because the founder reads them, not the agent.

F2. Add per-question KPIs to Part L1: question_answered volume, per-question abandonment point, median time_spent_ms by topic, trap_fall_rate by trap type, misconception frequency ranking.

F3. Add to Phase 3D the two qualitative questions that outrank all analytics:

To the child: "If I don't remind you tomorrow, will you open it yourself?"
To the parent: "After reading the report, what will you do?"
Note: a parent answering "I don't know" means the diagnostic isn't actionable yet — which directly determines how many times Phase 3E must be redone.

F4. Replace the "YOUR IMMEDIATE NEXT 5 ACTIONS" block. Per Stage 1 evidence, several of the current 5 are already complete. New list: (1) doc consolidation (2) generator audit + quarantine (3) responses table (4) send the 40 recruitment WhatsApp messages — unchanged, it's uncompressible calendar time, send today (5) at the end of soft launch, ask 3 families for HKD 388. Plus a DO NOT DO list: Studio Hub, Coming Soon cards, pitch deck, IAP, RevenueCat, Stardust, Curlboo Shop.

F5. Append to CLAUDE.md (do not rewrite it — the existing Appendix D content is good):

Single source of truth: docs/MASTER_PLAN.md (strategy) + docs/STATUS.md (status). docs/_archive/** must never be referenced. If docs conflict: stop and ask, never pick one.
Completing any task requires updating STATUS.md in the same commit
content/*.csv is source of truth. Agents may not add or alter any math question, answer, trap or misconception text — only parsers/validators/renderers/migrations
AI must never output an answer; only answer_expr, evaluated by Layer 1
All schema changes go through supabase/migrations/*.sql. Never instruct the user to edit the Supabase dashboard (agents cannot see dashboard state)
Every new table: enable row level security + a policy scoped to auth.uid() in the same migration. using (true) is forbidden
SERVICE_ROLE_KEY must never carry a VITE_ prefix
Never drop/truncate question_bank
Every answered question must write a responses row
Frozen: android/, ios/ until 20 paying users. Do not propose IAP or RevenueCat
Settled: web + Stripe only; annual HKD 388 primary; no grade labels inside a Quest; one topic chain until Gate 3E passes
5. PRESERVE — do not "improve" these
Carry over intact (wording included): Part B Topic Quest philosophy and all of D2a–D2g; the 5 progression skills (Timing/Pattern/Intuition/Confidence/Sequence); all Curlboo emotional states and every Cantonese line; the Dark Souls gamification rules and the explicit rejection list; the exactly-4-paywall-gates discipline; pricing tiers; all market data in Parts C and Appendix C with sources; the risk matrix; the TAM calculation; Appendix A principles 1–11 (amend #4's parenthetical only if needed); the "Would a tutor do this?" filter; the founding philosophy quote in A2; AI-as-Factory.

6. QUESTIONS — ask, never guess
Put these in Stage 1's output and in STATUS.md under ⚠️ NEEDS FOUNDER DECISION:

Real generator count — 217, 600+, or the number you found?
Sentry: actually live? (v4 says done, v5.1 says it's blocking launch)
PDF export: complete, or in progress per README?
question_bank: how many rows are actually in Supabase right now?
RLS: were policies created via migration files or the dashboard?
How many of the 10 families are recruited so far?
Final brand name, and final appId?
Studio Hub + 3 Coming Soon cards: keep, or defer per E4?
Two IG accounts (132 + 200): consolidate or keep both?
First Topic Quest chain: fractions as assumed, or another?
7. ACCEPTANCE CRITERIA
Zero status markers or checkboxes in MASTER_PLAN.md
Every item in STATUS.md is ✅+evidence, ⚠️+NEEDS FOUNDER, or ☐
No claim appears in two files with different values
Every §4 edit is applied and listed in the v6.0 changelog
Both legacy files are in _archive/ with the banner
All 10 questions in §6 appear in STATUS.md
grep -c "✅" docs/MASTER_PLAN.md returns 0
MASTER_PLAN.md is not materially shorter than v5.1 minus status content
git status shows changes under docs/ and CLAUDE.md only