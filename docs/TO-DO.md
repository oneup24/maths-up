# TO-DO

**Plan model** — discuss with founder, then add tasks as `[ ] task`  
**Coding model** — implement, then mark `[x] task` when done. Update `docs/STATUS.md` in the same commit.

---

## ✅ Phase 1B — Engine Topic Coverage (COMPLETE 2026-09-09)

> All 16 missing HK EDB topics added. Engine now covers 79/79 official curriculum units (100%).
> 48 new generators across 3 grade files + config.js. `arch:check` and `content:check` pass.

- [x] **Decide: extend Phase 1 / add Phase 1B / create new phase for engine topic coverage completion** — Phase 1B decided and shipped.
- [x] **P2 度量 generators** (2M1 長度/2M2 時間/2M3 貨幣) — 9 generators in `grade2.js`
- [x] **P3 度量 generators** (3M1 長度/3M2 時間/3M3 容量/3M4 時間/3M5 重量) — 15 generators in `grade3.js`
- [x] **P3 圖形與空間 generators** (3S1 四邊形/3S2 三角形) — 6 generators in `grade3.js`
- [x] **P2 圖形與空間 generators** (2S1 立體/2S2 角/2S3 方向/2S4 四邊形) — 12 generators in `grade2.js`
- [x] **P5 代數 generators** (5A1 代數初步/5A2 簡易方程) — 6 generators in `grade5.js`
- [x] **Update `docs/MASTER_PLAN.md`** — recommend adding Phase 1B section in next master plan refresh (separate task; plan updates intentionally minimal here)

### Phase 1B Hard Rules Compliance

- [x] No existing 329 generator functions modified
- [x] No modifications to `core.js`, `index.js`, or any public signature in `config.js`
- [x] No renames of any existing ID
- [x] No new npm dependencies
- [x] Used `ri()`, `pk()`, `nm()`, `pl()`, `fd()`, `_it()`, `CTX`, `FIG`, `shuffle()` from existing imports
- [x] Every generator has `s: [...]` step explanation
- [x] Every word problem with irrelevant data has `trap:` field
- [x] Used HK terminology: 厘米, 公斤, 升, 毫升
- [x] D6 invariants enforced: answer ≠ any given value; division yields integer; answer > 0

---

## UI/UX

- [x] **ScoreReport design tokens** — apply `parent-report.DESIGN.md` token discipline to the results/score screen. Remove all `backdrop-blur`, match the white canvas + hairline border style already applied to Home + Exam. Update `docs/STATUS.md` in the same commit.

---

## 📋 Today's Tasks (2026-09-10)

> Five tasks agreed with founder for the 2026-09-10 session. Update `docs/STATUS.md` and re-run `npm test` per item.

- [x] **A. Expand thin generator pools** — **DONE 2026-09-10**. +40 new generators across 24 thin topics (G2: 2M2/2M3/2S1-2S4 = +15; G3: 3M1-3M5/3S1/3S2/3D1 = +12; G4: 4N2/4D1 = +4; G5: 5N5/5D1/5A1/5A2 = +3; G6: 6M1/6M3/6S1/6D1/6D2/6D3 = +6). No topics ≤3 gens remain except 6D2/6D3 which sit at baseline. Verified by buildExam cap-test. 630 tests pass. Commits `eaa5280` (G2), `fe8db52` (G3), `d2fc2a8` (G4-G6).

- [x] **B. e2e tests (Playwright)** — **DONE 2026-09-10**. 3 smoke tests (boots without console errors, home renders, buildExam runs in browser context). Config uses system Chrome (macOS 12 limitation noted). Vitest excludes `e2e/**`; eslint handles node globals for `playwright.config.js` and `e2e/`. Scripts: `pnpm test:e2e`, `pnpm test:e2e:headed`. 630 unit + 3 e2e tests pass. Commit `95204f9`.

- [x] **C. UX fix: who-ran-further MC** — **DONE 2026-09-10**. `grade2.js` d:3 who-ran-further now uses a plausible wrong distance (`diff + ri(1,9)*10`) in the wrong-name option, so each option has a unique `(name, distance)` pair. 630 tests pass. Commit `e815c09`.

