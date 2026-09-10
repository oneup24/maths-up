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

- [ ] **A. Expand thin generator pools** — follow-on to 2M1 expansion. Target topics with ≤3 generators: `2S1/2S2/2S3/2S4`, `2M2`, `2M3`, `3M1/3M2/3M3/3M4/3M5`, `3S1`, `3S2`, `4N2`, `4D1`, `5N5`, `5A1`, `5A2`, `5D1`, `6M1`, `6M3`, `6S1`, `6D1/6D2/6D3`. Add 2–4 new templates per topic, focused on d:1/d:2 since those are the most-used difficulties. ~1–2 hr/topic. Verify variety with the new `buildExam` cap-test.

- [ ] **B. e2e tests (Playwright)** — fill Phase 3A gap. Setup `@playwright/test`, write smoke tests: home loads, login flow, exam start → answer → submit, score report renders, print/PDF flow. ~half-day. Target: `npm run test:e2e` runs in CI.

- [ ] **C. UX fix: who-ran-further MC** — `grade2.js:114` currently emits the same `diff` in both A and B options (correct name vs wrong name + same distance). Change B to a plausible wrong distance (e.g., `diff + ri(1,9)*10`) so each option has a unique `(name, distance)` pair. ~5 min.

- [ ] **D. Update MASTER_PLAN.md for Phase 1B** — add a new section to the phases roadmap reflecting the 48 new generators + Phase 1B doctrine. Mirror STATUS.md §"Phase 1B" entries. ~30 min.

- [ ] **E. Lint/cleanup** — fix pre-existing `_e1/_e2/_e3` unused-vars in `exam.js` (rename to `__e` or remove), fix `endH=endH` self-assign in `grade2.js:138` (the cinema generator). ~10 min.

### Recommended execution order
1. **E first** (10 min — clears noise, makes later lint clean)
2. **C next** (5 min — quick UX win)
3. **A** (bulk of the day — pick 3–4 highest-priority topics first; can split across sessions)
4. **B** (after A is stable so the e2e tests reflect final UX)
5. **D** (last — captures all the day's work in the master plan)
