# TOPIC_ENGINE_GAP_PLAN.md
## Phase 1: Generator Design Plan — 16 Missing HK EDB Topics

**Status:** DRAFT — awaiting founder review before Phase 2 implementation  
**Date:** 2026-09-09  
**Author:** Claude Code (planning only, no code written yet)

---

## 0. Root Cause & Structural Decision

### Why the audit flags existing topics as "completely missing"

`grade2.js` and `grade3.js` currently use **merged pools**:
- `grade2['2M']` (6 generators) serves P2 measures as one topic  
- `grade2['2S']` (3 generators) serves P2 shapes as one topic  
- `grade3['3M']` (5 generators) serves P3 measures as one topic  
- `grade3['3S']` (5 generators) serves P3 shapes as one topic  

`config.js` registers these as single entries `{id:'2M',...}` / `{id:'3M',...}` etc.  
The audit compares against individual curriculum IDs (2M1, 2M2, 2M3 …), which **don't exist** as separately-navigable topics.

### Chosen approach: add individual pools + config entries

For each of the 16 missing curriculum sub-topics:
1. Add a **new generator pool** with its individual ID in the grade file (e.g., `grade2['2M1'] = [...]`)
2. Add a **new config.js TOPICS entry** for that ID (e.g., `{id:'2M1', nm:'2M1 長度和距離(三)', ...}`)
3. **Leave the existing merged pools untouched** (`2M`, `2S`, `3M`, `3S` stay — responses FK safety)

For P5 algebra: `config.js` already has `{id:'5A',...}` (merged, never worked). We add `5A1` and `5A2` individually; the merged `5A` entry is kept but maps to an empty array (no existing data to protect).

---

## 1. Config.js Changes Required

Add to `TOPICS[2]`:
```
{id:'2M1', nm:'2M1 長度和距離(三)', ic:'📏', cat:'度量'},
{id:'2M2', nm:'2M2 時間(二)',       ic:'🕐', cat:'度量'},
{id:'2M3', nm:'2M3 貨幣(二)',       ic:'💰', cat:'度量'},
{id:'2S1', nm:'2S1 立體圖形(二)',   ic:'🧊', cat:'圖形與空間'},
{id:'2S2', nm:'2S2 角',             ic:'📐', cat:'圖形與空間'},
{id:'2S3', nm:'2S3 方向和位置(二)', ic:'🧭', cat:'圖形與空間'},
{id:'2S4', nm:'2S4 四邊形(一)',     ic:'⬜', cat:'圖形與空間'},
```

Add to `TOPICS[3]`:
```
{id:'3M1', nm:'3M1 長度和距離(四)', ic:'📏', cat:'度量'},
{id:'3M2', nm:'3M2 時間(三)',       ic:'🕐', cat:'度量'},
{id:'3M3', nm:'3M3 容量',           ic:'🧃', cat:'度量'},
{id:'3M4', nm:'3M4 時間(四)',       ic:'📅', cat:'度量'},
{id:'3M5', nm:'3M5 重量',           ic:'⚖️', cat:'度量'},
{id:'3S1', nm:'3S1 四邊形(二)',     ic:'◇',  cat:'圖形與空間'},
{id:'3S2', nm:'3S2 三角形',         ic:'🔺', cat:'圖形與空間'},
```

Add to `TOPICS[5]` (after the existing `{id:'5A',...}`):
```
{id:'5A1', nm:'5A1 代數的初步認識', ic:'🔤', cat:'代數'},
{id:'5A2', nm:'5A2 簡易方程(一)',   ic:'⚖️', cat:'代數'},
```

---

## 2. Generator Design — 16 Topics

Each topic gets **3 generators** (d:1 basic · d:2 word problem with trap · d:3 challenge).  
Minimum 2 per topic — all topics will have exactly 3.

---

