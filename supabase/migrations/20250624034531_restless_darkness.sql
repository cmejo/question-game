/*
  # Create answers table for storing user responses

  1. New Tables
    - `answers`
      - `id` (uuid, primary key)
      - `question_id` (integer, references question ID)
      - `question_text` (text, stores the question for reference)
      - `answer_text` (text, stores user's answer)
      - `category` (text, question category)
      - `user_session` (text, identifies user session)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `answers` table
    - Add policy for users to read/write their own answers based on session
*/

CREATE TABLE IF NOT EXISTS answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id integer NOT NULL,
  question_text text NOT NULL,
  answer_text text NOT NULL,
  category text,
  user_session text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own answers
CREATE POLICY "Users can read own answers"
  ON answers
  FOR SELECT
  USING (user_session = current_setting('request.jwt.claims', true)::json->>'user_session' OR user_session = current_setting('app.user_session', true));

-- Policy to allow users to insert their own answers
CREATE POLICY "Users can insert own answers"
  ON answers
  FOR INSERT
  WITH CHECK (user_session = current_setting('app.user_session', true));

-- Policy to allow users to update their own answers
CREATE POLICY "Users can update own answers"
  ON answers
  FOR UPDATE
  USING (user_session = current_setting('app.user_session', true))
  WITH CHECK (user_session = current_setting('app.user_session', true));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_answers_user_session ON answers(user_session);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);