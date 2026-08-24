# DECISIONS.md — Settled Decisions
Decisions recorded here are SETTLED. Do not reopen without a new founder instruction.
**Format:** Date | Decision | Reason | Status

---

## grade-label
**Date:** 2026-08-24
**Decision:** Inside Topic Quest, child sees `quest_station_name_zh` only (no grade label). Parent report shows `topic_name_zh` which includes the grade.
**Reason:** v5.1 D2d mockup showed "起點：平均分（P1）" in the child view, violating the plan's core premise that the child must not feel sent backwards. One dataset, two renderings: same `topic_map` row powers both views. Child-facing name is purely descriptive ("分數的相同分母加法"); parent-facing includes grade context ("P3 分數加減").
**Status:** SETTLED — do not reopen.

---

## topic-quest-first-chain
**Date:** 2026-08-24
**Decision:** First Topic Quest chain is Fractions P1→P4 (~5 rows in topic_map.csv).
**Reason:** Fractions is the most common foundation gap in P4-P6. A P4 student who can't do fraction addition almost certainly has gaps at P1-P3 fraction foundations. The chain is well-understood, maps to existing generators, and will produce the clearest "aha" moment for parents.
**Status:** SETTLED — do not reopen.

---

## stripe-only-pre-20-users
**Date:** 2026-08-24
**Decision:** Stripe web only until 20 paying users. RevenueCat and native IAP deferred until Gate 4C → 4A.
**Reason:** Apple/Google take 15% (Small Business Program), not 30% — the real argument is integration complexity for a solo founder: 3 integrations + webhooks + receipt validation + entitlement sync. Build what closes sales before building what distributes. 20 paying users proves the product has value before investing in distribution infrastructure.
**Status:** SETTLED — do not reopen.

---

## studio-hub-coming-soon
**Date:** 2026-08-24
**Decision:** Keep 3 "Coming Soon" cards on oneup24.com. No engineering time on frozen products.
**Reason:** Coming Soon cards collect email leads at near-zero cost. The constraint is: zero engineering time on frozen products until Gate 4C → 4A passes. Marketing copy is acceptable; product code is not.
**Status:** SETTLED — do not reopen.

---

## ig-consolidation
**Date:** 2026-08-24 (provisional — awaiting founder confirmation)
**Decision:** Consolidate IG presence to @oneup24game (200 followers) as primary brand account. Link from @curlboo.bear bio.
**Reason:** @oneup24game is the product/brand name; @curlboo.bear is the mascot. Long-term, brand accounts outlast mascot accounts. @oneup24game has higher follower count (200 vs 132). Curlboo content continues on @curlboo.bear but with a bio link to the product.
**Status:** PROVISIONAL — confirm with founder (STATUS.md Q9).

---

## generator-quarantine-before-refactor
**Date:** 2026-08-24
**Decision:** Before soft launch, use quarantine (audit + exclude violators) not the 3-layer schema refactor to fix generator bugs.
**Reason:** The 3-layer schema (given/unknown/display) is the correct long-term fix but takes weeks. Quarantine takes days: run 6 invariant checks × 500 iterations per generator, set status='quarantined' on violators, exclude from buildExam. 150 clean generators beats 329 buggy ones. Trust cannot be rebuilt after a parent sees a wrong answer.
**Status:** SETTLED — do not reopen.

---

## responses-table-gate-0
**Date:** 2026-08-24
**Decision:** `responses` table is a Gate 0 deliverable (before Phase 3D), not Phase 4B.
**Reason:** 8 features in the plan are blocked until responses exists. None of these features can be built or validated during soft launch (Phase 3D) without this data. Data is not backfillable from exam_sessions. Phase 3D sessions without responses rows = wasted diagnostic opportunity.
**Status:** SETTLED — do not reopen.

---

## template-for-future-decisions
**Date:** YYYY-MM-DD
**Decision:** [One sentence]
**Reason:** [Why this was chosen over alternatives]
**Status:** SETTLED — do not reopen. / PROVISIONAL — awaiting [name].
