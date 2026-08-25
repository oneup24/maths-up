---

# ONEUP24 MASTER PLAN v6.0
### Status: ACTIVE — The Comprehensive Bible — Company · Products · IP · Growth
### Last Updated: August 24, 2026

Execution status lives ONLY in docs/STATUS.md. This file describes WHAT and WHY, never WHETHER.

---

## HOW TO USE THIS DOCUMENT

```
┌────────────────────────────────────────────────────────────┐
│ THIS DOCUMENT SERVES 3 AUDIENCES:                          │
│                                                            │
│ 1. FOUNDER (you)     → Strategic bible, decision anchor    │
│ 2. CLAUDE CODE       → Technical context, implementation   │
│                         priorities, architecture reference  │
│ 3. INVESTORS/MENTORS → Business case, market, traction     │
│                                                            │
│ TWO SYSTEMS — DIFFERENT ROLES:                             │
│ • Diagnostic Milestones (D0–D3) — Epic labels (like tags). │
│   Every D-item is assigned to exactly one Phase.           │
│   No D-item may span phases; split it into two items.      │
│ • Delivery Phases (Phase 1–6) — The ONLY scheduling        │
│   authority. Phase order = build order.                    │
│                                                            │
│ Execution status lives ONLY in docs/STATUS.md.             │
│ This file describes WHAT and WHY, never WHETHER.           │
└────────────────────────────────────────────────────────────┘
```

---

## TABLE OF CONTENTS

```
PART A — COMPANY: OneUp24 Studio
PART B — IP UNIVERSE: Curlboo & Co.
PART C — MARKET & COMPETITION
PART D — PRODUCT: Maths Quests (Cash Cow)
PART E — PRODUCT: Off-Track (FoodSwipe)
PART F — PRODUCT: Future Portfolio
PART G — BUSINESS MODEL & UNIT ECONOMICS
PART H — GROWTH PLAYBOOK
PART I — TECHNICAL ARCHITECTURE
PART J — RISK MATRIX
PART K — FUNDRAISE STRATEGY
PART L — METRICS, MILESTONES & GATES
PART M — PHASE GATES
APPENDIX A — Strategic Principles
APPENDIX B — Decision Framework
APPENDIX C — Market Data Sources
APPENDIX D — Claude Code Notes
APPENDIX E — Document Control
APPENDIX F — Content Authoring Reference
```

---

# PART A — COMPANY: OneUp24 Studio

## A1. What is OneUp24

**OneUp24** (oneup24.com) is an **AI-powered education studio** that turns learning pain points into data-driven products, wrapped in emotional IP that kids love and parents trust.

```
❌ OneUp24 ≠ a math app
❌ OneUp24 ≠ a single product
OneUp24 = a Studio that builds a portfolio of 
   gamified education + family apps connected 
   through shared IP characters
```

The first product, **Maths Quests**, proves the model. Future products (English, STEM, family apps) share the same engine architecture, IP layer, and user base.

## A2. Mission, Values & Founding Philosophy

**Mission:** "補習老師嘅效果，App 嘅價錢" — Tutor-grade results at app-grade pricing.

**Core Value:** "Technology should feel warm." Logic-to-emotion bridges through IP characters, not cold dashboards.

**Decision Filter:** Every feature must pass: **"Would a tutor do this?"** Yes → build. No → don't.

**Founding Philosophy (from Topic Quest Insight):** 🆕

> 「能力唔係一個狀態（state），係一個旅程（journey）。
> 你唔可以將能力 copy-paste 俾人。
> 你只可以設計一條路，俾佢自己行一次。」

This means: Maths Quests is NOT a question-generating machine. It is a **system that designs learning journeys** and lets children walk them. Every architectural decision — from prerequisite chains to Topic Quests to Curlboo's emotional states — flows from this belief.

## A3. Founder Profile

- **Growth Marketer** — understands CAC, LTV, funnels, viral loops
- **Game Developer** — understands engagement loops, gamification, retention mechanics
- **Indie Hacker** — can code, design, AND market solo at speed (triple-threat)

## A4. Brand Architecture ⭐

```
🏢 OneUp24 Studio (oneup24.com)
│
├── 🐻🐰 IP Characters (Curlboo Bear + Fluffy Bunny)
│   └── Appear across ALL apps = brand unity + emotional bond
│
├── 📱 Maths Quests (live — see docs/STATUS.md for deployed URL)
├── 📱 English App 🔜 Coming Soon
├── 📱 STEM App 🔜 Coming Soon
├── 📱 Parent-Child App 🔜 Coming Soon
│
├── 🧊 FoodSwipe ❄️ FROZEN (doesn't fit education AI focus)
│
├── 📧 Newsletter → Email list (owned channel)
├── 💬 WhatsApp → Direct leads (owned channel, NOT YET STARTED)
├── 📸 Instagram:
│   ├── @curlboo.bear — 132 followers (IP/character account)
│   └── @oneup24game — 200 followers (product account)
└── 🌐 oneup24.com → Studio Hub (NOT just a product page)
```

**Website Strategy:**
- The oneup24.com website is a **Studio Hub** (Supercell × Toca Boca × Apple aesthetic)
- Showcase IP characters, highlight 1 LIVE app + 3 Coming Soon apps
- Coming Soon apps collect emails = pre-launch leads
- NOT a Maths Quests landing page — it's the umbrella brand

## A5. Current Traction Snapshot (April 17, 2026)

| Metric | Status |
|---|---|
| Product | Live at maths-exam.vercel.app |
| GitHub | 98 commits, oneup24/maths-up, public repo |
| Tech Stack | React + Vite + Tailwind CSS + Capacitor + Supabase |
| IG Followers (combined) | 332 |
| WhatsApp Groups | Not started |
| Beta Users | Not recruited yet |
| Paying Users | 0 |
| MRR | HKD 0 |
| User Feedback | None yet |
| Investor Contact | None yet |
| Phase | Phase 3 (Stabilize + Prepare) — in progress |

---

# PART B — IP UNIVERSE: Curlboo & Co.

## B1. Character Roster ⭐

| Character | Role | Status |
|---|---|---|
| 🐻 **Curlboo Bear** | Primary mascot. Emotional interface for all apps. | Live in Maths Quests (4 mood states) |
| 🐰 **Fluffy Bunny** | Secondary character. Companion/friend to Curlboo. | 📋 Designed, not yet in-app |

**Curlboo Bear Profile:**
- Visual: Warm felted texture (毛絨質感)
- Origin: Born from a lonely line of code, navigating the ocean of data to find connection
- Dedicated IG: @curlboo.bear (132 followers)

**Fluffy Bunny Profile:**
- Visual: Soft, playful companion (TBD final design)
- Role: Appears alongside Curlboo in future apps and IP content
- Status: Brand asset, no product integration yet

## B2. Curlboo UX Integration — Emotional State Engine

### B2a. General App States (Current)

```
USER ACTION                    → CURLBOO STATE
────────────────────────────────────────────────
First open app                 → 👋 mascot-wave
Complete quiz                  → 🎉 mascot-happy
Score < 50%                    → 🤗 mascot-encourage
Score 50-80%                   → 💪 mascot-keepgoing
Score > 80%                    → 🥳 mascot-celebrate
API error / loading            → 😅 mascot-oops
3-day streak                   → 🔥 mascot-proud
Inactive 3+ days               → 😢 mascot-miss-you
Share result                   → 📸 mascot-share
View 各單元表現 (all red)       → 🧸 mascot-hug
```

### B2b. Topic Quest Station States 🆕

```
STATION EVENT                     → CURLBOO REACTION
──────────────────────────────────────────────────────
Station 1 complete (earliest)     → 🐻 開心跳  「你記得平均分！好叻！」
Station 2 complete                → 🐻 驚訝    「你仲記得分數係咩！」
Station 3 complete                → 🐻 興奮    「就快到終點啦！」
Final station complete            → 🐻 戴皇冠  「你掌握咗分數！🏆」
Quest abandoned (leave mid-way)   → 🐻 鼓勵    「下次再嚟，Curlboo 等你！」
Quest restarted                   → 🐻 歡迎    「歡迎返嚟！繼續探險！」
```

**Implementation note:** Quest station reactions are SEQUENCED — they build in intensity. Early = warm/gentle. Late = excited/celebrating. This mirrors the emotional arc of the student's growing confidence through the Quest.

### B2c. Curlboo State Reflection System (Phase 4B) ⭐

- 5 states on Home Screen: 瞓覺 / 正常 / 興奮 / 慶祝 / 溫書
- Reflects student's actual learning activity (not random)
- Replaces the rejected Idle Game concept
- Zero extra data storage — computed from existing exam_sessions

## B3. Gamification Philosophy ⭐

```
┌────────────────────────────────────────────────────────────┐
│        DARK SOULS GAMIFICATION — NOT MARIO                  │
│                                                            │
│  ❌ Mario style: Do anything = get reward = dopamine hit    │
│  Dark Souls style: Overcome difficulty = earn reward        │
│     = genuine satisfaction                                  │
│                                                            │
│  PLACEMENT (% of gamification investment):                  │
│  ├── Onboarding (first 5 min)      15%  Light extrinsic   │
│  ├── Daily Loop (habit formation)  50%  Streak + progress  │
│  ├── Social Sharing (triggers)     20%  Viral loop         │
│  └── Payment Conversion            15%  "Unlock next level"│
│                                                            │
│  RULES:                                                    │
│  • Streak/points gradually fade out (training wheels off)  │
│  • NEVER put gamification in core learning experience      │
│  • NEVER deduct points for wrong answers                   │
│  • NEVER force social comparison                           │
│  • NEVER put badges everywhere                             │
└────────────────────────────────────────────────────────────┘
```

**Three Gamification Features (Phase 4B):**

| Priority | Feature | Description |
|---|---|---|
| P0 (must ship) | 🗡 Daily Challenge 每日挑戰 | 3-5 error-based questions + spaced repetition. Once per day, no redo. Streak counter. |
| P1 (light v1) | ⭐ Stardust 星塵 + Curlboo Shop | Correct answer = 1 stardust. Daily challenge = 3x. 10-15 cosmetic items to unlock. NO real-money purchase of stardust. |
| P1 (light v1) | 🐻 Curlboo State Reflection | 5 states on Home Screen reflecting student activity. Replaces Idle Game. |

**❌ Explicitly Rejected:** Idle Game, buying stardust with money, sound effects/music overload, excessive gamification.

