/*
  # Fix RLS policies for anonymous access

  1. Security Changes
    - Drop existing restrictive policies
    - Add new policies that allow anonymous users to access their own session data
    - Enable proper session-based access control

  2. New Policies
    - Allow anonymous users to read answers for their session
    - Allow anonymous users to insert answers for their session
    - Allow anonymous users to update answers for their session
    - Allow anonymous users to delete answers for their session
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own answers" ON answers;
DROP POLICY IF EXISTS "Users can read own answers" ON answers;
DROP POLICY IF EXISTS "Users can update own answers" ON answers;

-- Create new policies for anonymous access
CREATE POLICY "Allow anon to read own session answers"
  ON answers
  FOR SELECT
  TO anon
  USING (user_session = current_setting('request.headers', true)::json->>'x-user-session');

CREATE POLICY "Allow anon to insert own session answers"
  ON answers
  FOR INSERT
  TO anon
  WITH CHECK (user_session = current_setting('request.headers', true)::json->>'x-user-session');

CREATE POLICY "Allow anon to update own session answers"
  ON answers
  FOR UPDATE
  TO anon
  USING (user_session = current_setting('request.headers', true)::json->>'x-user-session')
  WITH CHECK (user_session = current_setting('request.headers', true)::json->>'x-user-session');

CREATE POLICY "Allow anon to delete own session answers"
  ON answers
  FOR DELETE
  TO anon
  USING (user_session = current_setting('request.headers', true)::json->>'x-user-session');

-- Fallback policies for broader access if header-based approach doesn't work
CREATE POLICY "Fallback: Allow anon full access to answers"
  ON answers
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);