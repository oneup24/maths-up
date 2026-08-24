-- Gate 0: per-question answer record
-- exam_sessions.topic_breakdown stays as a read cache (aggregate).
-- responses is the source of truth for all diagnostic features.
-- 8 features are blocked until this table exists (see MASTER_PLAN.md Part I3).
CREATE TABLE responses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      UUID NOT NULL REFERENCES exam_sessions(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id     UUID,
  generator_id    TEXT,
  topic_id        TEXT NOT NULL,
  q_index         INT NOT NULL,
  is_correct      BOOLEAN NOT NULL,
  raw_answer      TEXT,
  matched_trap    TEXT,
  time_spent_ms   INT,
  attempt_no      INT DEFAULT 1,
  content_version TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE responses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner" ON responses USING (user_id = auth.uid());
CREATE INDEX ON responses (user_id, topic_id, is_correct);
CREATE INDEX ON responses (question_id);