### 2M1 — 長度和距離(三) [P2 Length and Distance III]
**Key learning:** m ↔ cm (×100), compare lengths, measure with ruler, estimate  
**Grade file:** `grade2.js` — add `'2M1'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | `a m b cm + c m d cm = ___ cm` (convert to cm and add) | Ensure a,c ≥ 1; answer > 0 ✓ |
| G2 | 2 | work | Rope cut problem with weight trap. `p m cut q cm = ___ cm remaining`. Given weight of rope is irrelevant. | answer = p×100 − q; ensure > 0 ✓; given weight ≠ answer ✓ |
| G3 | 3 | mc  | `nm()` runs X m Y cm, sister runs A m B cm. Who ran further? How much further? (with age trap) | MC options: [X name, Y name, same]. Ensure distinct distances. |

**Tools:** `ri, pk, nm`, no FIG needed. Lengths in range: a∈[2,8]m, b∈[10,90]cm.

---

### 2M2 — 時間(二) [P2 Time II]
**Key learning:** Tell time at 5-minute intervals, a.m./p.m., duration, 1 hour = 60 min  
**Grade file:** `grade2.js` — add `'2M2'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | fill | Clock face description: 分針指着[3/6/9], 時針指着[h]. What time? | Time = h:mm; always valid 12h time |
| G2 | 2 | work | Activity starts at H:MM a.m./p.m., lasts D minutes. What time does it end? (with class period trap — irrelevant number of students) | Ensure end-time stays within same a.m./p.m. slot; D ∈ {15,20,25,30,45}; result never crosses noon/midnight |
| G3 | 3 | work | Cinema starts 2:40 p.m., lasts 95 minutes. What time does it end? (With ticket price trap) | 2:40 + 95 min = 4:15 p.m. Pattern: start always xx:40, dur ∈ {55,65,80,95}; confirm end time logic integer-safe |

**Tools:** `ri, pk, nm`. Minutes from fixed pool `pk([15,20,25,30,45])` at d:2; fixed start pattern at d:3.

---

### 2M3 — 貨幣(二) [P2 Money II]
**Key learning:** HK banknotes ($10/$20/$50/$100/$500), making change, multi-item totals  
**Grade file:** `grade2.js` — add `'2M3'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | Coins: `n1 × $10 + n2 × $5 + n3 × $2 + n4 × $1 = ?` | n1∈[1,3], n2∈[1,3], n3∈[1,4], n4∈[1,5]; answer > 0 ✓ |
| G2 | 2 | work | Buy 2 items (p1 + p2), pay $50 (or $100). Change = ? (With distance-to-shop trap — irrelevant) | Ensure p1 + p2 < paid; change > 0 ✓; avoid change = p1 or p2 (D6 bug 4) |
| G3 | 3 | work | nm() has $A. Stationery costs $B each. How many can they buy (去尾法)? How much left? | A ∈ [50,100]; B ∈ [7,15]; ensure A mod B > 0 so remainder is interesting |

**Tools:** `ri, pk, nm, pl`. Price ranges: cheap tier for stationery.

---

### 2S1 — 立體圖形(二) [P2 3D Shapes II]
**Key learning:** Properties of cube/cuboid/cylinder/cone/sphere/prism/pyramid — faces/edges/vertices  
**Grade file:** `grade2.js` — add `'2S1'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | fill | "正方體有____個面，____條邊，____個頂點。" | Fixed answer: 6,12,8 — no random needed; deterministic ✓ |
| G2 | 2 | mc  | "哪個立體圖形沒有頂點？" Options: [球體 ✓, 正方體, 三棱柱]. With toy-count trap in question stem. | MC options: unique strings ✓; correct = 球體 |
| G3 | 3 | work | "有一個立體圖形，它有5個頂點、8條邊、5個面。它是什麼形狀？" + follow-up "它有幾個三角形的面？" | Answer: 四棱錐,4 (pyramid). Fixed question — deterministic OK |

**Tools:** `ri (for trap numbers only), nm`. Text-only questions.

---

