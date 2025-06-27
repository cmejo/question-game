import { useState, useEffect } from 'react';
import { supabase, getUserSession } from '../lib/supabase';
import { Answer, AnswerInput, PersonAnswers } from '../types';

export const useAnswers = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userSession = getUserSession();

  const fetchAnswers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('answers')
        .select('*')
        .eq('user_session', userSession)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnswers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch answers');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAnswers = async (): Promise<PersonAnswers[]> => {
    try {
      const { data, error } = await supabase
        .from('answers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group answers by person name
      const groupedAnswers = (data || []).reduce((acc: Record<string, Answer[]>, answer) => {
        const name = answer.user_name || 'Anonymous';
        if (!acc[name]) {
          acc[name] = [];
        }
        acc[name].push(answer);
        return acc;
      }, {});

      // Convert to PersonAnswers array
      return Object.entries(groupedAnswers).map(([name, answers]) => ({
        name,
        answers,
        totalAnswers: answers.length,
        lastAnswered: answers[0]?.created_at || ''
      })).sort((a, b) => new Date(b.lastAnswered).getTime() - new Date(a.lastAnswered).getTime());
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch all answers');
    }
  };

  const saveAnswer = async (answerData: Omit<AnswerInput, 'user_session'>) => {
    setLoading(true);
    setError(null);

    try {
      // Check if answer already exists for this question
      const { data: existingAnswer } = await supabase
        .from('answers')
        .select('id')
        .eq('user_session', userSession)
        .eq('question_id', answerData.question_id)
        .maybeSingle();

      if (existingAnswer) {
        // Update existing answer
        const { data, error } = await supabase
          .from('answers')
          .update({
            answer_text: answerData.answer_text,
            user_name: answerData.user_name,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingAnswer.id)
          .select()
          .single();

        if (error) throw error;
        
        // Update local state
        setAnswers(prev => prev.map(answer => 
          answer.id === existingAnswer.id ? data : answer
        ));
      } else {
        // Create new answer
        const { data, error } = await supabase
          .from('answers')
          .insert({
            ...answerData,
            user_session: userSession
          })
          .select()
          .single();

        if (error) throw error;
        
        // Update local state
        setAnswers(prev => [data, ...prev]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save answer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAnswerForQuestion = (questionId: number): Answer | undefined => {
    return answers.find(answer => answer.question_id === questionId);
  };

  const deleteAnswer = async (answerId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('id', answerId)
        .eq('user_session', userSession);

      if (error) throw error;
      
      // Update local state
      setAnswers(prev => prev.filter(answer => answer.id !== answerId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete answer');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  return {
    answers,
    loading,
    error,
    saveAnswer,
    getAnswerForQuestion,
    deleteAnswer,
    fetchAllAnswers,
    refetch: fetchAnswers
  };
};