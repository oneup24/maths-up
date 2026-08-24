-- Document exam_sessions RLS — policy was applied via Supabase dashboard;
-- this migration makes it version-controlled so it can be reproduced.
-- Running this against a database that already has the policy is safe:
-- DROP POLICY IF EXISTS ... prevents duplicate errors.

ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users own their sessions" ON public.exam_sessions;
CREATE POLICY "Users own their sessions"
  ON public.exam_sessions
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