### 2S2 — 角 [P2 Angles]
**Key learning:** Right angle (直角), acute angle (銳角), obtuse angle (鈍角), count right angles in shapes  
**Grade file:** `grade2.js` — add `'2S2'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | mc  | "以下哪個角是直角？" (described by turns: 90°=直角, <90°=銳角, >90°=鈍角) | MC 3 options; correct is 直角 |
| G2 | 2 | fill | "長方形有____個直角；三角形最多有____個直角。" | Fixed answers: 4, 1. Deterministic ✓ |
| G3 | 3 | mc  | nm() draws a quadrilateral with one pair of parallel sides and no right angles. Which shape? Options: [平行四邊形 ✓, 長方形, 梯形]. With colour trap. | MC 3 options; correct = 平行四邊形 |

**Tools:** `pk, nm`. Text questions only.

---

### 2S3 — 方向和位置(二) [P2 Direction and Position II]
**Key learning:** 4 compass directions (N/S/E/W), 8 directions, describe relative position on a grid  
**Grade file:** `grade2.js` — add `'2S3'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | mc  | "太陽從____方升起，從____方落下。" | Answer: 東,西 — fixed ✓ |
| G2 | 2 | fill | Grid question: "學校在公園的____方；圖書館在學校的____方" (with irrelevant distance given). Fixed 3×3 grid described in text. | 2-part answer (e.g., 南,西); given distance is trap |
| G3 | 3 | work | Map: A is 4 km North of B; C is 3 km East of B. nm() walks from A to B then to C. What direction did they travel in the second leg? What is the straight-line direction from A to C? | Answer: 東, 東南. Fixed direction reasoning ✓ |

**Tools:** `ri (trap distances), nm`. Text-only questions.

---

### 2S4 — 四邊形(一) [P2 Quadrilaterals I]
**Key learning:** Square, rectangle, rhombus, parallelogram, trapezoid — properties and classification  
**Grade file:** `grade2.js` — add `'2S4'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | fill | "正方形有____條等長的邊和____個直角。" | Fixed: 4,4 ✓ |
| G2 | 2 | mc  | "以下哪個說法正確？" Options: [所有正方形都是長方形 ✓, 所有長方形都是正方形, 菱形一定有直角] (with student-count trap) | MC; correct = A |
| G3 | 3 | mc  | Dynamic: random quadrilateral described with N equal sides and M right angles (from fixed set of valid combos). Student must name the shape. | Combo pool: {4eq+4rt→正方形, 2pair+4rt→長方形, 4eq+0rt→菱形, 2pair+0rt→平行四邊形} |

**Tools:** `pk, ri (trap), nm`. Text questions.

---

### 3M1 — 長度和距離(四) [P3 Length and Distance IV]
**Key learning:** km ↔ m (×1000), mixed km+m expressions, distance word problems  
**Grade file:** `grade3.js` — add `'3M1'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | "a 公里 b 米 + c 公里 d 米 = ____ 米" (convert all to m then add) | a,c ∈ [1,5]; b,d ∈ [100,900] step 100; answer straightforward integer |
| G2 | 2 | work | nm() hikes A km from Village X to Village Y, then B km to Village Z. Total distance? How much further from start to Z than A to Y? (With bus fare trap) | Ensure total > A; difference > 0; bus fare ≠ any distance ✓ |
| G3 | 3 | fill | Unit chain: "P km Q m = ____ m = ____ cm" | P ∈ [2,5]; Q ∈ [200,800] step 100; second answer = first×100 |

**Tools:** `ri, pk, nm`. No FIG needed.

---