- [x] **D. Update MASTER_PLAN.md for Phase 1B + today's expansion** — **DONE 2026-09-10**. Bumped to v6.2. Added D12 section (~150 lines: problem, decision, what was built, hard rules, validation, lessons, cross-references). Added v6.2 changelog (~70 lines: new phase, engine code, tests, cleanup, docs, hygiene, forward-looking). Updated TOC, USP #3 (D1), Layer 1 (I1), engine line (Stack table), version history. Commit pending.

- [x] **E. Lint/cleanup** — **DONE 2026-09-10**. Removed unused `_e1/_e2/_e3` catch params in `exam.js`. Fixed `endH=endH` self-assign in `grade2.js` cinema generator (now `endH=endH-12` — afternoon times after noon wrap correctly, matching the activity end-time generator). 630 tests pass. Lint clean. Commit `abc271d`.

### Recommended execution order (revised)
1. **C next** (5 min — quick UX win)
2. **E** (10 min — clears lint noise before D)
3. **D** (45 min — captures all day's work in master plan)

### Progress log (2026-09-10)
- ✅ A → done (40 gens, 630 tests pass)
- ✅ B → done (3 e2e smoke tests, 633 total tests pass)
- ✅ C → done (who-ran-further unique options)
- ✅ E → done (lint clean, cinema wrap fix)
- ✅ D → done (MASTER_PLAN v6.2 + D12 + changelog)

### All 5 today's tasks complete (A/B/C/D/E)

---

## 📋 Day 2 Tasks (2026-09-15)

> Continuation of engine/UX cleanup + start Phase 3E content prep. All self-contained; no founder decision required.

- [ ] **F. Expand e2e tests** — extend the 3 smoke tests to cover actual user flows: grade/topic selection → exam start → answer MC and fill → submit → score report renders. Add `data-testid` attributes on key buttons (start exam, submit, mc option, fill input) for stable selectors. Target: 6–10 e2e tests covering happy path. ~2–3 hr.

- [ ] **G. Stray file cleanup** — remove `app.json` (root, stale capacitor config) and `src/questions.js.save` (orphan file). Both flagged as ☐ in STATUS.md Phase 3A. Verify no imports reference them before deleting. ~10 min.

- [ ] **H. Stale value cleanup in STATUS.md** — generator count says 329 in audit table (line 176), should be **417**; PostHog event count says 12, actual is 18; several other audit rows need refresh. ~20 min.

- [ ] **I. Author `content/topic_map.csv` (Fractions P1→P4)** — unblocks Phase 3E Topic Quest v1. Schema in MASTER_PLAN.md §I5h. Need columns: topic_id, parent_topic_id, strand, quest_station_name_zh, quest_station_order, etc. ~1–2 hr.

- [ ] **J. 3-page PDF (student + answers + parent report)** — Phase 3E deliverable. Current PDF is single-format. Need: page 1 student paper, page 2 answer key, page 3 parent report. ~3–4 hr.

- [ ] **K. Audit other "same answer twice" MC templates** — scan `grade*.js` for MC patterns where both A and B share the correct answer (similar to today's task C). Quick scan + fix any found. ~1 hr.

- [ ] **L. Lighthouse + performance audit** — fill Phase 3A gap. Run lighthouse against dev build, capture baseline metrics (FCP, LCP, TTI, accessibility score). Document in STATUS.md. ~1 hr.

### Recommended execution order
1. **G first** (10 min — quick visible cleanup, frees root/src from orphans)
2. **H next** (20 min — doc accuracy, low risk)
3. **K** (1 hr — finish UX consistency started yesterday)
4. **F** (2–3 hr — biggest impact; needs `data-testid` attributes in components)
5. **I** (1–2 hr — start Phase 3E prep; can be split)
6. **J** (3–4 hr — bigger lift, can defer to Day 3)
7. **L** (1 hr — final check; do after F so app is more stable)

### Progress log (2026-09-15)
- ⏳ G → start first (quick orphan cleanup)