**Build Order:** Daily Challenge → Stardust + Shop → Curlboo State (each depends on prior's data).

## B4. IP Monetization Path

```
Phase 1-3:  Curlboo = free brand asset inside products
Phase 4+:   Curlboo + Fluffy = sticker packs (WhatsApp/Signal)
Phase 5+:   Characters = licensable to edu-publishers
Phase 6+:   Merchandise (if community reaches 50K+)
```

---

# PART C — MARKET & COMPETITION

## C1. Global EdTech

| Metric | Value | Source |
|---|---|---|
| Market size (2025) | USD 187–193 billion | Research Nester / MRFR |
| Projected (2035) | USD 725–815 billion | Research Nester / MRFR |
| CAGR | 14.5–15.5% | Multiple |
| K-12 segment (2024) | ~USD 50 billion (39–42% of total) | MRFR / Research Nester |
| AI-driven solutions share | ~30% | Citrusbug |
| Educators using gen-AI | ~62% | Citrusbug |

## C2. Asia Pacific

| Metric | Value |
|---|---|
| APAC EdTech CAGR (2026-2035) | 12.9% |
| APAC share of global revenue | ~34% |
| China education system | 270M students, 16M teachers, 500K+ schools |

## C3. Hong Kong

| Metric | Value | Source |
|---|---|---|
| HK EdTech market (2023) | USD 800M | Editorialge |
| Projected (2027) | USD 1.2B | Editorialge |
| Growth rate | 12% annual | Editorialge |
| Digital learners | 2M+ | Editorialge |
| Schools using online platforms | 95% (since 2020) | Editorialge |
| Primary schools (2025/26) | 591 | HK Education Bureau |
| Secondary schools (2025/26) | 513 | HK Education Bureau |
| Nightly homework (primary) | ~2 hours | Wikipedia |

**Government support:** Innovation and Technology Fund, EdUHK and Cyberport incubators, Smart Government Innovation Lab. HK and Guangdong signed education cooperation framework (Aug 2023). HKUST and EdUHK approved AI tools for coursework (2023).

## C4. CRITICAL RISK: Declining Student Population

| Metric | Value |
|---|---|
| P1 enrollment drop by 2029 | 49,600 → 31,500 (**−36%**) |
| Hardest-hit districts (Yau Tsim Mong, Tsuen Wan) | **−70%** |
| HK Island districts | **−40 to 60%** |
| Form One drop by 2029 | 68,300 → 54,300 (**−20%**) |

**Strategic Response:**
1. Cannot rely on HK user base growth alone
2. ARPU growth (more revenue per family) is critical
3. Regional expansion to intl schools + SEA is existential
4. B2B school licensing becomes MORE valuable (schools fight to retain students)
5. Silver lining: fewer children = parents invest MORE per child

## C5. TAM Calculation

```
HK LOCAL:        ~225K addressable parents × HKD 48/mo
  1% pen:        2,250 users → HKD 1.3M/yr
  3% pen:        6,750 users → HKD 3.9M/yr
INTL SCHOOLS:    ~45K students × HKD 78/mo, 2% pen = HKD 842K/yr
B2B SCHOOLS:     20 schools × HKD 15K/yr = HKD 300K/yr
─────────────────────────────────────────────
HK TOTAL:        ~HKD 5.0M/yr
GBA + SEA (5-10x multiplier): HKD 25-50M/yr long-term
```

**Key Insight (from 51Talk analysis):** You need just **2,100 paying subscribers (0.57% of 370K students)** to hit HKD 1M ARR.

## C6. Competitive Landscape

```
┌──────────────────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ Competitor       │ Trap Items│ HK Curr. │ Topic Dx │ Cognitive│ Topic    │
│                  │           │          │          │ Fprint.  │ Quest    │
├──────────────────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ Workbooks        │ No        │ ~ Some    │ No       │ No       │ No       │
│ Khan Academy     │ No        │ No        │ ~ Basic  │ No       │ No       │
│ Snapask          │ No        │ Yes       │ No       │ No       │ No       │
│ IXL/Kumon        │ No        │ No        │ ~ Basic  │ ~ Basic  │ No       │
│ Private Tutors   │ ~ Manual  │ Yes       │ ~ Manual │ No       │ No       │
│ 51Talk           │ No        │ No        │ No       │ No       │ No       │
├──────────────────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ MATHS QUESTS ★   │ Yes ONLY  │ Yes       │ Yes      │ Yes      │ Yes ⭐   │
└──────────────────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

## C7. Competitive Positioning ⭐

```
┌────────────────────────────────────────────────────────────┐
│  YOUR REAL COMPETITOR IS NOT OTHER APPS.                    │
│  YOUR REAL COMPETITOR IS THE HKD 300-500/HR PRIVATE TUTOR. │
│                                                            │
│  51Talk ≠ competitor (English tutoring, HKD 800-1600/mo)   │
│  OneUp24 = complementary (Math diagnostics, HKD 48/mo)     │
│  SAME BUYER: anxious HK parents wanting visibility         │
│                                                            │
│  Your HKD 48/mo diagnostic is a 200x better value          │
│  proposition than a HKD 400/hr tutor who never gives       │
│  you a written report.                                     │
│                                                            │
│  PITCH: "See what a tutor charges $500/hr to tell you      │
│          — for $48/month, automatically."                   │
└────────────────────────────────────────────────────────────┘
```

---

# PART D — PRODUCT: Maths Quests (Cash Cow)

## D1. Overview

**What:** AI-powered math diagnostic tool for HK primary students (P1–P6).

**Deployed at:** Vercel (see docs/STATUS.md for live URL — stale in plan)

**GitHub:** github.com/oneup24/maths-up (public, 98 commits)

**Product Name Etymology:** 🆕 The name "Maths **Quests**" was chosen early as a brand name. The Topic Quest feature, designed months later, revealed that the name had been prophetic all along — the product IS about quests (learning journeys), not just exams.

**5 USPs:**

| # | USP | Status |
|---|---|---|
| 1 | **Trap Item Training (干擾項訓練)** — irrelevant data in word problems that tests reading comprehension. No competitor does this. | Engine built; structured engine v1 in Phase 4B |
| 2 | **Per-Topic Diagnostic (📊 各單元表現)** — color-coded breakdown sorted worst-first. What tutors charge $300-500/hr for. | Live |
| 3 | **Infinite Non-Repeating Generation** — 329 procedural generators (P1-P6), every quiz unique | Live |
| 4 | **Physical-Digital Hybrid** — PDF export for printing + digital tracking | Live |
| 5 | **Cognitive Fingerprinting** — topic_breakdown JSONB builds student weakness maps over time | Collecting data |

## D2. Topic Quest (主題探險) — Flagship Feature ⭐🆕

### D2a. Origin Insight — The Gaming Analogy

```
┌──────────────────────────────────────────────────────────────┐
│  YOUR SON'S GAMING EXPERIENCE — THE INSIGHT                   │
│                                                              │
│  SCENARIO A: Son uses your save file (max stats, all gear)   │
│  → Side quest → ❌ FAILED                                    │
│  He had every "tool" but couldn't do it.                     │
│                                                              │
│  SCENARIO B: Son starts his own game from Level 1            │
│  → Same side quest → CLEARED EASILY                          │
│  He had fewer "tools" but succeeded.                         │
│                                                              │
│  WHAT DID SCENARIO B HAVE THAT A DIDN'T?                     │
│  Not stats. Not equipment. Not skill count.                  │
│                                                              │
│  He had 5 things built through PROGRESSION:                  │
│                                                              │
│  1. TIMING（時機感）    — when to act, when to wait          │
│  2. PATTERN（模式識別）  — see enemy move → predict next step │
│  3. INTUITION（直覺）    — knowing without thinking           │
│  4. CONFIDENCE（信心）   — "I've beaten harder. I got this."  │
│  5. SEQUENCE（順序記憶） — knowing A must come before B       │
│                                                              │
│  ALL 5 are built ONLY by walking from Level 1 to Level N.    │
│  Cannot skip. Cannot transfer. Cannot buy.                   │
│                                                              │
│  THIS IS THE PHILOSOPHICAL CORE OF TOPIC QUEST.              │
└──────────────────────────────────────────────────────────────┘
```

### D2b. Translation to Mathematics 🆕

```
┌──────────────────────────────────────────────────────────────┐
│  A P4 STUDENT STUCK ON FRACTION ADDITION:                     │
│                                                              │
│  ❌ TRADITIONAL (Dad's Save File):                            │
│  Teacher: "Fraction addition needs common denominators"       │
│  → Give formula → Give practice sheets                       │
│  → Student knows the RULE but can't DO it                    │
│  → Has all the "gear" but can't beat the quest               │
│                                                              │
│  TOPIC QUEST (Start From Level 1):                           │
│  P1: "8 apples split between 2 people" → equal sharing       │
│  P2: "1 pizza cut into 4, ate 1" → what is a fraction        │
│  P3: "2/4 and 1/2 are the same" → equivalent fractions       │
│  P3: "1/4 + 1/4 = 2/4" → same denominator addition          │
│  P4: "1/3 + 1/4 = ?" → different denominator addition       │
│                                                              │
│  By the P4 step, the student doesn't "learn" common          │
│  denominators. They NATURALLY KNOW they need them.            │
│  = Started fresh, cleared the quest with ease.               │
└──────────────────────────────────────────────────────────────┘
```

### D2c. Remediation vs Learning Curve Replay 🆕

```
┌───────────────────┬────────────────────┬──────────────────────┐
│                   │ REMEDIATION        │ LEARNING CURVE REPLAY│
│                   │ (Current D1/D2)    │ (Topic Quest)        │
├───────────────────┼────────────────────┼──────────────────────┤
│ Approach          │ Detect weak topic  │ Detect weak topic    │
│                   │ → retry same-level │ → trace prerequisites│
│                   │ questions          │ → replay from root   │
├───────────────────┼────────────────────┼──────────────────────┤
│ Game analogy      │ Use max-level save │ Start new game from  │
│                   │ to retry the boss  │ Level 1 to boss      │
├───────────────────┼────────────────────┼──────────────────────┤
│ What it builds    │ Procedural memory  │ Timing + Pattern +   │
│                   │ (mechanical)       │ Intuition +          │
│                   │                    │ Confidence + Sequence│
│                   │                    │ (intuitive mastery)  │
├───────────────────┼────────────────────┼──────────────────────┤
│ Student feeling   │ "I got it wrong    │ "I started easy and  │
│                   │  again, I'm dumb"  │  I'm progressing"    │
├───────────────────┼────────────────────┼──────────────────────┤
│ Best for          │ Students who just  │ Students whose       │
│                   │ need more practice │ FOUNDATION has gaps   │
├───────────────────┼────────────────────┼──────────────────────┤
│ Framing           │ ❌ "Go back to P2" │ "Start a new Quest"   │
│                   │  = shame           │  = excitement        │
└───────────────────┴────────────────────┴──────────────────────┘

KEY DISTINCTION:
❌ "Reverse learning" (P4→P3→P2→P1) = confusing, goes BACKWARD
"Learning Curve Replay" (P1→P2→P3→P4) = natural, goes FORWARD again

The child doesn't know they've "been sent back to P1."
They think they're on a NEW QUEST. Psychologically 100% different.

For kids:   "Go back to P2 work" = shame
            "Start a new Quest!" = excitement
For parents: "Your child needs remediation" = anxiety
            "Your child is on a mastery journey" = peace of mind
For product: Not a downgrade. A DESIGNED JOURNEY.
```

### D2d. Topic Quest UX Design 🆕

```
┌──────────────────────────────────────────────────┐
│                                                    │
│   🐻 Curlboo 發現咗一條秘密路徑！                  │
│                                                    │
│   「分數」探險之旅                                  │
│   ═══════════════                                  │
│                                                    │
│   🏁 起點：平均分（P1）                             │
│    │                                               │
│    ▼                                               │
│   ⭐ 第一站：分數係咩（P2）                         │
│    │                                               │
│    ▼                                               │
│   🔒 第二站：等值分數（P3）                         │
│    │                                               │
│    ▼                                               │
│   🔒 第三站：同分母加減（P3）                       │
│    │                                               │
│    ▼                                               │
│   🔒 終點站：異分母加減（P4）   ← 佢原本卡嘅地方    │
│    │                                               │
│    ▼                                               │
│   🏆 QUEST COMPLETE                                │
│                                                    │
│   每站 5 題。答對 4/5 先解鎖下一站。                 │
│   Curlboo 喺每一站等緊你！                          │
│                                                    │
└──────────────────────────────────────────────────┘
```

**Every design detail has a reason:** 🆕

| Design Choice | Reason |
|---|---|
| "探險" not "補底" | Child doesn't know they're "sent back to P1." They're on a quest. |
| 5 questions per station, 4/5 to pass | Early stations (P1-P2) are easy for P4 students → rapid success → **confidence builds** — like early game levels exist to build muscle memory, not challenge |
| Unlock mechanism (🔒→⭐) | Core engagement loop: Complete → Unlock → Preview next → Want to continue. This is why your son couldn't stop playing. |
| Curlboo at each station | Mascot's highest-value use is NOT decoration — it's **emotional companionship** through a learning journey |
| Escalating Curlboo reactions | Station 1: warm praise → Station 2: surprised delight → Station 3: building excitement → Final: celebration with crown. Mirrors student's own emotional arc. |

### D2e. Topic Quest Data Generation 🆕

```
ONE Topic Quest generates:
  4-5 stations × 5 questions = 20-25 questions
  Each question has topic_breakdown
  Each station has pass/fail + timestamp
  Full Quest has completion_rate + time_spent + chain traversal

Comparison:
  Regular exam       = ~10-20 questions, 1 topic_breakdown record
  Topic Quest        = 20-25 questions, 4-5 breakdown records + quest metadata
  
  → 2-3x MORE DATA per engagement session

This perfectly satisfies Appendix A, Principle #1:
"Every feature must produce data."
```

### D2f. Topic Quest Monetization 🆕

```
┌──────────────────────────────────────────────────────────────┐
│  PAYWALL MESSAGE (when gap detected + Quest available):       │
│                                                              │
│  🐻 Curlboo 發現你小朋友喺「分數」可能有基礎缺口             │
│                                                              │
│  我哋設計咗一條 5 站嘅探險之旅，                              │
│  幫佢由根基開始重新掌握呢個主題。                              │
│                                                              │
│  ┌────────────────────────┐                                  │
│  │  解鎖主題探險  HKD 48/月 │                                  │
│  └────────────────────────┘                                  │
│                                                              │
│  「好似打機咁，有時由頭開始                                    │
│    反而係最快嘅方法。」                                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘

Notice: This paywall sells a DESIGNED PATH, not "more questions."

This is the ultimate expression of Appendix A, Principle #3:
"Sell the INSIGHT, not the tool."

What a tutor does for HKD 300-500/hr:
  1. Discover student's weak points
  2. Trace back to root cause
  3. Rebuild from foundation up

Topic Quest AUTOMATES THIS ENTIRE PROCESS for HKD 48/mo.
```

### D2g. Where Topic Quest fits in the system 🆕

```
Topic Quest DEPENDS ON D1a (topic_map prerequisite chains).
Without prerequisite chain data, you can't generate Quest routes.

D1a (topic_map) WITHOUT Topic Quest:
  → Prerequisite chain only used to display "this topic affects P4-P6"
  → Informational, passive
  → Wasted potential

D1a (topic_map) WITH Topic Quest:
  → Prerequisite chain becomes a WALKABLE PATH
  → Action-oriented, active
  → Generates massive data
  → Drives engagement
  → Drives monetization

Same data structure. Completely different product value.
Topic Quest is the MOST NATURAL UI EXPRESSION of prerequisite chains.
```

## D3. Phases 3A – 3E: Stabilise, Prove & Monetise

### Phase 1: Core Engine

329 procedural generators (P1-P6), HK EDB curriculum-aligned topics (6-11 per grade), 5 question types, 3 difficulty levels, exam builder with configurable targets, answer checker (unit stripping, fraction parsing, multi-part, tolerance), trap items, SVG figures, timer, onboarding wizard, Curlboo 4 moods, confetti, sound effects, streak tracker, grade star badges, Chinese/English toggle, wrong answer review, kid-friendly UI, privacy policy (COPPA/PDPO), PWA support.

### Phase 2: Auth + Cloud

Supabase email auth, guest mode with banners + sign-up prompts, cloud save to exam_sessions table, cloud stats in Profile, recent exam history, print gate (auth required), Parent PIN lock.

### Phase 3A — Testing & Fixes

Complete code health: merge supabase-auth to main, pin port 5175, fix lint errors, per-topic breakdown on results, production Vercel deployment (v1.2-beta), PDF export, password reset flow, Capacitor build preparation, E2E testing across all grades and question types, Lighthouse audit.

### Phase 3B — Instrumentation

PostHog analytics (free tier) and Sentry error monitoring (free tier) fully operational. Dual-destination: track.js fires PostHog + Supabase simultaneously. Retention cohort (D1/D3/D7/D30) and funnel dashboards configured. Sentry tags: grade, question type, auth status.

Event inventory (18 code-verified events; full list in STATUS.md): onboarding_start, onboarding_language, onboarding_grade, onboarding_question_answered, onboarding_guest, onboarding_signup, onboarding_login, onboarding_complete, quiz_start, quiz_complete, results_view, retry_click, guest_signup_prompt_shown, guest_signup_prompt_clicked, grade_selected, pdf_export, parent_pin_set, signup_complete.

### Phase 3C — Data Layer Prep

Data schema documentation, question_bank table creation and seeding, dedup logic, contexts.js and gradeRules.js wiring, future_tables.md documentation (quest_progress, topic_map, knowledge_gaps, student_profiles, subscriptions with RLS, indexes, JSONB examples).

### Gate 0 (must clear before Phase 3D)

*Gate condition: generator audit reports 0 violations (or all violators quarantined) + `responses` table receiving rows + RLS audit clean (no `USING(true)` or `WITH CHECK(true)` policies) + brand/appId unified → only then may family #1 be onboarded.*

- Doc consolidation: MASTER_PLAN.md, STATUS.md, DECISIONS.md
- `scripts/audit-generators.js` — every generator × 500 runs, 6 invariant checks: (a) answer ≠ any given value, (b) division yields integer where grade requires it, (c) no diagram label equals an unknown value, (d) answer > 0, (e) MC options unique and format-consistent, (f) shape aspect ratio ≤ 5:1. Violators get `status: 'quarantined'` and are excluded from buildExam. Do not attempt the 3-layer schema refactor before soft launch. 150 clean generators beats 329 buggy ones.
- `responses` table migration + write path in api.js (see Part I3)
- PostHog `question_answered` event
- RLS audit: find and fix all `USING(true)` / `WITH CHECK(true)` policies; migrate to `supabase/migrations/*.sql`
- Brand name + appId unified: appId `com.oneup24.mathsup`, appName `Maths-Up`, across capacitor.config.json, package.json, public/manifest.json, index.html
- Topic Quest grade-label decision recorded in DECISIONS.md
- Soft-launch cohort: all 10 families sign in (no guest mode for Phase 3D cohort)

### Phase 3D — Soft Launch (10 Families)

Recruit 10 real HK parent-child pairs. Feedback WhatsApp group. 3 sessions per family over 2–3 weeks. After each session, ask the two qualitative questions that outrank all analytics:

- To the child: "If I don't remind you tomorrow, will you open it yourself?"
- To the parent: "After reading the report, what will you do?"

A parent answering "I don't know" means the diagnostic is not actionable yet — which directly determines whether Phase 3E must be redone.

*Gate condition: 10 families × 3 sessions completed + both qualitative questions asked every session.*

### Phase 3E — Prove Value Before Mobile

*Gate condition: 3 parents have paid HKD 388. If not → revise the report; do NOT build mobile.*

- `content/topic_map.csv` hand-authored for ONE prerequisite chain: Fractions P1→P4 (~5 rows). Do not build the full topic_map system.
- `content/misconceptions.csv` — ~25 rows with `parent_advice_zh`
- Misconception report = 各單元表現 + exactly one recommended action per topic
- PDF becomes a 3-page set: ① student paper ② answers + worked solutions ③ parent report
- Topic Quest v1 on the Fractions chain (hardcoded route — do not wait for full topic_map system)
- Manual pre-sale: 3 parents × HKD 388 via FPS/PayMe, manually inserted into `subscriptions`
- Expand context bank (`content/contexts.csv`)

## D4. Diagnostic Milestones (Epic Labels — Cross-cutting)

D0, D1, D2, D3 are epic labels, not phases. Each D-item is assigned to exactly one Phase. Phase 1–6 is the only scheduling authority.

```
D0 — Foundation (Phase 3A)
  D0a  Tag questions with topicId
  D0b  Save topic breakdown in api.js
  D0c  Fix level in profiles

D1 — Gap Detection (Phase 4B)
  D1a  topic_map prerequisite chains         ← QUEST ROUTE DATA SOURCE
  D1b  Detect gaps (>=3/5 wrong per topic)   ← QUEST TRIGGER CONDITION
  D1c  knowledge_gaps table                  ← RECORDS WHICH TOPICS NEED REPLAY
  D1d  Gap alert on results screen           ← ENTRY POINT: "Start a Topic Quest"

D2 — Recommendations (Phase 3E → Phase 4B)
  D2a  Per-topic retry button
       → BECOMES: "Single station practice" inside Quest
  D2b  Importance display
       → BECOMES: "This station affects P4-P6" on Quest map
  D2c  Basic parent report (free tier)
       → ADDS: Quest progress ("Your child is at Station 3")
  D2d  Topic Quest system (Phase 3E: hardcoded Fractions chain)
       → Quest route generation (from topic_map prerequisite chain)
       → Per-station mini-exam (5 questions, same topic)
       → Unlock logic (4/5 correct → unlock next)
       → Quest progress storage (quest_progress table)
       → Quest completion celebration (Curlboo special animation)

D3 — Premium Diagnostics (Phase 5–6)
  D3a  Knowledge Health Map (visual)
  D3b  Full parent report (paid)
  D3c  Spaced repetition
```

## D5. Delivery Phases (4–6)

**Phase 4 execution order: 4B-lite → 4C (Stripe web) → 4A (mobile)**

Rationale: 4A is distribution; distribution before product-market fit is wasted. 4B-lite contains Topic Quest = Paywall Gate 4 = the plan's own highest-intent conversion moment. 4C (Stripe web) must exist before mobile so that paying users exist to justify the App Store submission. Build what makes people pay before what makes people download.

### Phase 4A: Mobile App
- Capacitor iOS + Android builds
- Safe areas, notch, keyboard handling
- Splash screen + app icon
- Offline mode (Layer 1 engine + localStorage)
- App Store + Play Store submission
- Push notifications + streak reminder (5% gamification investment here)

### Phase 4B: Smart Features + AI Engine

**RULE: Every feature here must generate more exam_sessions data.**

**Smart Features:**
- Smart retry per topic (replace current retryWrong with per-topic drill)
- Smart practice auto-suggest ("Your weakest topic is 分數的加減. Practice now?")
- Trap Item Engine v1 (structured engine, track trap_fall_rate)
- **Topic Quest v1** ⭐🆕 (learning curve replay — see D2 above)
- **Daily Challenge** ⭐ (3-5 error questions, spaced repetition, once/day, streak)
- **Stardust + Curlboo Shop** ⭐ (cosmetic rewards, no real-money purchase)
- **Curlboo State Reflection** ⭐ (5 states on Home Screen)

**Gap Detection (D1 + D2 completion):**
- topic_map table, gap detection, knowledge_gaps table, gap alert, importance display
- **D2d: Full Topic Quest system** 🆕 (route generation, station exams, unlock logic, progress tracking, completion celebration)

**Question Bank Learning System:**
- Track times_served, times_correct, avg_time_spent per question
- Student-question history (no repeat serving)
- "Report wrong answer" button → flag question
- Auto quality_score, auto-retire low-quality questions
- Modified buildExam flow: Bank first → Layer 1 fill → AI only if both insufficient

**AI Generator MVP (DeepSeek):**
- **PREREQUISITE:** Benchmark V3.2 vs R1 on 20 P5-P6 multi-step problems
- Generate 應用題 (word problems) only — hardcode handles calc/fill
- **IRON RULE: NEVER serve unvalidated AI questions to students**

**AI-emits-templates architecture (replaces step-2 "math verify"):**

The previous plan described "Step 2: Math verification — solve independently using Layer 1 chkAns." This is not achievable. `chkAns` compares a student string against a stored answer; it cannot solve a natural-language word problem.

Correct architecture: **AI emits templates, never finished questions.** AI outputs:
```json
{
  "skill_id": "p4_fractions_add_unlike",
  "body_zh": "{{a}}個蘋果中有{{b}}個是紅色的，{{c}}個是綠色的，紅色的蘋果佔幾分之幾？",
  "slots": {"a": {"range": [8,20]}, "b": {"range": [2,6]}, "c": {"range": [1,3]}},
  "constraints": ["b + c <= a", "gcd(b,a) > 1"],
  "answer_expr": "b/a",
  "traps": [
    {"expr": "(b+c)/a", "misconception_code": "add_parts_then_divide"},
    {"expr": "b/(a-c)", "misconception_code": "subtract_before_denominator"}
  ]
}
```
Layer 1 fills parameters, computes the answer from `answer_expr`. The AI never asserts a numeric answer.

**Payoff:** Risk #7 shifts from "mitigated" to "structurally eliminated." Human review drops from 20 finished questions to 1 template. Validation becomes algebraic evaluation, not NLP. `question_bank` is unchanged; `item_templates` is a new layer beside it.

This extends the plan's own AI-as-Factory principle: the factory should build the machines (templates), not the products (finished questions).

### Phase 4C: Stripe Web Payments

*Unlocks after: full Topic Quest chain works + traps mapped to misconceptions (Gate 4B → 4C).*

- Stripe Checkout integration (web only — no RevenueCat, no IAP at this stage)
- Subscription plans: Pro HKD 48/mo or HKD 388/yr; Family HKD 78/mo or HKD 628/yr
- Push annual as primary (Stripe HK fee burden ≈ 4.0% on HKD 388/yr vs ≈ 8.3% on HKD 48/mo); monthly as decoy
- Webhook: subscription created/updated/cancelled → update Supabase `subscriptions` table
- Entitlement check gate (guard Topic Quest, PDF, diagnostic behind subscription)
- 7-day free Pro trial

### Phase 5: Monetization

**Subscription Infrastructure:**
- Stripe web only (Phase 4C already wired — see above). RevenueCat and IAP deferred until 20 paying users and Gate 4C → 4A passes.
- Rationale: Apple/Google take 15% (not 30%) under Small Business Program (< US$1M annual proceeds) and Google's first-US$1M tier. The real argument for deferring IAP is integration complexity: 3 separate integrations (Stripe + RC + webhooks) + receipt validation for a solo founder with zero paying users. Build what closes sales before building what distributes.
- 7-day free Pro trial
- Family plan with student_profiles

**Pricing (unchanged):**

| Tier | Price | Key Feature |
|---|---|---|
| Free | $0 | 3/day, basic topics, no diagnostic, no PDF, no Topic Quest |
| Pro | HKD 48/mo (388/yr) | Unlimited, all topics, traps, 📊各單元表現, PDF, **Topic Quest** |
| Family | HKD 78/mo (628/yr) | Pro × 3 children + cross-child comparison |

**4 Paywall Gates — EXACTLY 4, NO MORE:**

| # | Gate | Trigger | Message |
|---|---|---|---|
| 1 | Blurred 各單元表現 | Tap diagnostic | "Unlock detailed topic analysis 🔒" |
| 2 | Daily limit hit | 4th exam attempt | "Upgrade for unlimited practice 🔒" |
| 3 | PDF tap | Tap export | "Pro members can print exams 🔒" |
| 4 | Topic Quest locked 🆕 | Gap detected + Quest available | Curlboo Quest paywall message (see D2f) |

**Note:** Gate 4 is the most powerful because it sells a DESIGNED PATH at the exact moment the parent realizes their child has a foundation gap. This is the highest-intent paywall moment possible.

**Moved Forward from Phase 6:**
- Weekly parent progress email → NOW Phase 5
- Viral WhatsApp share image → NOW Phase 5

### Phase 6: Growth + Advanced AI

**Viral & Retention:**
- Share Report button (Curlboo + breakdown + QR code image)
- Referral system (invite code → 1 week free Pro)
- Push notifications (streak/challenge)
- Leaderboard (opt-in, PDPO compliant)
- Weekly challenge + teacher mode (B2B)

**Advanced AI (only if Phase 4B benchmark justifies):**
- R1 for complex multi-step P5-P6
- Exam mimicking (photo → similar original questions)
- Spaced repetition (D3c)
- Target: 30-50K+ verified questions in Bank, <$5/mo AI cost

## D6. Known Generator Bugs — Fix Plan ⭐

**Root Cause:** Question schema lacks `given` vs `unknown` separation.

| # | Bug | Fix |
|---|---|---|
| 1 | Diagram leaks answer (labels show unknown) | 3-layer schema: given/unknown/display |
| 2 | Non-integer division (177 ÷ 16 = 11.06) | gradeRules validation gate |
| 3 | Question/diagram contradiction | Single source of truth per question |
| 4 | Answer = given value | Validation: answer ≠ any given value |
| 5 | Unrealistic shape proportions | Aspect ratio constraints |
| 6 | Negative/zero answers | Min-value constraints per grade |
| 7 | Duplicate questions in session | Hash-based dedup |
| 8 | MC options leak answer | Distractor generation rules |

**Gate 0 fix strategy — quarantine, not refactor:**

`scripts/audit-generators.js` runs every generator × 500 times and machine-checks 6 invariants: (a) answer ≠ any given value [bug 4], (b) division yields integer where grade requires it [bug 2], (c) no diagram label equals an unknown value [bug 1], (d) answer > 0 [bug 6], (e) MC options unique and format-consistent [bug 8], (f) shape aspect ratio ≤ 5:1 [bug 5].

Violators get `status: 'quarantined'` and are excluded from `buildExam`. This is a filter, not a fix. The 3-layer schema (`given` / `unknown` / `display`) is the real fix, scheduled Phase 4B.

**Rationale:** 150 clean generators beats 329 buggy ones, because a small bank can be grown later but trust cannot be rebuilt. This is the plan's own Risk #7 (wrong answers seen by children). Quarantine moves Risk #7 from "mitigated" to "structurally eliminated at Gate 0."

## D7. time_spent_ms Diagnostic Matrix

`responses.time_spent_ms` is not just a performance metric. It determines the nature of the error:

| | Fast | Slow |
|---|---|---|
| **Correct** | Mastered — no action needed | Knows it but not fluent → drill for speed (procedure is understood, not yet automatic) |
| **Wrong** | Careless / guessing → re-read habit | Conceptual gap → re-teach from foundation |

"Knows it but slow" and "doesn't know it" produce completely different parent advice. Without `time_spent_ms`, the parent report cannot distinguish them and defaults to generic feedback. This is why time is mandatory in `responses`, not optional.

## D8. Content Coverage Analysis

**The richness problem:** `question_bank` stores fixed questions. If it holds ~2,004 rows (unverified — see STATUS.md Q4):

- 2,004 ÷ (6 grades × ~8 topics × 3 difficulties × 5 types ≈ 720 buckets) ≈ **2.8 questions per bucket**
- For P4 specifically: ~334 questions ÷ 9 topics ÷ 3 difficulties ≈ **12 per topic-difficulty**

**Consequences:**
- A single 15-question single-topic paper exhausts a bucket
- The "no repeat per student" rule is mathematically impossible at this coverage level
- A Topic Quest station retried 3 times must repeat
- ~3 months of weekly use burns >50% of a grade's bank

**Layer 1 generators do not have this problem** — 329 generator functions produce infinite unique instances. The coverage gap is specifically for `question_bank` (Layer 3 stored content), not Layer 1.

**The fix is not more stored questions.** The fix is templates × contexts × parameter space:
- Each `item_templates` entry + a context set of 20 scenarios × 10 parameter combinations = 200 unique surface forms from 1 template
- `content/contexts.csv` (exported from `contexts.js`) makes contexts editable by non-engineers
- This recalculates coverage to ~2.8 × 200 = 560 per bucket — exhaustion takes years, not months

## D9. Past-Paper Copyright Policy

Mathematical structures, concepts, and question types are not protected by copyright. Expression is. Past papers are a source of **blueprint intelligence**, not content.

**Safe to extract from past papers:**
- Which skills are tested at which grade and mark weight
- Mark distribution and timing (minutes per mark)
- Format mix (MC vs short vs working)
- Mathematical structure (e.g. "fraction comparison requiring LCD finding")
- Typical trap types used

**Never store or use:**
- Original wording from any past paper
- School names in marketing materials
- Any content with `license: restricted`

**In the database:** `question_bank.source = 'derived_structure'` is the correct value for questions whose structure was inspired by a past paper but whose wording is original.

**CI enforcement:** Any migration or seed containing `license: restricted` must hard-fail the build. The `notes` column must never contain original wording from a source paper.

## D10. Actionable Parent Report Standard

Every schema decision in Parts I and above exists to support exactly one deliverable:

> ❌ "Fractions: 60% / Measurement: 85%"
>
> "This week's focus: adding fractions with the same denominator. She added the denominators together 3 times — this is conceptual, not arithmetic carelessness. → [Start the Fractions Quest] or [Print 8 targeted questions]"

If the report cannot produce that sentence, the schema was wasted.

Requirements to produce it:
- `responses.topic_id` — to scope the sentence to one topic
- `responses.raw_answer` + `matched_trap` — to identify "added denominators together"
- `responses.time_spent_ms` — to classify carelessness vs conceptual gap (D7 matrix)
- `misconceptions.parent_advice_zh` — to phrase it in actionable Chinese
- `quest_station_name_zh` — to name the Quest entry point without a grade label
- Trap fall count — to say "3 times", not just "sometimes"

**Grade-label decision (D3):** v4 states "No grade labels shown inside a Quest." v5.1's D2d mockup shows "起點：平均分（P1）… 終點站：異分母加減（P4）". One dataset, two renderings. The child sees `quest_station_name_zh` only — no grade, no "you're at P1" framing. The parent report shows `topic_name_zh` (with grade) for transparency. This avoids the core-premise violation that the child feels sent backwards. Decision recorded in DECISIONS.md.

---

# PART E — PRODUCT: FoodSwipe (Frozen)

## E1. Status: ❄️ FROZEN

## E2. Fit Assessment ⭐

```
┌────────────────────────────────────────────────────────────┐
│  DOES FOODSWIPE FIT AN EDUCATION AI COMPANY?               │
│                                                            │
│  OneUp24 is now an EDUCATION AI-oriented studio.           │
│                                                            │
│  FoodSwipe (restaurant swiping for foodies) does NOT       │
│  naturally fit education AI.                               │
│                                                            │
│  THREE OPTIONS:                                            │
│                                                            │
│  Option A: KILL IT                                         │
│  • Cleanest option. Full focus on education.               │
│  • Removes cognitive load and strategic ambiguity.         │
│  • Recommended if education portfolio grows.               │
│                                                            │
│  Option B: REFRAME AS "FAMILY REWARD" (v3 plan)           │
│  • "Study → earn → pick a restaurant together!"           │
│  • Cross-sell with Maths Quests families                   │
│  • Makes it education-adjacent, not education-core         │
│  • Curlboo appears in both apps (IP synergy)              │
│  • Only viable after Maths Quests PMF proven               │
│                                                            │
│  Option C: SPIN OFF                                        │
│  • Separate brand entirely                                │
│  • No connection to OneUp24 Studio                         │
│  • ❌ NOT recommended (splits focus permanently)           │
│                                                            │
│  VERDICT: Keep frozen. Revisit ONLY when MRR > HKD 50K    │
│  and the Studio model is proven. Default to Option A       │
│  (kill) unless Option B clearly adds value to the          │
│  parent user base.                                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

# PART F — PRODUCT: Future Portfolio ⭐

**Condition:** None of these start development until Maths Quests hits HKD 50K MRR.

| Product | Target | Engine Reuse | Shared IP | Priority |
|---|---|---|---|---|
| English App | P1-P6 English (HK curriculum) | New generators, same architecture | Curlboo + Fluffy | Phase 5+ |
| STEM App | Science/Tech (HK curriculum) | Partial reuse | Curlboo + Fluffy | Phase 6+ |
| Parent-Child App | Family activities/bonding | New | Curlboo + Fluffy | Phase 6+ |

**Purpose on Website NOW:** 3 "Coming Soon" cards on oneup24.com that collect email addresses = pre-launch lead generation.

**Tension with Principle #10 (Maths Quests first, everything else frozen):** Building marketing pages for frozen products is still working on them — cognitive load, visual design time, and copywriting effort all come at the expense of Maths-Up. The founder has decided to keep the 3 Coming Soon cards (Q8 — SETTLED). The rule is: no engineering time on frozen products until Gate 4C → 4A passes. Marketing copy on oneup24.com is acceptable. Product code is not. See DECISIONS.md.

---

# PART G — BUSINESS MODEL & UNIT ECONOMICS

## G1. Revenue Streams

| Stream | Timeline | Annual Target | Margin |
|---|---|---|---|
| Pro Subscription | Phase 5+ | HKD 600K+ | ~90% |
| Family Plan | Phase 5+ | HKD 200K+ | ~90% |
| B2B School Licensing | Phase 5+ | HKD 300K+ | ~85% |
| IP Licensing | Phase 6+ | TBD | ~95% |

## G2. Unit Economics

```
CAC Target:        < HKD 30 (IG organic + WhatsApp)         ← ASSUMPTION (unvalidated)
LTV:               HKD 384 (8 months × HKD 48)              ← ASSUMPTION (unvalidated)
LTV:CAC Ratio:     12.8:1 (target > 3:1)                    ← ASSUMPTION (unvalidated)
Monthly Churn:     < 12%                                     ← ASSUMPTION
Gross Margin:      > 85%
Payback Period:    < 1 month
Break-even:        ~53 Pro subscribers (plan figure — see below for corrected estimate)
```

**ASSUMPTION caveat:** CAC < HKD 30 and 12.8:1 LTV:CAC are unvalidated — 332 combined IG followers (@curlboo.bear + @oneup24game), no paid ads run, no paying users. Label them ASSUMPTION until at least 20 paying users exist.

**Infra break-even (corrected):** The plan's "53 Pro subscribers" appears to use an inflated ops cost figure. Actual likely stack:

| Item | Monthly cost |
|------|-------------|
| Supabase Pro | ~US$25 |
| Vercel Pro | ~US$20 |
| PostHog | Free tier |
| Sentry | Free tier |
| Domain | ~US$1 |
| **Total** | **~US$46–70/mo ≈ HKD 360–550** |

Infra break-even: **8–12 Pro subscribers** (HKD 388/yr ÷ 12 = HKD 32/mo per subscriber, so ~HKD 360 ÷ HKD 32 ≈ 11 subscribers).

The 53-subscriber figure may include founder salary or other ops costs — label clearly which number is which. Mark actual current plan tiers as unverified (Q5 — founder knows the live Supabase/Vercel tiers).

## G3. AI Cost Model (3-Layer Architecture)

| Layer | What | Cost | Status |
|---|---|---|---|
| Layer 1: Hardcode | 329 generators, instant, offline | $0 | built |
| Layer 2: AI (DeepSeek) | V3.2 for word problems (pending benchmark) | ~$0.14-0.28/M tokens | Phase 4B |
| Layer 3: Question Bank | Supabase table, reusable, self-improving | $0 per serve | Schema in Phase 3C |

**Cost Flywheel:**

| Users | Bank Qs | AI Calls/mo | AI Cost/mo | Cost/User |
|---|---|---|---|---|
| 100 | 2,000 | ~500 | ~$0.70 | $0.007 |
| 1,000 | 8,000 | ~2,000 | ~$2.80 | $0.003 |
| 5,000 | 30,000 | ~3,000 | ~$4.20 | $0.001 |
| 20,000 | 50,000+ | ~1,000 | ~$1.40 | ~$0 |

---

# PART H — GROWTH PLAYBOOK

## H1. Current State

```
WHAT EXISTS:
├── @curlboo.bear: 132 followers (IP account)
├── @oneup24game: 200 followers (product account)
├── WhatsApp groups: NOT STARTED
├── Paid ads: NOT TESTED
├── User feedback: NONE YET
└── oneup24.com website: Studio Hub (planned/in progress)
```

## H2. Two Viral Loops

**Loop 1: 陷阱題挑戰 (Trap Question Challenge)**
Post trap question on IG → Parents try to solve → Share → "你的小朋友答得到嗎？" → Install

**Loop 2: 各單元表現 (Diagnostic Share)** — MORE POWERFUL
Parent sees topic breakdown → Screenshots → Shares to WhatsApp → Other parents ask "What app?" → Install

Loop 2 is organic — parents share diagnostic data voluntarily because it proves they're investing in their child.

## H3. Viral Loop 3: Topic Quest Progress ⭐🆕

```
Parent receives push: "Your child completed Station 3 of 5 on Fractions Quest!"
Parent shares to WhatsApp: "[screenshot of Quest map with 3/5 stations complete]"
Other parent: "What is this? My kid is also weak on fractions."
→ Install → Free tier shows gap → Paywall gate 4 triggers → Conversion

This is the highest-intent viral loop because it targets
PARENTS WHO ALREADY KNOW THEIR CHILD HAS A WEAKNESS.
```

## H4. Marketing Timeline

```
Phase 3D (now):     Recruit 10 families via personal network
Phase 5 (paywall):  IG 3 posts/week + WhatsApp groups
Phase 5 (moved ⭐): Weekly parent email + viral share image
Phase 6:            Paid ads testing (HKD 1,500/mo)
                    Parent KOL partnerships
                    Referral system
```

## H5. Competitive Positioning Message

```
TO PARENTS:
"See what a tutor charges $500/hr to tell you
 — for $48/month, automatically."

TO INVESTORS:
"AI diagnostic tool with 200+ paying HK parents.
 Per-topic tracking no competitor offers.
 $800M market growing 12% annually."

TO SCHOOLS:
"Your students get AI diagnostics. You get
 class-wide weakness analytics. Parents get
 engagement reports. Everyone wins."
```

---

# PART I — TECHNICAL ARCHITECTURE

## I0. Architecture Accountability Standards (架構責任規範)

These rules apply to all agents working in this repository and override any general-purpose defaults.

**I0a — Single Source of Truth**
`docs/MASTER_PLAN.md` (strategy) and `docs/STATUS.md` (execution status) are the two authoritative documents. If they conflict on any point, **stop work and ask the founder** — never resolve conflicts by choosing one document over the other.

**I0b — STATUS.md Commit Rule**
Every task commit must update `docs/STATUS.md`. A commit that implements a feature or fix without a corresponding STATUS.md update is incomplete. Do not mark a task done until STATUS.md reflects the change.

**I0c — Content Immutability**
`content/*.csv` is the source of truth for all curriculum data. Agents must NOT add, alter, or delete any math question text, answer expression, trap expression, or misconception description in these files. Agents may only write parsers, validators, renderers, and migration scripts that read from these files.

**I0d — AI Answer Rule**
AI (Claude, DeepSeek, or any model) must never assert or output a numeric answer to a math question. All AI-generated content must use `answer_expr` — an algebraic expression evaluated by Layer 1 (`chkAns`). This structurally eliminates the "AI got the math wrong" failure class.

**I0e — Schema Migration Rule**
All schema changes (`CREATE TABLE`, `ALTER TABLE`, `CREATE INDEX`, `CREATE POLICY`, `DROP INDEX`) must be expressed in `supabase/migrations/*.sql`. Never instruct the user to edit the Supabase dashboard — agents cannot verify dashboard state, and dashboard edits leave no audit trail.

**I0f — RLS and Key Rules**
Every new table requires two lines before any other use: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` and a `CREATE POLICY` scoped to `auth.uid()`. `USING(true)` and `WITH CHECK(true)` are forbidden — they grant global read/write access. `SERVICE_ROLE_KEY` must never carry a `VITE_` prefix; it must never be shipped to the client bundle.

**I0g — Data Integrity Rules**
- Never `DROP` or `TRUNCATE` `question_bank` — it is the company's primary content asset.
- Every exam question answered by a student must write a `responses` row. No question may be served and then silently dropped from the record.
- `android/` and `ios/` directories are frozen until 20 paying users exist. Do not propose or make changes to either directory.
- Do not reopen decisions recorded in `docs/DECISIONS.md`. Surface conflicts to the founder; do not silently work around settled decisions.

---

## I1. Stack

```
Frontend:    React + Vite + Tailwind CSS
Mobile:      Capacitor (iOS + Android prepared — android/ ios/ frozen until 20 paying users)
             appId: com.oneup24.mathsup (Gate 0 item — update capacitor.config.json before any App Store submission;
             appId is IMMUTABLE after first submission — cannot be changed without a new listing)
Backend:     Supabase Cloud (PostgreSQL, Auth, Storage, RLS, Edge Functions)
Engine:      src/engine/ (329 generators, rule-based, $0 cost)
Deploy:      Vercel (live — see docs/STATUS.md for URL)
VCS:         GitHub (oneup24/maths-up, public, 98 commits)
Analytics:   PostHog (live, 18 events — see STATUS.md for event list)
Monitoring:  Sentry (live)
Payments:    Stripe web only (Phase 4C); RevenueCat + IAP deferred until 20 paying users
AI:          DeepSeek V3.2 (planned, Phase 4B — pending benchmark)
Dev tool:    Claude Code (CLAUDE.md in repo)
Package:     pnpm
Languages:   JavaScript 97.2%, Swift 1.6%
```

## I2. Core Data Schema (Live in Supabase)

```sql
-- exam_sessions TABLE (live)
id               UUID (PK)
user_id          UUID (FK → auth.users)
level            INTEGER (1-6 = P1-P6)
topic_code       TEXT ('mixed' or specific topic)
total_questions  INTEGER
correct_count    INTEGER
score_percent    DECIMAL
time_spent       INTEGER (seconds)
topic_breakdown  JSONB ← THE MOAT
completed_at     TIMESTAMPTZ
created_at       TIMESTAMPTZ

-- topic_breakdown JSONB example:
-- {"3M":{"total":3,"wrong":3},"3N5":{"total":2,"wrong":1}}

-- RLS: Users can only read/write their own sessions
```

## I3. Future Tables (Full schema — see `docs/future_tables.md`)

> Full schemas with RLS, indexes, and JSONB examples. Build in Supabase at the start of the listed Phase. **Do NOT build UI until the Phase begins.**

### The Data Gap: Why `responses` is Gate 0 Priority

`exam_sessions.topic_breakdown` stores aggregate counts per topic per session. It cannot answer: which question did the child see, what did they actually type, how many seconds did they spend, which specific trap did they fall for, which attempt was this. This data is not backfillable from existing records.

Eight features in this plan are blocked until `responses` exists:

| Feature | Phase | Why responses is required |
|---------|-------|--------------------------|
| Daily Challenge "3-5 error-based questions" | 4B P0 | Must know which specific questions the child got wrong |
| Spaced repetition (D3c) | 5-6 | Requires per-question attempt history and timing |
| No-repeat question serving | 4B | Requires which question_ids have been seen |
| "Report wrong answer" button | 4B | Must link report to specific question_id |
| question_bank quality learning (times_served/correct/avg_time) | 4B | Backfilling from exam_sessions is impossible |
| trap_fall_rate per trap | 4B | Must know which trap was hit per question |
| Per-station Quest analytics | 3E | Quest stations are individual questions |
| Empirical difficulty calibration | 4B+ | Requires per-question response distribution |

```sql
-- responses — per-question answer record (Gate 0)
-- exam_sessions.topic_breakdown remains as a read cache (aggregate).
-- responses becomes the source of truth for all diagnostic features.
CREATE TABLE responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES exam_sessions(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id     UUID,              -- question_bank.id; null if Layer 1 generated
  generator_id    TEXT,              -- Layer 1 generator identifier (e.g. 'grade4_fractions_add')
  topic_id        TEXT NOT NULL,
  q_index         INT NOT NULL,      -- position in the exam (0-indexed)
  is_correct      BOOLEAN NOT NULL,
  raw_answer      TEXT,              -- exactly what the child typed
  matched_trap    TEXT,              -- which trap/distractor was hit, if any
  time_spent_ms   INT,               -- milliseconds from question display to answer submit
  attempt_no      INT DEFAULT 1,
  content_version TEXT,              -- from content/VERSION — lets you query which sessions
                                     -- were affected after fixing a generator bug
  created_at      TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON responses USING (user_id = auth.uid());
CREATE INDEX ON responses (user_id, topic_id, is_correct);
CREATE INDEX ON responses (question_id);
```

---

```sql
-- question_bank — AI-as-Factory stored content (Phase 3C)
CREATE TABLE question_bank (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade           INT NOT NULL,
  topic_id        TEXT NOT NULL,
  difficulty      TEXT NOT NULL,       -- 'basic' | 'standard' | 'challenge'
  q_type          TEXT NOT NULL,       -- 'mc' | 'fill' | 'calc' | 'short' | 'working'
  question_json   JSONB NOT NULL,      -- full question object {d,tp,q,a,sc,isMC,opts,...}
  source          TEXT NOT NULL,       -- 'hardcode' | 'ai_v32' | 'ai_r1' | 'exam_mimic'
  hash            TEXT NOT NULL UNIQUE, -- SHA256 of question+answer for dedup
  quality_score   INT DEFAULT 50 CHECK (quality_score BETWEEN 0 AND 100),
  times_served    INT DEFAULT 0,
  times_correct   INT DEFAULT 0,
  avg_time_spent  DECIMAL,
  status          TEXT DEFAULT 'verified' CHECK (status IN ('verified','flagged','retired')),
  context_version INT DEFAULT 1,
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX ON question_bank (grade, topic_id, difficulty, q_type, status);
CREATE INDEX ON question_bank (quality_score DESC) WHERE status = 'verified';

-- student_profiles — multi-child family support (Phase 4A)
CREATE TABLE student_profiles (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name   TEXT NOT NULL,
  grade        INT NOT NULL CHECK (grade BETWEEN 1 AND 6),
  avatar       TEXT,                    -- emoji or asset key
  created_at   TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON student_profiles
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE INDEX ON student_profiles (user_id);

-- subscriptions — paywall state (Phase 5)
-- Source of truth for entitlement checks. Populated by Stripe webhooks (Phase 4C).
-- RevenueCat added at Phase 4A when mobile goes live. Do NOT trust client-side plan claims — always check this table server-side.
CREATE TABLE subscriptions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan         TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'family')),
  status       TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  started_at   TIMESTAMPTZ NOT NULL,
  expires_at   TIMESTAMPTZ,
  provider     TEXT CHECK (provider IN ('revenuecat', 'stripe')),
  provider_id  TEXT,                    -- RevenueCat or Stripe subscription ID
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON subscriptions USING (user_id = auth.uid());
CREATE INDEX ON subscriptions (user_id, status);

-- topic_map — prerequisite chains (D1a, Topic Quest route source) (Phase 4B)
-- Source of truth: content/topic_map.csv (hand-authored, not generated)
-- topic_id MUST match the topicId values used in src/engine/ — do not invent a parallel ID system
-- Two renderings from one dataset: child sees quest_station_name_zh (no grade);
-- parent report shows topic_name_zh (with grade). See DECISIONS.md §grade-label.
CREATE TABLE topic_map (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id               TEXT NOT NULL UNIQUE,   -- matches topicId in engine.js
  topic_name_zh          TEXT NOT NULL,           -- shown in parent report (includes grade)
  topic_name_en          TEXT NOT NULL,
  quest_station_name_zh  TEXT NOT NULL,           -- shown to child inside Quest (no grade label)
  grade                  INT NOT NULL CHECK (grade BETWEEN 1 AND 6),
  prerequisites          TEXT[] DEFAULT '{}',    -- topic_ids that must be mastered first
  unlocks                TEXT[] DEFAULT '{}',    -- topic_ids this topic enables
  importance             TEXT CHECK (importance IN ('critical', 'high', 'medium', 'low')),
  created_at             TIMESTAMPTZ DEFAULT now()
);
-- RLS: read-only for all authenticated users — this is curriculum data, not user data
ALTER TABLE topic_map ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read_all" ON topic_map FOR SELECT USING (auth.role() = 'authenticated');
CREATE INDEX ON topic_map (grade);
CREATE INDEX ON topic_map USING gin (prerequisites);

-- knowledge_gaps — detected weak topics (D1c) (Phase 4B)
CREATE TABLE knowledge_gaps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id      TEXT NOT NULL,
  wrong_count   INT NOT NULL DEFAULT 0,
  total_count   INT NOT NULL DEFAULT 0,
  last_seen     TIMESTAMPTZ DEFAULT now(),
  gap_severity  TEXT CHECK (gap_severity IN ('critical', 'moderate', 'watch')),
  quest_id      UUID,                    -- link to active/completed quest for this gap
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, topic_id)
);
ALTER TABLE knowledge_gaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON knowledge_gaps
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE INDEX ON knowledge_gaps (user_id, gap_severity);

-- quest_progress — Topic Quest session state (D2d) (Phase 4B)
CREATE TABLE quest_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_type   TEXT NOT NULL,           -- topic category, e.g. 'fractions', 'decimals'
  target_topic TEXT NOT NULL,           -- the topic student was originally stuck on
  chain        JSONB NOT NULL,          -- ordered prerequisite chain: [{topicId, topicName, grade}]
  current_step INT DEFAULT 0,           -- 0-indexed station pointer
  step_results JSONB DEFAULT '[]',      -- [{step, score, passed, attempts, timestamp}]
  status       TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  started_at   TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE quest_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON quest_progress
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE INDEX ON quest_progress (user_id, status);
CREATE INDEX ON quest_progress (user_id, target_topic);
```

**quest_progress JSONB shapes:**

`chain` example: `[{"topicId":"p2_addition","topicName":"加法","grade":2},{"topicId":"p4_fractions_add","topicName":"分數加減","grade":4}]`

`step_results` example: `[{"step":0,"score":5,"passed":true,"attempts":1,"timestamp":"2026-04-14T10:00:00Z"},{"step":1,"score":3,"passed":false,"attempts":1,"timestamp":"2026-04-14T10:05:00Z"}]`

**Quest analytics events (via track.js):**

| Event | When | Props |
|-------|------|-------|
| `quest_start` | Quest begins | `{ target_topic, chain_length }` |
| `quest_station_pass` | 4/5 correct | `{ step, topic_id, attempts }` |
| `quest_station_fail` | <4/5 correct | `{ step, topic_id, score, attempts }` |
| `quest_complete` | All stations cleared | `{ target_topic, chain_length, total_time_spent }` |
| `quest_abandoned` | User exits mid-quest | `{ step, chain_length }` |

## I4. AI-as-Factory (NOT AI-as-Service)

```
KEY INSIGHT:
AI generates content ONCE → Store in question_bank → Serve FOREVER at $0
Competitors using AI-as-service pay per query forever. We don't.

Current:  Template engine → Generate → Serve ($0)
Future:   AI → Validate → Store in Supabase → Serve from DB → Learn ($→0)

The content bank + topic_breakdown JSONB = the company's two most valuable assets.
```

## I5. CSV Column Specs

The `content/` directory holds additive metadata files that sit **on top of** the existing engine — not a replacement for `question_bank`, `contexts.js`, `gradeRules.js`, or the generators. These files make curriculum data editable by non-engineers. See Appendix F for authoring conventions and Google Sheets export procedure.

**Directory:**
```
content/
  README.md              — Chinese column documentation (founder reads this)
  topic_map.csv          — prerequisite chains; source of truth for topic_map table
  skills.csv             — sub-skill layer, FIRST 3 TOPICS ONLY (~6 sub-skills each ≈ 18 rows)
  traps.csv              — trap + distractor + misconception + trap_fall_rate (unified system)
  misconceptions.csv     — parent_advice_zh library (~25 rows)
  item_templates.csv     — AI-emits-templates output (richness fix)
  contexts.csv           — exported from contexts.js; made non-engineer editable
  blueprints.csv
  blueprint_sections.csv — includes use_weak_topics boolean (the retention mechanism)
  VERSION                — content version tag; written to responses.content_version
```

**Three immutable rules:**
1. Multi-value fields use `|` not commas — commas corrupt CSV parsing.
2. Files must be UTF-8 without BOM — author in Google Sheets, export CSV. Excel corrupts Traditional Chinese by default. CI checks encoding.
3. IDs are never renamed or reused once live, because `responses` references them. A renamed ID is a broken foreign key.

### topic_map.csv

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `topic_id` | TEXT | ✓ | Must match `topicId` in `src/engine/`. Never rename once live. |
| `topic_name_zh` | TEXT | ✓ | Shown in parent report. May include grade (e.g. "異分母分數加減（P4）"). |
| `topic_name_en` | TEXT | ✓ | English equivalent. |
| `quest_station_name_zh` | TEXT | ✓ | Shown to child inside Quest. **No grade label.** |
| `grade` | INT | ✓ | 1–6. |
| `prereq_topic_ids` | TEXT | | Pipe-separated `topic_id`s that must be mastered first. Empty = root node. |
| `unlocks` | TEXT | | Pipe-separated `topic_id`s this topic enables. |
| `importance` | TEXT | ✓ | `critical` \| `high` \| `medium` \| `low` |

### skills.csv (first 3 topics only — ~18 rows total)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `skill_id` | TEXT | ✓ | Unique. Format: `{topic_id}_{slug}`. |
| `topic_id` | TEXT | ✓ | FK → topic_map.topic_id. |
| `skill_name_zh` | TEXT | ✓ | Short name for parent report sentence. |
| `skill_name_en` | TEXT | ✓ | |
| `description_zh` | TEXT | | One sentence describing the sub-skill. |

**Scope limit:** `skills.csv` covers the first 3 topics only. Do not build a 900-skill taxonomy. Sub-skills are needed for specific parent advice ("added denominators together"), not for routing.

### traps.csv

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `trap_id` | TEXT | ✓ | Unique. Never reuse. |
| `topic_id` | TEXT | ✓ | FK → topic_map.topic_id. |
| `trap_type` | TEXT | ✓ | Short slug (e.g. `add_denominators`). |
| `distractor_expr` | TEXT | ✓ | Algebraic expression producing the wrong answer (e.g. `(a+c)/(b+d)`). |
| `misconception_code` | TEXT | ✓ | FK → misconceptions.misconception_code. |
| `plausible_min` | INT | ✓ | Minimum plausible distractor value. CI enforces presence. |
| `plausible_max` | INT | ✓ | Maximum plausible distractor value. |

**Unification note:** Trap = planted wrong path; distractor = wrong answer it produces; misconception = reasoning error name; trap_fall_rate = measurement. One `traps.csv`, one engine. `trap_fall_rate` upgrades from a number into a parent report sentence. The #1 differentiator becomes the #1 diagnostic asset.

### misconceptions.csv (~25 rows)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `misconception_code` | TEXT | ✓ | Unique slug. Referenced by traps.csv. |
| `topic_id` | TEXT | ✓ | FK → topic_map.topic_id. |
| `name_zh` | TEXT | ✓ | Short name of the error (e.g. "分母相加謬誤"). |
| `parent_advice_zh` | TEXT | ✓ | Actionable one-sentence advice for parent report. |
| `remediation_station_id` | TEXT | | Optional `quest_station_name_zh` of the station that addresses this misconception. |

### item_templates.csv

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `template_id` | TEXT | ✓ | Unique. Never rename once live. |
| `skill_id` | TEXT | ✓ | FK → skills.csv. |
| `grade` | INT | ✓ | 1–6. |
| `topic_id` | TEXT | ✓ | FK → topic_map.topic_id. |
| `difficulty` | TEXT | ✓ | `basic` \| `standard` \| `challenge` |
| `q_type` | TEXT | ✓ | `mc` \| `fill` \| `calc` \| `short` \| `working` |
| `body_zh` | TEXT | ✓ | Template body with `{{slot}}` placeholders. |
| `body_en` | TEXT | | Optional English variant. |
| `slots` | TEXT | ✓ | JSON: `{"a":{"range":[2,9]},"b":{"range":[1,4]}}` |
| `constraints` | TEXT | | Pipe-separated constraint expressions (e.g. `a>b\|gcd(a,b)>1`). |
| `answer_expr` | TEXT | ✓ | Algebraic expression only. Never a numeric literal. |
| `traps` | TEXT | | JSON array of `{distractor_expr, misconception_code}`. Live templates require ≥ 2 traps. |
| `source` | TEXT | ✓ | `hardcode` \| `ai_v32` \| `ai_r1` \| `exam_mimic` |
| `license` | TEXT | ✓ | `original` \| `derived_structure`. `restricted` hard-fails CI. |
| `plausible_min` | INT | ✓ | CI enforces presence. |
| `plausible_max` | INT | ✓ | |
| `example_seed` | TEXT | ✓ | JSON: `{"a":3,"b":2}`. Regression guard. |
| `example_answer` | TEXT | ✓ | Expected output for example_seed. CI asserts match. |
| `context_version` | INT | | Defaults to 1. Increment when template is materially revised. |

### contexts.csv

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `context_id` | TEXT | ✓ | Unique. |
| `topic_id` | TEXT | ✓ | FK → topic_map.topic_id. |
| `context_zh` | TEXT | ✓ | Real-world story context in Chinese. |
| `context_en` | TEXT | | English equivalent. |
| `grade_min` | INT | ✓ | Lowest grade this context suits. |
| `grade_max` | INT | ✓ | Highest grade. |
| `tags` | TEXT | | Pipe-separated (e.g. `food\|shopping\|sports`). |

### blueprints.csv + blueprint_sections.csv

**blueprints.csv:**

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `blueprint_id` | TEXT | ✓ | Unique. |
| `name_zh` | TEXT | ✓ | Display name. |
| `grade` | INT | ✓ | 1–6. |
| `total_questions` | INT | ✓ | Target question count. |
| `time_limit_min` | INT | | Time limit in minutes. |

**blueprint_sections.csv:**

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| `section_id` | TEXT | ✓ | Unique. |
| `blueprint_id` | TEXT | ✓ | FK → blueprints.blueprint_id. |
| `topic_id` | TEXT | ✓ | FK → topic_map.topic_id. |
| `q_type` | TEXT | ✓ | `mc` \| `fill` \| `calc` \| `short` \| `working` |
| `difficulty` | TEXT | ✓ | `basic` \| `standard` \| `challenge` |
| `count` | INT | ✓ | Number of questions for this section. |
| `use_weak_topics` | BOOLEAN | ✓ | When `true`, substitutes the student's weak topics at runtime — the primary retention mechanism. A parent who sees a paper that "knows" their child's weaknesses renews before trying a competitor. |

## I6. Guest Mode Data Policy

Guest = localStorage only = zero cloud diagnostic data, while also being the frictionless default path. This creates a tension: the most accessible path generates no data for improvement.

**For Phase 3D:** All 10 families sign in (the founder is hand-holding them anyway). No guest sessions during the soft launch cohort.

**Post-3D option:** Anonymous `device_id` sessions stored locally, merged on signup. This allows diagnostic data collection before the auth friction. Do not build this unless Phase 3D data proves the parent report is actionable — building the merge mechanism before validating the report is premature.

**Permanent rule (do not change):** Guest mode must always work. Full exam features are available without an account. The sign-up prompt is a banner, never a hard gate for exam completion.

---

## I7. Content Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│  CONTENT PIPELINE: from CSV to student question              │
│                                                              │
│  1. AUTHOR                                                   │
│     Founder authors content/*.csv in Google Sheets.          │
│     Export as UTF-8 CSV (see Appendix F). Never use Excel.   │
│                                                              │
│  2. VALIDATE (CI)                                            │
│     npm run content:check                                    │
│     → 9 assertions (see §I9)                                 │
│     → Fails on license:restricted, broken IDs, cycles        │
│     → Error output: Chinese + filename + line number         │
│                                                              │
│  3. MIGRATE                                                  │
│     supabase/migrations/*.sql seeds:                         │
│       topic_map table       ← topic_map.csv                  │
│       misconceptions table  ← misconceptions.csv             │
│       item_templates table  ← item_templates.csv             │
│     All other CSVs read at runtime by the app.               │
│                                                              │
│  4. RUNTIME QUESTION SELECTION (Phase 4B modified buildExam) │
│     Priority 1: question_bank (Layer 3, stored)              │
│     Priority 2: item_templates (Layer 1 fills slots)         │
│     Priority 3: AI generate (DeepSeek — Phase 4B+)           │
│     Fallback:   Layer 1 hardcode generators                  │
│                                                              │
│  5. VERSION TRACKING                                         │
│     content/VERSION → written to responses.content_version   │
│     Query: "which sessions used the buggy template?"         │
└─────────────────────────────────────────────────────────────┘
```

**content/VERSION tag format:** `YYYY-MM-DD.N` (e.g. `2026-08-24.1`). Increment `.N` for same-day revisions. Increment the date portion whenever content is deployed to production. The value is written to `responses.content_version` so you can filter responses by content cohort after fixing a generator or template bug.

---

## I8. exam_sessions Column Specs

Full reference for the `exam_sessions` table (live in Supabase):

| Column | Type | Nullable | Notes |
|--------|------|----------|-------|
| `id` | UUID | No | PK, `gen_random_uuid()`. |
| `user_id` | UUID | No | FK → `auth.users(id)`. RLS owner key. |
| `level` | INT | No | 1–6 (P1–P6). Written from student profile grade. |
| `topic_code` | TEXT | No | `'mixed'` for full exam; specific `topic_id` for single-topic drill. |
| `total_questions` | INT | No | Count of questions in session. |
| `correct_count` | INT | No | Count of correct answers. |
| `score_percent` | DECIMAL | No | `correct_count / total_questions × 100`. |
| `time_spent` | INT | No | Total session duration in **seconds** (legacy unit — not ms). |
| `topic_breakdown` | JSONB | No | Per-topic aggregate: `{"topicId":{"total":N,"wrong":N}}`. **The moat.** Aggregate read cache only — `responses` is source of truth for per-question diagnostics. |
| `completed_at` | TIMESTAMPTZ | Yes | NULL if session was abandoned mid-exam. |
| `created_at` | TIMESTAMPTZ | No | Auto-set `DEFAULT now()`. |

**RLS:** `CREATE POLICY "owner" ON exam_sessions USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());`

**topic_breakdown shape:**
```json
{"3M": {"total": 3, "wrong": 3}, "3N5": {"total": 2, "wrong": 1}}
```
Key = `topic_id` string. `wrong` = incorrect answers. `total − wrong` = correct answers. This is an aggregate cache; per-question detail lives in `responses`.

**Columns to never add:** Do not denormalize `score_percent` variants, `was_completed`, or per-question data into this table. Compute at query time from existing columns; per-question detail belongs in `responses`.

---

## I9. CI Checks (`npm run content:check`)

All assertions run against `content/*.csv`. Failure output must print **Chinese + filename + line number** — the founder reads it, not an agent.

| # | Check | Files | Fails when |
|---|-------|-------|-----------|
| 1 | Cross-file ID resolution | All | Any `topic_id`, `skill_id`, `misconception_code`, or `template_id` referenced in one file does not exist in its source file |
| 2 | No prerequisite cycles | topic_map.csv | `prereq_topic_ids` contains a cycle (DFS check) |
| 3 | Template constraint satisfaction | item_templates.csv | Any template × 100 random seeds fails its own `constraints` expression |
| 4 | Example seed regression | item_templates.csv | `example_seed` + `answer_expr` does not yield `example_answer` |
| 5 | No restricted license | item_templates.csv, question_bank seeds | Any row with `license: restricted` |
| 6 | Plausible range present | traps.csv, item_templates.csv | `plausible_min` or `plausible_max` absent |
| 7 | UTF-8, no BOM | All | File opens with BOM bytes `EF BB BF` |
| 8 | Live templates have ≥ 2 traps | item_templates.csv | Any live-status template has fewer than 2 trap entries in the `traps` JSON array |
| 9 | quest_station_name_zh present | topic_map.csv | Any row missing `quest_station_name_zh` |

**Additional code-layer checks (`npm run lint:security`):**

| # | Check | Fails when |
|---|-------|-----------|
| 10 | No SERVICE_ROLE_KEY with VITE_ prefix | Any `VITE_SUPABASE_SERVICE_ROLE_KEY` appears in env files or source |
| 11 | No USING(true) in migrations | Any migration SQL contains `USING(true)` or `WITH CHECK(true)` |

---

## I10. Agent Rules (v6.0)

These rules apply to Claude Code and any AI agent working in this repository. They mirror and extend §I0 with implementation-level guidance.

1. **Read before writing.** Before any task, read `docs/MASTER_PLAN.md` (strategy) and `docs/STATUS.md` (execution status). If they conflict on any point, stop and ask the founder.

2. **Update STATUS.md in every commit.** No exceptions. A commit without a STATUS.md update is incomplete — do not mark the task done.

3. **Never alter math content.** `content/*.csv` math question text, answer expressions, trap expressions, and misconception descriptions are the founder's intellectual work. Agents write code that reads, validates, or displays this content; they do not edit it.

4. **AI emits templates, never answers.** Any AI-generated question must use `answer_expr` (algebraic expression). Never output a numeric answer from a model. Layer 1 computes the actual number at serve time.

5. **Schema via migrations only.** All `CREATE TABLE`, `ALTER TABLE`, `CREATE INDEX`, `CREATE POLICY` statements go into `supabase/migrations/*.sql`. Never instruct the user to run SQL in the Supabase dashboard.

6. **RLS on every new table.** Pattern: `ALTER TABLE t ENABLE ROW LEVEL SECURITY; CREATE POLICY "owner" ON t USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());` Omitting this is a security regression.

7. **Protect question_bank.** Never `DROP` or `TRUNCATE`. Never `DELETE` without a `WHERE` clause scoped to specific `id`s.

8. **Every question answered writes a `responses` row.** If you modify the exam flow, verify the `responses` write path is intact. This is Gate 0 and blocks 8 downstream features (see §I3).

9. **Frozen directories.** Do not propose or make changes to `android/` or `ios/` until the founder confirms 20 paying users exist.

10. **Settled decisions stay settled.** Do not reopen entries in `docs/DECISIONS.md`. Surface conflicts to the founder rather than silently working around them.

---

# PART J — RISK MATRIX

| # | Risk | Level | Mitigation |
|---|---|---|---|
| 1 | HK student population −36% by 2029 | **HIGH** | Intl schools + SEA + B2B. Fewer kids = parents spend MORE per child. Schools need differentiation tools. |
| 2 | Big player enters (BYJU's, etc.) | MED | Trap items + HK curriculum specificity + topic_breakdown data moat + Curlboo switching cost |
| 3 | Parents won't pay for digital | MED | HKD 48 < 1 workbook. Sell INSIGHT not quizzes. PDF makes it "feel physical." Topic Quest sells a PATH. |
| 4 | Solo founder burnout | **HIGH** | Scope tiny. FoodSwipe frozen. AI tools multiply output. Hire P/T in Phase 4. |
| 5 | AI costs spike | LOW | Currently $0. AI-as-Factory ensures cost → $0 over time. |
| 6 | Can't raise funding | MED | Profitable without funding (53 users covers costs). Raise is for acceleration. |
| 7 | Wrong math answers shown to children | **HIGH** | Validation pipeline is NOT optional. One wrong answer = parent trust destroyed permanently. |
| 8 | Generator bugs (8 known) | MED | 3-layer schema fix + validation gate + audit script (Phase 3C/4B) |
| 9 | No user feedback yet | **HIGH** | Phase 3D is the GATE. Ship to 10 families ASAP. Everything else is noise until real humans use it. |

---

# PART K — FUNDRAISE STRATEGY

## K1. Timeline

- Pre-fundraise: Prove MRR > HKD 10K for 2 consecutive months
- Target: HKD 50-100萬 pre-seed
- Instrument: SAFE note or convertible note
- Valuation cap: HKD 500-800萬
- Target investors: HK angels, Cyberport/HKSTP, education micro-VCs, strategic angels (school principals, tutoring CEOs)

## K2. Use of Funds (HKD 800K)

| Category | Amount | % |
|---|---|---|
| Content + AI Engine | $200K | 25% |
| Marketing + CAC | $250K | 31% |
| Product Development | $200K | 25% |
| Runway Buffer (6mo) | $150K | 19% |

## K3. Pitch Deck Structure (10 Slides)

```
1. Cover — OneUp24 + Curlboo + "AI-Powered Math Diagnostics"
2. Problem — Parents can't see WHERE their child is weak
3. Solution — AI quizzes + 📊各單元表現 + Topic Quest + Traps
4. Demo — Live screenshots from maths-exam.vercel.app
5. Traction — MRR, users, retention, case study
6. Market — HK $800M EdTech + APAC 12.9% CAGR
7. Business Model — Freemium + B2B school licensing
8. Tech Moat — AI-as-Factory + topic_breakdown + Curlboo + Topic Quest
9. Roadmap — 6 phases with KPIs
10. Ask — HKD 80萬, use of funds, what it unlocks
```

---

# PART M — PHASE GATES (Consolidated)

| Gate | Condition | If not met |
|------|-----------|------------|
| Gate 0 → 3D | Docs unified + generator audit clean + `responses` table live + RLS clean (no `USING(true)`) + brand/appId unified | No families onboarded |
| 3D → 3E | 10 families × 3 sessions + both qualitative questions asked | No new features |
| 3E → 4 | 3 parents paid HKD 388 | Fix the report; do not build mobile |
| 4B → 4C | Full Topic Quest chain works + traps mapped to misconceptions | Do not open Stripe |
| 4C → 4A | 20 paying users | android/ ios/ stay frozen |
| 4A → 5 | MRR > HKD 10K for 2 consecutive months | No pitch deck |

---

# PART L — METRICS, MILESTONES & GATES

## L1. KPI Dashboard

**Track from Day 1 (after PostHog integration):**

| Category | Metric |
|---|---|
| Acquisition | Signups, weekly new, source, CAC, IG followers |
| Activation | Signup → first quiz %, → PDF %, → 各單元表現 view %, → D3 return % |
| Revenue | MRR, paying users, free→Pro %, ARPU, annual plan % |
| Retention | D1/D7/D30 retention, monthly churn, avg subscription length |
| Engagement | Quizzes generated/completed, PDFs exported, avg session, trap fall rate |
| Data Moat | topic_breakdown records, unique topic codes, bank size, AI cost/quiz |
| Topic Quest | Quests started, completion rate, avg stations completed, abandonment point, time per quest, quest → conversion rate |
| Per-question | `question_answered` volume by topic/grade, per-question abandonment point (which q_index do users stop at?), median `time_spent_ms` by topic, `trap_fall_rate` by trap type, misconception frequency ranking (which misconceptions appear most?), per-question `is_correct` rate over time (quality calibration) |

## L2. Milestones & Target Dates

| Milestone | Target | Gate |
|---|---|---|
| Phase 3 complete | April 2026 | All tests pass, PostHog/Sentry live, 0 critical bugs |
| 🚀 Soft launch (10 families) | Late April 2026 | Families recruited, feedback group active |
| Feedback incorporated | May 2026 | Top 3 issues fixed, D1/D7 measured |
| Phase 4A (iOS app) submitted | June 2026 | App Store review passed |
| Phase 4B (AI + Smart + Gamification + Topic Quest) | Jul-Aug 2026 | V3.2 benchmark done, Bank learning, Daily Challenge live, Topic Quest v1 live |
| Phase 5 (Paywall live) | Sep 2026 | Trap Engine shipped, 4 gates, RevenueCat live |
| Phase 6 (Growth) | Q4 2026 | 100+ paying users, case study ready |

**These dates are targets. The GATES are commitments. Do not skip gates.**

---

# APPENDIX A — Strategic Principles

1. **Every feature must produce data.** Prioritize features that generate exam_sessions. Topic Quest generates 2-3x data per session.
2. **AI-as-Factory, not AI-as-Service.** Generate once, store forever, serve at $0.
3. **Sell the INSIGHT, not the tool.** Parents pay for "where is my child weak," not "unlimited quizzes." Topic Quest sells a designed PATH, not more questions.
4. **4 paywall gates, no more.** Discipline. More gates = less trust.
5. **Validate before serve. Always.** One wrong math answer = parent trust destroyed permanently.
6. **Ship to real humans first, optimize later.** Phase 3D is the gate.
7. **topic_breakdown JSONB is the moat.** Protect it. Back it up. Never delete it.
8. **"Would a tutor do this?"** Yes → build. No → don't.
9. **Dark Souls, not Mario.** Reward overcoming difficulty, not just showing up.
10. **Maths Quests first. Everything else frozen.** No FoodSwipe, no English app, no STEM app until MRR > HKD 50K.
11. **Ability is a journey, not a state.** 🆕 You can't copy-paste ability. You can only design a path and let them walk it. This is why Topic Quest exists.

---

# APPENDIX B — Decision Framework

```
┌──────────────────────────────────────────────────────────┐
│          THE ONEUP24 DECISION FILTER v5.1                  │
│                                                          │
│  1. "Does this help Maths Quests hit 10K MRR?"           │
│     YES → Do it now.                                     │
│                                                          │
│  2. "Does this deepen the topic_breakdown data moat?"    │
│     YES → Do it (after #1 tasks).                        │
│                                                          │
│  3. "Does this strengthen 各單元表現 or Topic Quest as    │
│      retention/paywall drivers?"                         │
│     YES → Schedule next sprint.                          │
│                                                          │
│  4. "Would a tutor do this?"                             │
│     NO → Don't build it.                                 │
│                                                          │
│  5. "Does this help the student WALK a journey, or       │
│      just hand them a max-level save file?" 🆕           │
│     MAX-LEVEL SAVE → Rethink it.                         │
│     JOURNEY → Build it.                                  │
│                                                          │
│  6. "Is this FoodSwipe or any non-Maths-Quests work?"    │
│     YES → FREEZE IT.                                     │
│                                                          │
│  Everything else → Probably a distraction. Skip it.      │
└──────────────────────────────────────────────────────────┘
```

---

# APPENDIX C — Market Data Sources

| # | Source | Key Data |
|---|---|---|
| 1 | Research Nester | Global $187B→$725B, APAC 12.9%, K-12 42.3% |
| 2 | Editorialge | HK $800M→$1.2B, 95% school adoption |
| 3 | Wikipedia — Education in HK | 2hr homework, cram schools, AI university adoption |
| 4 | Market Research Future | Global $193B→$815B, 15.5% CAGR |
| 5 | Young Post / SCMP | 36% P1 decline by 2029 |
| 6 | Citrusbug | AI in edu 30%, educator AI adoption 62% |
| 7 | HK Education Bureau | 591 primary, 513 secondary schools |

---

# APPENDIX D — Claude Code Integration Notes ⭐🆕

```
┌────────────────────────────────────────────────────────────┐
│  FOR CLAUDE CODE: KEY CONTEXT WHEN WORKING ON THIS REPO    │
│                                                            │
│  REPO: github.com/oneup24/maths-up                         │
│  REF:  CLAUDE.md in root (project-specific instructions)   │
│                                                            │
│  PRIORITY ORDER (always):                                  │
│  1. Fix bugs that affect math correctness FIRST            │
│  2. Fix bugs that affect data integrity SECOND             │
│  3. New features THIRD                                     │
│                                                            │
│  NEVER:                                                    │
│  • Serve unvalidated AI questions to students              │
│  • Delete or modify topic_breakdown data                   │
│  • Add more than 4 paywall gates (updated from 3)          │
│  • Add gamification to core learning experience            │
│  • Break guest mode                                        │
│                                                            │
│  ARCHITECTURE DECISIONS:                                   │
│  • All quiz generation = engine.js (Layer 1, $0 cost)      │
│  • All user data = Supabase with RLS                       │
│  • Every question MUST have topicId + topicName            │
│  • Every exam MUST save topic_breakdown as JSONB            │
│  • Frontend: React + Vite + Tailwind CSS                   │
│  • Mobile: Capacitor                                       │
│  • Package manager: pnpm                                   │
│                                                            │
│  8 KNOWN GENERATOR BUGS (see Part D6):                     │
│  Root cause: schema lacks given/unknown separation          │
│  Fix: 3-layer schema + validation gate + audit script       │
│                                                            │
│  ─── TOPIC QUEST BUILD INSTRUCTIONS ───                    │
│                                                            │
│  PHILOSOPHY:                                               │
│  • Ability is a JOURNEY, not a STATE                       │
│  • It's NOT remediation (retry the boss with max gear)     │
│  • It IS learning curve replay (new game from Level 1)     │
│  • The student should NEVER feel "sent back"               │
│  • They should feel they're "on a new Quest"               │
│                                                            │
│  WHAT PROGRESSION BUILDS (that retry cannot):              │
│  • Timing — when to use which operation                    │
│  • Pattern — see problem type → predict solution method    │
│  • Intuition — knowing without conscious calculation       │
│  • Confidence — "I've done harder. I can do this."         │
│  • Sequence — knowing which step comes first               │
│                                                            │
│  IMPLEMENTATION:                                           │
│  • Uses topic_map prerequisite chains (D1a)                │
│  • Trace chain backward from stuck topic                   │
│  • Build route: earliest prerequisite → stuck topic        │
│  • 5 stations × 5 questions, 4/5 pass gate                 │
│  • Curlboo accompanies each station (escalating reactions) │
│  • Store in quest_progress table                           │
│  • Each Quest generates 20-25 data points                  │
│  • Pro-only feature (paywall gate #4)                      │
│                                                            │
│  D2 UPGRADE WITH TOPIC QUEST:                              │
│  • D2a (retry) → becomes "single station practice"         │
│  • D2b (importance) → "this affects P4-P6" on Quest map   │
│  • D2c (parent report) → adds Quest progress tracking     │
│  • D2d (NEW) → full Quest system                           │
│                                                            │
│  ─── DAILY CHALLENGE BUILD INSTRUCTIONS ───                │
│                                                            │
│  • 3-5 questions from previous errors + spaced repetition  │
│  • Once per day, no redo (Dark Souls philosophy)           │
│  • Streak counter feeds into Stardust rewards              │
│                                                            │
│  ─── PAYWALL BUILD INSTRUCTIONS ───                        │
│                                                            │
│  • EXACTLY 4 gates:                                        │
│    1. Blurred diagnostic                                   │
│    2. Daily limit                                          │
│    3. PDF export                                           │
│    4. Topic Quest (triggered by gap detection)             │
│  • Gate 4 is HIGHEST INTENT — parent already knows         │
│    their child has a gap. Show designed path. Convert.     │
│  • Free users see score only, Pro sees 各單元表現           │
│  • Topic Quest is Pro-only                                 │
│  • Paywall copy for gate 4: see Part D2f                   │
│                                                            │
│  ─── CURLBOO QUEST REACTIONS ───                           │
│                                                            │
│  Station 1: 開心跳  「你記得平均分！好叻！」                │
│  Station 2: 驚訝    「你仲記得分數係咩！」                  │
│  Station 3: 興奮    「就快到終點啦！」                      │
│  Final:     戴皇冠  「你掌握咗分數！🏆」                   │
│  Abandoned: 鼓勵    「下次再嚟，Curlboo 等你！」           │
│  Restarted: 歡迎    「歡迎返嚟！繼續探險！」               │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

# APPENDIX E — Document Control

```
Version:       6.0
Author:        OneUp24 Founder
Date:          August 24, 2026
Status:        ACTIVE

Previous versions:
├── v2.0 (early April 2026) — Initial comprehensive plan
├── v3.0 (April 3, 2026) — Added market data, 各單元表現
├── v4.0 (April 9, 2026) — Dev-focused roadmap, diagnostic milestones
├── v5.0 (April 17, 2026) — Full bible with IP, gamification, studio model

v5.1 Changes (from v5.0):
├── 🆕 quest_progress SQL schema added to Part I3 (Future Tables)
├── 🆕 5 progression skills (Timing/Pattern/Intuition/Confidence/Sequence)
│      added to Part D2a as design rationale
├── 🆕 Curlboo per-station Quest reactions added to Part B2b
├── 🆕 Data multiplication insight (2-3x per Quest) added to Part D2e
├── 🆕 D2 upgrade details with Topic Quest added to Part D4
├── 🆕 Specific paywall copy for Topic Quest gate added to Part D2f
├── 🆕 Founding philosophy quote added to Part A2
├── [added] Topic Quest as viral loop #3 added to Part H3
├── [added] Topic Quest KPIs added to Part L1
├── [added] Decision filter #5 ("journey vs save file") added to Appendix B
├── [added] Principle #11 ("Ability is a journey") added to Appendix A
├── [updated] Paywall gates updated from 3 to 4 (Principle #4, Part D5, Appendix D)
├── [updated] Curlboo state engine expanded with Quest-specific states
├── [updated] Claude Code notes expanded with full Topic Quest build instructions
├── [updated] Phase 4B milestone updated to include Topic Quest
└── [added] Product name etymology note added to Part D1

v5.0 Changes (from v4):
├── Brand architecture (Studio model, not single app)
├── IP universe expanded (Fluffy Bunny, Curlboo State System)
├── Gamification system (Dark Souls philosophy, Daily Challenge,
│      Stardust, Curlboo Shop — designed, ships Phase 4B)
├── Topic Quest system (learning curve replay, Pro paywall feature)
├── 8 known generator bugs cataloged with fix plan
├── Gamification placement strategy (4 phases, investment %)
├── 51Talk competitive analysis → real competitor = private tutors
├── FoodSwipe fit assessment (doesn't fit education AI, keep frozen)
├── Future product portfolio (English, STEM, Parent-Child)
├── Website strategy (Studio Hub, not product landing page)
├── Claude Code integration notes (Appendix D)
├── [updated] Status updated to April 17 (Vercel deployed, IG accounts live)
├── [updated] Weekly parent email + viral share moved Phase 6 → Phase 5
├── [updated] Competitive positioning reframed (vs tutors, not apps)
└── [updated] Decision framework v5 (added "Would a tutor do this?" filter)

v5.1 → v5.2 Changes (April 9, 2026 sync with Master_Plan_v4.md):
├── [done] Phase 3B: PostHog marked done (12 events live, dual-destination)
├── [done] I1 Stack: PostHog listed as live
├── [done] 3C: future_tables.md marked complete
└── [done] I3: Full schemas updated — RLS, indexes, JSONB examples, quest analytics events,
          bilingual topic_map (topic_name_zh + topic_name_en + unlocks),
          knowledge_gaps with gap_severity + quest_id,
          quest_progress with attempts field in step_results

Next Review:  Weekly (or after any gate is passed)
Repository:   docs/MASTER_PLAN.md (strategy) + docs/STATUS.md (status) — single source of truth
```

## v6.0 Changelog (August 24, 2026)

Applied edits from docs/prompts/v6_regen.md Stage 2. Verified against codebase by Stage 1 audit (docs/AUDIT_v6.md).

**GROUP A — Structural**
- HOW TO USE: D0-D3 = epic labels (not phases); Phase 1-6 = only scheduling authority; removed "They are SEPARATE" line; added STATUS.md pointer
- D3: replaced Current Build Status status tables with strategic phase descriptions (3A, 3B, 3C, Gate 0, 3D, 3E)
- Gate 0: inserted before Phase 3D with deliverables and gate condition
- Phase 3E: inserted between 3D and Phase 4 with PMF gate (3 parents paid HKD 388)
- D4: D-items updated to epic label format with Phase assignments
- D5: Phase 4 execution order added (4B-lite → 4C → 4A); Phase 4C added
- PART K2: consolidated Gate table added (6 gates, conditions, consequences)
- All status markers (checkmarks/warnings/boxes/rotate) removed (grep -c = 0)
- Stale values corrected: 329 generators, oneup24/maths-up repo, 98 commits

**GROUP B — Data Moat**
- I3: responses table schema (Gate 0) with explanation of data gap vs exam_sessions
- I3: 8-feature blocked table (features that cannot ship without responses)
- D7: time_spent_ms diagnostic matrix (fast/slow × correct/wrong)
- I6 (formerly I5): Guest Mode Data Policy

**GROUP C — Correctness and Risk**
- D6: quarantine strategy (audit-generators.js, 6 invariants, quarantined status, rationale)
- Phase 4B: AI-emits-templates architecture (AI outputs templates with slots/constraints/answer_expr; Layer 1 fills params and computes answer; AI never asserts a numeric answer)
- D8: content coverage analysis (2.8 q/bucket → exhaustion; template fix)
- D9: past-paper copyright policy (safe: structure; never: wording; CI enforcement)

**GROUP D — Content Layer**
- I3 topic_map schema: added quest_station_name_zh column; topicId alignment rule; dual-rendering comment
- I5: content/ CSV layer (full directory, 3 hard rules, CI assertions)
- D10: actionable parent report standard with data requirements
- D10: grade-label decision documented (child = station name; parent = topic with grade)

**GROUP E — Money and Focus**
- G2: infra break-even corrected (8-12 subscribers, not 53); CAC/LTV labeled ASSUMPTION
- Phase 5: Stripe web only until 20 paying users; RevenueCat/IAP deferred
- App store cut rationale corrected (15% Small Business Program, not 30%)
- Part F: Studio Hub tension with Principle #10 documented; founder decision to keep Coming Soon cards recorded
- I1: appId immutability warning added

**GROUP F — Engineering Hygiene**
- Header: v6.0, August 24 2026, STATUS.md pointer
- L1: per-question KPIs added
- NEXT 5 ACTIONS: replaced with current-state actions (doc consolidation → audit → responses → WhatsApp → HKD 388 ask)

**Corrections from Stage 1 Audit**
- Generator count: 329 (not 217 or 600+)
- Repo name: oneup24/maths-up (not maths-exam)
- PostHog events: 18 (not 12); quiz_start/quiz_complete (not exam_start/exam_complete)
- Exam targets: 10/20/35 (not 12/15/24)
- Section ratios: mc:15%, fill:20%, calc:20%, short:15%, work:30% (not v4 values)
- Difficulty labels: 基礎鞏固/呈分實戰/奧數拔尖 (not Basic/Standard/Challenge)
- Google OAuth: not in codebase; README incorrect

---

## 🎯 YOUR IMMEDIATE NEXT 5 ACTIONS

```
┌────────────────────────────────────────────────────────────┐
│  1. Doc consolidation (this task — MASTER_PLAN.md,         │
│     STATUS.md, DECISIONS.md)                               │
│     → Single source of truth before any agent reads plan   │
│                                                            │
│  2. Generator audit + quarantine                           │
│     → scripts/audit-generators.js, quarantine violators   │
│     → Gate 0 condition: 0 violations in buildExam path     │
│                                                            │
│  3. responses table migration + write path in api.js       │
│     → Every answered question must write a row             │
│     → 8 features are blocked until this exists             │
│                                                            │
│  4. Send the 40 WhatsApp messages NOW                      │
│     → Calendar time — cannot be compressed                 │
│     → 4/10 families recruited so far — need 6 more        │
│                                                            │
│  5. At the END of soft launch: ask 3 families for HKD 388  │
│     → This is the PMF gate for Phase 3E                    │
│     → If none pay → fix the report, not build mobile      │
│                                                            │
│  DO NOT DO (until Gate 4C → 4A passes):                   │
│  • Studio Hub engineering / new product code               │
│  • Pitch deck                                              │
│  • IAP / RevenueCat                                        │
│  • Stardust / Curlboo Shop                                 │
│  • android/ or ios/ code changes                          │
│  (Coming Soon cards on oneup24.com = OK — no code)        │
└────────────────────────────────────────────────────────────┘
```

---

# APPENDIX F — Content Authoring Reference

## F1. ID Naming Conventions

All IDs in `content/*.csv` are permanent. Once a row is live in production its ID must never be changed or reused — a renamed ID breaks any `responses` row that referenced it.

| File | ID column | Convention | Example |
|------|-----------|-----------|---------|
| topic_map.csv | `topic_id` | `p{grade}_{slug}` | `p3_fractions_equiv` |
| skills.csv | `skill_id` | `{topic_id}_{action}` | `p3_fractions_equiv_identify` |
| traps.csv | `trap_id` | `{topic_id}_trap_{n}` | `p4_fractions_add_unlike_trap_1` |
| misconceptions.csv | `misconception_code` | `{action}_{what}` | `add_denominators` |
| item_templates.csv | `template_id` | `{topic_id}_t{n}` | `p4_fractions_add_unlike_t1` |
| contexts.csv | `context_id` | `ctx_{slug}` | `ctx_fruit_sharing` |
| blueprints.csv | `blueprint_id` | `bp_{grade}_{slug}` | `bp_4_mixed_standard` |
| blueprint_sections.csv | `section_id` | `{blueprint_id}_s{n}` | `bp_4_mixed_standard_s1` |

## F2. Google Sheets Export Procedure

Excel corrupts Traditional Chinese characters by default. Use Google Sheets exclusively.

1. Author content in Google Sheets
2. **File → Download → Comma Separated Values (.csv)**
3. Verify encoding: `file -i content/topic_map.csv` should show `charset=utf-8`
4. Verify no BOM: `xxd content/topic_map.csv | head -1` should NOT start with `efbbbf`
5. If BOM is present: `sed -i 's/\xEF\xBB\xBF//' content/file.csv`
6. Commit to `content/` and run `npm run content:check` before pushing

## F3. Adding a New Topic Chain (Checklist)

When adding a new prerequisite chain to `topic_map.csv`:

- [ ] Each `topic_id` follows F1 conventions and does not collide with existing IDs
- [ ] `quest_station_name_zh` contains no grade label (child sees this — no "P1", "P2")
- [ ] `prereq_topic_ids` forms a DAG (no cycles — CI check #2 catches violations)
- [ ] At least one row per grade level represented in the chain
- [ ] Corresponding `skills.csv` rows added for first 3 topics only (§I5 scope limit)
- [ ] At least 25 rows in `misconceptions.csv` total before adding new traps
- [ ] Every `traps.csv` row references an existing `misconception_code`
- [ ] Run `npm run content:check` — zero errors before committing