### 3M2 — 時間(三) [P3 Time III]
**Key learning:** 24-hour clock, convert 12h ↔ 24h, elapsed time across day  
**Grade file:** `grade3.js` — add `'3M2'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | fill | "下午 H 時 M 分 = 24小時制的 ____ 時 ____ 分" (convert p.m. to 24h) | H ∈ [1,11]; M ∈ pk([0,15,20,30,45]); 24h = H+12 |
| G2 | 2 | work | Train departs 09:20, arrives A hours B minutes later. What is arrival time in 24h? (With ticket price trap) | A∈[1,4]; B∈pk([0,10,15,20,30,40]); ensure no midnight crossing; ticket price ≠ hour/minute ✓ |
| G3 | 3 | work | Event starts at 14:45, ends at 16:30. How long does it last? (With participant count trap) | 16:30 − 14:45 = 1 hour 45 min; participant count trap; answer: 1小時45分 |

**Tools:** `ri, pk, nm`. Fixed minute-pool ensures no fractional minutes.

---

### 3M3 — 容量 [P3 Capacity]
**Key learning:** L ↔ mL (×1000), compare capacities, word problems with liquids  
**Grade file:** `grade3.js` — add `'3M3'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | "A 升 B 毫升 = ____ 毫升" | A∈[1,5]; B∈[100,900] step 100; answer = A×1000+B |
| G2 | 2 | work | Bottle holds P L Q mL. nm() drinks R mL. How much remains? (With bottle colour trap) | Ensure P×1000+Q > R; answer > 0 ✓; R ≠ total ✓ |
| G3 | 3 | short | Juice machine: produces S mL per minute, runs T minutes. Total mL? Express in L and mL. (With machine age trap) | S∈pk([100,200,250,500]); T∈[3,8]; ensure T×S has clean L/mL form; mL remainder < 1000 |

**Tools:** `ri, pk, nm`. All arithmetic integer-safe.

---

### 3M4 — 時間(四) [P3 Time IV]
**Key learning:** Calendar — days/weeks/months/year, leap year, days in each month, schedule arithmetic  
**Grade file:** `grade3.js` — add `'3M4'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | fill | "一年有____個月；一星期有____天；2月通常有____天。" | Fixed: 12, 7, 28 ✓ |
| G2 | 2 | work | School starts on the A-th (Monday) of a month. Project deadline is B weeks later. What date is the deadline? (With number of students trap) | Use A∈pk([1,2,3,5,6,7,8,9]); B∈[2,4]; avoid month-boundary for simplicity; answer = A + B×7 |
| G3 | 3 | mc  | "今年二月有28天，去年二月也是28天。今年是閏年嗎？" Options: [不是閏年 ✓, 是閏年, 無法確定] + follow-up "閏年二月有多少天？" | Answer: 不是閏年,29 |

**Tools:** `ri, pk, nm`. Date arithmetic stays within same month for G2.

---

### 3M5 — 重量 [P3 Weight]
**Key learning:** kg ↔ g (×1000), weighing scale reading, word problems with mass  
**Grade file:** `grade3.js` — add `'3M5'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | "A 公斤 B 克 + C 公斤 D 克 = ____ 克" | A,C∈[1,4]; B,D∈[100,900] step 100; answer = sum in g |
| G2 | 2 | work | Watermelon weighs P kg Q g. Apple weighs R g. Combined weight? (With price-per-kg trap) | P∈[2,5]; Q∈pk([200,500]); R∈[150,400]; price trap ≠ any weight answer ✓ |
| G3 | 3 | fill | "1.5 公斤 = ____ 克；2750 克 = ____ 公斤 ____ 克" | Fixed pairs, no random needed. 1.5kg=1500g; 2750g=2kg750g |

**Tools:** `ri, pk, nm, fd`.

---

