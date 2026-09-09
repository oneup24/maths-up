# TOPIC.md vs Engine Coverage Report

**Date:** 2026-09-08 (initial audit) → 2026-09-09 (Phase 1B complete)
**Purpose:** Identify gaps between official HK EDB Primary Mathematics Curriculum (KS1+KS2) and engine question generator coverage in `src/engine/grades/`.

---

## Status: ✅ ALL GAPS RESOLVED (Phase 1B — 2026-09-09)

**Phase 1B added 16 missing topics (48 new generators) across 3 grade files + config.js.**

---

## Final Coverage Statistics (after Phase 1B)

| 年級 | 官方課題 (不含 F1 進階) | 引擎覆蓋 | 覆蓋率 |
|------|----------------------|---------|--------|
| 小一 | 12 | 12 | 100% ✅ |
| 小二 | 15 | 15 | 100% ✅ |
| 小三 | 14 | 14 | 100% ✅ |
| 小四 | 12 | 12 | 100% ✅ (4N7+4N8 合併) |
| 小五 | 12 | 12 | 100% ✅ |
| 小六 | 14 | 14 | 100% ✅ (6N3+6N4 合併) |

**Total: 79/79 (100%)** — full HK EDB Primary Mathematics curriculum coverage.

---

## Phase 1B Summary

| File | Change | New Generators |
|------|--------|----------------|
| `src/engine/config.js` | Replaced merged `2M/2S/3M/3S/5A` with 16 individual sub-topic entries | — |
| `src/engine/grades/grade2.js` | Added pools `2M1`, `2M2`, `2M3`, `2S1`, `2S2`, `2S3`, `2S4` | 21 |
| `src/engine/grades/grade3.js` | Added pools `3M1`, `3M2`, `3M3`, `3M4`, `3M5`, `3S1`, `3S2` | 21 |
| `src/engine/grades/grade5.js` | Added pools `5A1`, `5A2` | 6 |
| **Total** | | **48 new generators** |

### Validation Results

- `pnpm arch:check` — ✅ all 5 rules pass
- `pnpm content:check` — ✅ all checks pass
- Smoke test: 16 topics × 10 calls = 480 invocations → 0 errors
- Extended test: 16 topics × 50 calls × 3 generators = 2400 invocations → 0 issues (no empty answers, no multiple-correct MC options)

### Invariants Enforced

| D6 Bug | Prevention |
|--------|-----------|
| Answer = given value | All answers verified ≠ any number in question text |
| Non-integer division | All division uses `x_val × divisor` pattern |
| Negative/zero answer | Subtraction uses constraints ensuring minuend > subtrahend |
| MC option collision | All MC options are unique strings; exactly 1 marked `c: true` |

---

## Original Gap Analysis (Pre-Phase 1B) — RESOLVED

The following 16 topics were missing on 2026-09-08 audit. All are now ✅ covered.

### ✅ 小二 (P2) — All 7 topics added

| 課題代碼 | 課題名稱 | 範疇 | 狀態 |
|---------|---------|------|------|
| 2M1 | 長度和距離(三) | 度量 | ✅ Added |
| 2M2 | 時間(二) | 度量 | ✅ Added |
| 2M3 | 貨幣(二) | 度量 | ✅ Added |
| 2S1 | 立體圖形(二) | 圖形與空間 | ✅ Added |
| 2S2 | 角 | 圖形與空間 | ✅ Added |
| 2S3 | 方向和位置(二) | 圖形與空間 | ✅ Added |
| 2S4 | 四邊形(一) | 圖形與空間 | ✅ Added |

### ✅ 小三 (P3) — All 7 topics added

| 課題代碼 | 課題名稱 | 範疇 | 狀態 |
|---------|---------|------|------|
| 3M1 | 長度和距離(四) | 度量 | ✅ Added |
| 3M2 | 時間(三) | 度量 | ✅ Added |
| 3M3 | 容量 | 度量 | ✅ Added |
| 3M4 | 時間(四) | 度量 | ✅ Added |
| 3M5 | 重量 | 度量 | ✅ Added |
| 3S1 | 四邊形(二) | 圖形與空間 | ✅ Added |
| 3S2 | 三角形 | 圖形與空間 | ✅ Added |

### ✅ 小五 (P5) — All 2 topics added

| 課題代碼 | 課題名稱 | 範疇 | 狀態 |
|---------|---------|------|------|
| 5A1 | 代數的初步認識 | 代數 | ✅ Added |
| 5A2 | 簡易方程(一) | 代數 | ✅ Added |

---

## Notes on Merged Topics (Retained for FK safety)

The original merged pools (`2M`, `2S`, `3M`, `3S`, `5A`) were **NOT removed** from the grade files. They remain as no-op legacy entries to:
- Preserve any historical `topic_breakdown` JSONB references
- Maintain backward compatibility with any code that may reference them
- Follow master plan §I0d "Never rename an ID that has ever been live"

The new `2M1/2M2/2M3` etc. entries are visible in the topic picker; the old merged IDs are still valid but never selected.

---

## Related Documents

- **TOPIC.md** — official curriculum reference (now updated with Phase 1B status)
- **TOPIC_ENGINE_GAP_PLAN.md** — detailed generator design plan
- **TO-DO.md** — task checklist (now all `[x]`)
- **docs/STATUS.md** — Phase 1B completion record
- **docs/MASTER_PLAN.md** — Phase 1B mentioned as new phase between Phase 1 and Phase 3A
