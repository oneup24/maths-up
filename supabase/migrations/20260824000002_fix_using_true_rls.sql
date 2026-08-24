-- Gate 0: replace USING(true) / WITH CHECK(true) policies — forbidden per Agent Rules
-- setup.sql:3 — questions public read
-- setup.sql:8 — user_errors INSERT

-- questions: restrict to authenticated users only (curriculum data, not anonymous)
DROP POLICY IF EXISTS "Anyone can read questions" ON public.questions;
CREATE POLICY "Authenticated users can read questions"
  ON public.questions FOR SELECT
  USING (auth.role() = 'authenticated');

-- user_errors: restrict inserts to authenticated users; anonymous error reports disallowed
DROP POLICY IF EXISTS "Anyone can insert errors" ON public.user_errors;
CREATE POLICY "Authenticated users can insert errors"
  ON public.user_errors FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