### 3S1 — 四邊形(二) [P3 Quadrilaterals II]
**Key learning:** Full quadrilateral hierarchy, properties of all types, perimeter of specific quads  
**Grade file:** `grade3.js` — add `'3S1'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | mc  | "以下哪個圖形必定有兩組對邊平行？" Options: [平行四邊形 ✓, 梯形, 不規則四邊形] | MC options unique ✓ |
| G2 | 2 | calc | Perimeter of parallelogram with sides a and b: P = 2×(a+b). (With area trap — irrelevant). | a∈[5,12]; b∈[3,9]; a≠b (so not a rhombus trap); answer = 2(a+b) > 0 ✓ |
| G3 | 3 | work | Rhombus with side S. nm() wants to frame N of them end-to-end. What total perimeter of wire is needed? Trap: "each rhombus has 4 right angles" (false — this is a trap to check if student corrects the false statement). | Answer: 4×S×N. Include correction that rhombus does not have to have right angles. |

**Tools:** `ri, pk, nm, FIG.para` (optional for d:2 if figure wanted).

---

### 3S2 — 三角形 [P3 Triangles]
**Key learning:** Types by side (equilateral/isosceles/scalene), by angle (right/acute/obtuse), angle sum = 180°  
**Grade file:** `grade3.js` — add `'3S2'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | fill | "三角形三個內角之和是____度。" + "如果兩個角是 A° 和 B°，第三個角是____度。" | A∈[30,60]; B∈[40,70]; A+B < 180; answer = 180−A−B > 0 ✓ |
| G2 | 2 | mc  | "一個三角形有一個角是 90°，另一個是 A°。這是哪種三角形？" Options: [直角三角形 ✓, 鈍角三角形, 銳角三角形] (With number of students trap) | A∈[30,60]; third angle = 90−A > 0 ✓ |
| G3 | 3 | work | nm() has sticks: S1, S2, S3 cm long. Can they form a triangle? Show work using triangle inequality. Generate so that 2 cases show "can" and "cannot". | s3 = s1+s2+ri(1,3) makes "cannot" case; check s1+s2 vs s3; answer: 不能 |

**Tools:** `ri, pk, nm, FIG.tri` (optional for d:1/2 illustration).

---

