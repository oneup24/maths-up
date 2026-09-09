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
