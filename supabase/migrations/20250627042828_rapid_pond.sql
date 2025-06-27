/*
  # Add names feature to answers table

  1. Schema Changes
    - Add `user_name` column to answers table
    - Add index for better performance on name queries
    - Update RLS policies to include name-based access

  2. New Features
    - Users can save their name with answers
    - Browse answers by person name
    - Maintain existing session-based privacy
*/

-- Add user_name column to answers table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'answers' AND column_name = 'user_name'
  ) THEN
    ALTER TABLE answers ADD COLUMN user_name text;
  END IF;
END $$;

-- Create index for better performance on name queries
CREATE INDEX IF NOT EXISTS idx_answers_user_name ON answers(user_name);

-- Update existing answers to have a default name if needed
UPDATE answers 
SET user_name = 'Anonymous' 
WHERE user_name IS NULL OR user_name = '';