### 5A1 — 代數的初步認識 [P5 Introduction to Algebra]
**Key learning:** Use letter for unknown, evaluate expressions (substitution), describe patterns  
**Grade file:** `grade5.js` — add `'5A1'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | "若 x = K，求 ax + b 的值。" | a∈[2,5]; K∈[3,8]; b∈[2,15]; answer = a×K+b > 0 ✓; answer ≠ K ✓; answer ≠ a ✓ |
| G2 | 2 | fill | "nm() 每天溫習 y 小時。5 天共溫習 ____ 小時。(以 y 代替)" + "若 y = 2，共溫習 ____ 小時。" | Answer: 5y, 10. Variable y stays abstract in first part. |
| G3 | 3 | work | "一個長方形，長是闊的 3 倍。設闊為 n cm。用 n 表示長和周界的算式，再求 n=4 時的周界。" | Length = 3n; Perimeter = 2(3n+n) = 8n; n=4 → 32 cm. Multi-step, conceptual. |

**Tools:** `ri, pk, nm`. Variable names: `x`, `y`, `n` (never `a` or `b` — avoid confusion with operators).

---

### 5A2 — 簡易方程(一) [P5 Simple Equations I]
**Key learning:** One-step equations (x+a=b, ax=b), balance method, set up equation from word problem  
**Grade file:** `grade5.js` — add `'5A2'` pool

| # | d | tp | Concept | D6 notes |
|---|---|----|---------|----------|
| G1 | 1 | calc | "解方程：x + A = B" (A∈[15,40]; B = x_val + A where x_val∈[10,30]) | Answer = B−A > 0 ✓; B ≠ A ✓; answer ≠ A ✓ |
| G2 | 2 | calc | "解方程：Cx = D" (C∈[3,8]; D = C × x_val where x_val∈[5,15]) | D is multiple of C → integer answer ✓ (D6 bug 2); answer ≠ C ✓ |
| G3 | 3 | work | Word problem: "nm() 有一些貼紙，給弟弟 A 張後，剩下 R 張。原有多少張？設原有 x 張，寫方程解題。" (With age trap) | x − A = R → x = R + A; R∈[20,50]; A∈[8,18]; answer = R+A > 0 ✓; age trap ≠ answer ✓ |

**Tools:** `ri, pk, nm`. Generator MUST use `ri()*multiplier` to guarantee integer solutions (D6 bug 2 compliance).

---

## 3. D6 Invariant Compliance Strategy

All new generators designed with these rules built-in:

| Bug | Prevention in new generators |
|-----|------------------------------|
| 1 (diagram leaks answer) | No SVG with unknown labels. Any figure is illustrative only. |
| 2 (non-integer division) | All division uses `x_val × divisor` pattern — divisor divides cleanly |
| 3 (question/diagram contradiction) | No figures in most generators; where used (3S2 FIG.tri), labels are given values only |
| 4 (answer = given value) | Check: after computing answer, verify it ≠ all numeric params in the question |
| 5 (shape aspect ratio > 5:1) | For FIG.rect: width∈[4,10], height∈[3,8]; ratio always ≤ 3:1 |
| 6 (answer ≤ 0) | All subtraction uses `ri(a,b)` where subtrahend < minuend by construction |
| 8 (MC options leak) | All MC distractors are plausible wrong answers (common errors), never the answer itself |

---

## 4. Implementation Estimate

| Topic group | New generators | Grade file modified |
|-------------|---------------|-------------------|
| P2 度量 (2M1–2M3) | 9 | grade2.js |
| P2 圖形與空間 (2S1–2S4) | 12 | grade2.js |
| P3 度量 (3M1–3M5) | 15 | grade3.js |
| P3 圖形與空間 (3S1–3S2) | 6 | grade3.js |
| P5 代數 (5A1–5A2) | 6 | grade5.js |
| **Total** | **48** | 3 files + config.js |

---

## 5. Files to be Modified in Phase 2

| File | Change |
|------|--------|
| `src/engine/config.js` | Add 16 new entries to TOPICS (see §1 above) |
| `src/engine/grades/grade2.js` | Add 7 new pools: `'2M1'`, `'2M2'`, `'2M3'`, `'2S1'`, `'2S2'`, `'2S3'`, `'2S4'` |
| `src/engine/grades/grade3.js` | Add 7 new pools: `'3M1'`, `'3M2'`, `'3M3'`, `'3M4'`, `'3M5'`, `'3S1'`, `'3S2'` |
| `src/engine/grades/grade5.js` | Add 2 new pools: `'5A1'`, `'5A2'` |
| `TOPIC.md` | Mark all 16 topics as ✅ |
| `docs/audits/TOPIC_ENGINE_COVERAGE_AUDIT.md` | Clear missing list |
| `TO-DO.md` | Mark tasks [x] |
| `docs/STATUS.md` | Add Phase 1B completion record |

**Not modified:** `core.js`, `config.js` public signature, `index.js`, `contexts.js`, `exam.js`, `history.js`, `gradeRules.js`. All 329 existing generators untouched.

---

## 6. Open Questions for Founder Review

1. **P2 方向 (2S3):** The existing grade1 `1S3` has "方向和位置一". Should 2S3 generators introduce 8-direction compass (N/NE/E/SE/S/SW/W/NW), or keep to 4 directions + relative position only? The KS1 PDF says "8-direction compass" is in scope for P2.

2. **3M4 Calendar:** Should leap-year questions be included at d:3 level? (366 days = leap year). This is in the KS1 curriculum but could be confusing for P3.

3. **5A notation:** Should equations use `x` exclusively, or also allow `y`, `n`, `m` for variety? (I've proposed using `x`, `y`, `n` — one per generator to show that any letter can be a variable.)

4. **Ordering of new config.js entries:** Should new P2/P3 entries be inserted in curriculum order (all 度量 first, then 圖形與空間) or at the end of the grade array? Inserting mid-array is safer for display ordering.

5. **Keeping merged pools visible:** After adding individual entries, should the old merged `{id:'2M',...}` and `{id:'3M',...}` entries be hidden from the topic picker (but kept in code), or remain visible? Currently they'd show as redundant.

---

## 7. What I Will NOT Do in Phase 2

- Modify any of the existing 329 generator functions
- Modify `core.js`, `config.js` public exports, `index.js`
- Add new npm packages
- Rename any existing IDs
- Implement the 3-layer schema refactor (§D6 Phase 4B item)
- Touch `android/` or `ios/` directories

---

*Please review this plan and answer the Open Questions (§6) before I proceed to Phase 2.*
