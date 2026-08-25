# v6 Stage 2 — Progress Checklist
Approved: 2026-08-24
Founder answers: Q4 unsure · Q5 unsure · Q6 4/10 · Q7 com.oneup24.mathsup/Maths-Up · Q8 keep · Q9 consolidate→@oneup24game · Q10 Fractions P1→P4

- [x] 1.  cp baseline + commit
- [x] 2.  GROUP A (structural: doc split, Gate 0, Phase 3E, Phase 4 order, gate table)
- [x] 3.  GROUP B (responses table, blocked-features table, time matrix, guest policy)
- [x] 4.  GROUP C (generator quarantine, AI-emits-template, coverage math, copyright)
- [x] 5.  GROUP D (content CSV layer, topic_map, grade-label fix, trap merge, report standard)
- [x] 6.  GROUP E (Stripe-only, break-even, CAC assumption, Studio Hub, appId)
- [x] 7.  GROUP F edits inside MASTER_PLAN.md (KPIs, 3D questions, next-5-actions)
- [x] 8.  Appendix E — v6.0 changelog listing every applied edit
- [x] 9.  STATUS.md
- [x] 10. DECISIONS.md
- [x] 11. CLAUDE.md append (F5)
- [x] 12. Archive move + banners + final acceptance check (§7)

GROUP G — Architecture doctrine (Gate 0 · ~1.5 days)
  [x] G0. Strip chat residue from MASTER_PLAN.md; fix Appendix E header to
          v6.0/Aug 24; fix A5 (98 commits, maths-up); fix Appendix D repo URL;
          rename "PART K2 — PHASE GATES" → "PART M — PHASE GATES";
          delete the "Save as MASTER_PLAN_v5.md" line
  [x] G1. Insert §I0 (doctrine, layers, module map, legacy absorption, scope)
          ✓ §I0 replaced verbatim with patching spec: I0a one-rule doctrine /
            I0b determinism contract / I0c six-layers table / I0d module map /
            I0e legacy absorption / I0f scope discipline.
  [x] G2. Insert §I0g (ID convention) + create content/ID_REGISTRY.json
          ✓ §I0g replaced verbatim: P{grade}.{STRAND}.{TOPIC}.{SKILL} format,
            strand codes, three frozen rules, ID_REGISTRY.json enforcement.
          ✓ content/ID_REGISTRY.json exists.
  [x] G3. Replace §I5 with full column specs (I5a–I5h)
          ✓ §I5 replaced verbatim: I5a founder workflow / I5b DSL conventions /
            I5c skills / I5d unified items / I5e contexts / I5f blueprints /
            I5g misconceptions / I5h topic_map extension.
  [x] G4. Insert §I7 (assembly pipeline + matched_trap + facade migration)
          ✓ §I7 replaced verbatim: four stages SELECT/REALIZE/RENDER/MARK,
            matched_trap detection algorithm, facade migration pattern,
            selector hard rule (throws on under-fill).
  [x] G5. Insert §I8 (exam_sessions additive columns) + migration SQL
          ✓ supabase/migrations/20260825000001_extend_exam_and_responses.sql.
          ✓ §I8 column reference table present (accepted as-is).
  [x] G6. Insert §I9 (CI) + §I10 (agent rules)
          ✓ §I9 replaced verbatim: 12 assertions + test:golden + Chinese error
            message example. §I10 replaced verbatim: May/Must/Never structure +
            zero-code recipe for adding a new topic.
  [x] G7. Append to §I4 (no LLM at runtime + README claim fix)
          ✓ Two paragraphs appended verbatim after §I4 code block.
  [x] G8. Gate 0 list +5 items; Gate 0 condition + CI green
          ✓ +5 items appended to Gate 0 bullet list in §D3.
          ✓ Gate 0 condition updated in §D3 + PART M gate table.
  [x] G9. Appendix A +3 principles; Appendix B filter #7; PART J +2 risks;
          new Appendix F
          ✓ Principles 12/13/14 added to Appendix A.
          ✓ Filter #7 (CONTENT or CODE?) added to Appendix B.
          ✓ Risks 10 (architecture drift) + 11 (ID rename) added to PART J.
          ✓ Appendix F replaced with "The Founder's Five Commands" table.
  [x] G10. scripts/import-legacy-generators.js → items.csv (329 rows)
          ✓ 397 generators registered (291 live, 106 quarantined).
  [ ] G11. arch:check (5 greps) + content:check v0 (#1,2,9,10,11) + CI wiring
          ✓ scripts/arch-check.js — all 5 rules pass.
          ✓ scripts/content-check.js — UTF-8/BOM (#10), items.csv header
            (partial #1), ID_REGISTRY.json JSON (#11 partial).
          ✗ Assertions #2 (FK refs) and #9 (license) not in v0.
          ✗ CI wiring not done (.github/workflows/ doesn't exist).

GROUP H — P4 Fractions vertical slice (Phase 3E)
  [ ] H1. skills.csv — P4 fractions chain only (~8 rows)
  [ ] H2. items.csv — 3–5 real templates, answer_expr + ≥2 distractors each
  [ ] H3. contexts.csv — 15 rows with plausible_min/max
  [ ] H4. misconceptions.csv — ~25 rows, parent_advice_zh + remediation_skill_id
  [ ] H5. engine/core/mark.js — matched_trap detection (§I7)
  [ ] H6. scripts/paper-preview.js — PDF out
  [ ] H7. content:check assertions #3–8, #12
  [ ] H8. Parent report renders D10's required sentence from real data

GROUP I — Pipeline split (Phase 4B, only after Gate 3E → 4)
  [ ] I1. REALIZE extracted; test:golden identical
  [ ] I2. SELECT extracted; coverage-floor throw
  [ ] I3. blueprints.csv + blueprint_sections.csv + use_weak_topics
  [ ] I4. AI-emits-templates → items.csv authoring loop