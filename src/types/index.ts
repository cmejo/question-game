export interface Question {
  id: number;
  text: string;
  category?: string;
}

export interface GameState {
  currentIndex: number;
  questions: Question[];
  isShuffled: boolean;
  totalQuestions: number;
}

export interface Answer {
  id: string;
  question_id: number;
  question_text: string;
  answer_text: string;
  category?: string;
  user_session: string;
  user_name?: string;
  created_at: string;
  updated_at: string;
}

export interface AnswerInput {
  question_id: number;
  question_text: string;
  answer_text: string;
  category?: string;
  user_session: string;
  user_name?: string;
}

export interface PersonAnswers {
  name: string;
  answers: Answer[];
  totalAnswers: number;
  lastAnswered: string;
}