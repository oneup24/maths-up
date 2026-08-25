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
          ✓ All done. Appendix D repo URL fixed 2026-08-25.
  [ ] G1. Insert §I0 (doctrine, layers, module map, legacy absorption, scope)
          ⚠ §I0 inserted but content is accountability standards (I0a–I0g),
            NOT the patching spec: one-rule doctrine / determinism contract /
            six-layers table / module map / legacy absorption / scope discipline.
            Needs to be replaced with patching doc content.
  [ ] G2. Insert §I0g (ID convention) + create content/ID_REGISTRY.json
          ✓ content/ID_REGISTRY.json created.
          ⚠ §I0g currently contains data integrity rules, not the ID naming
            convention (P{grade}.{STRAND}.{TOPIC}.{SKILL} format + strand codes).
            Depends on G1 being redone.
  [ ] G3. Replace §I5 with full column specs (I5a–I5h)
          ⚠ §I5 replaced with column tables; structure doesn't follow I5a–I5h
            labels. Missing: I5a founder's workflow, I5b flattening DSL
            conventions, unified items.csv columns (legacy_fn, grade_min/max,
            distractors DSL, answer_accept, unit_zh, answer_type).
  [ ] G4. Insert §I7 (assembly pipeline + matched_trap + facade migration)
          ⚠ §I7 inserted as a pipeline flowchart; missing: four pure stages
            (SELECT/REALIZE/RENDER/MARK), matched_trap detection algorithm,
            test:golden migration safety mechanism.
  [x] G5. Insert §I8 (exam_sessions additive columns) + migration SQL
          ✓ supabase/migrations/20260825000001_extend_exam_and_responses.sql
            adds all 5 columns + responses.child_id.
          ✓ §I8 inserted as column reference table.
          ⚠ §I8 missing rationale: WHY both seed + paper_json; WHY child_id
            at Gate 0 not Phase 4A (HK norm: 2 children/household; non-backfillable).
  [ ] G6. Insert §I9 (CI) + §I10 (agent rules)
          ⚠ §I9 + §I10 inserted but content differs from patching spec.
            §I9: 11 checks (needs 12) + missing test:golden + error message
            example. §I10: 10 numbered rules (needs May/Must/Never structure +
            zero-code recipe for adding a new topic).
  [ ] G7. Append to §I4 (no LLM at runtime + README claim fix)
          ✗ Not done. §I4 ends at the cost table; patching doc appends:
            "Runtime is deterministic. There is no LLM at runtime — ever." +
            marketing note about README "AI-powered" claim.
  [ ] G8. Gate 0 list +5 items; Gate 0 condition + CI green
          ⚠ +5 items added to STATUS.md only. MASTER_PLAN §Gate 0 bullet list
            not updated. Gate 0 condition line missing "+ arch:check and
            content:check green in CI".
  [ ] G9. Appendix A +3 principles; Appendix B filter #7; PART J +2 risks;
          new Appendix F
          ✗ Principles 12/13/14 not added to Appendix A.
          ✗ Filter #7 (CONTENT or CODE?) not added to Appendix B.
          ✗ Risks 10 (architecture drift) + 11 (ID rename) not added to PART J.
          ⚠ Appendix F added but as "Content Authoring Reference" (ID naming
            + Google Sheets), not "The Founder's Five Commands" table.
  [x] G10. scripts/import-legacy-generators.js → items.csv (329 rows)
          ✓ scripts/import-legacy-generators.js created. content/items.csv
            generated: 397 generators (291 live, 106 quarantined).
            (397 is the real count; 329 in the patching doc was stale.)
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