-- Gate 0 completion: extend exam_sessions with session-level context columns,
-- and add child_id to responses for future multi-profile family support.
-- All new columns are nullable — backward compatible with all existing rows.
--
-- child_id is UUID only (no FK yet) because student_profiles is created in Phase 4A.
-- FK: ALTER TABLE ... ADD CONSTRAINT ... FOREIGN KEY (child_id) REFERENCES student_profiles(id)
-- will be added in the Phase 4A migration.

-- exam_sessions additions
ALTER TABLE public.exam_sessions
  ADD COLUMN IF NOT EXISTS child_id        UUID,
  ADD COLUMN IF NOT EXISTS blueprint_id    TEXT,
  ADD COLUMN IF NOT EXISTS seed            BIGINT,
  ADD COLUMN IF NOT EXISTS content_version TEXT,
  ADD COLUMN IF NOT EXISTS paper_json      JSONB;

-- responses addition
ALTER TABLE public.responses
  ADD COLUMN IF NOT EXISTS child_id UUID;

-- Partial indexes — only index non-null rows to keep index small
CREATE INDEX IF NOT EXISTS exam_sessions_child_id_idx
  ON public.exam_sessions (child_id)
  WHERE child_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS responses_child_id_idx
  ON public.responses (child_id)
  WHERE child_id IS NOT NULL;
