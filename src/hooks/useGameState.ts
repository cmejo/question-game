import { useState, useCallback } from 'react';
import { Question, GameState } from '../types';
import { questions as initialQuestions } from '../data/questions';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentIndex: 0,
    questions: initialQuestions,
    isShuffled: false,
    totalQuestions: initialQuestions.length,
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const getFilteredQuestions = useCallback((categories: string[]) => {
    if (categories.length === 0) {
      return initialQuestions;
    }
    return initialQuestions.filter(question => 
      categories.includes(question.category || '')
    );
  }, []);

  const nextQuestion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.questions.length,
    }));
  }, []);

  const previousQuestion = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.questions.length - 1 : prev.currentIndex - 1,
    }));
  }, []);

  const shuffleDeck = useCallback(() => {
    const shuffled = [...gameState.questions].sort(() => Math.random() - 0.5);
    setGameState(prev => ({
      ...prev,
      questions: shuffled,
      currentIndex: 0,
      isShuffled: !prev.isShuffled,
    }));
  }, [gameState.questions]);

  const resetDeck = useCallback(() => {
    const filteredQuestions = getFilteredQuestions(selectedCategories);
    setGameState({
      currentIndex: 0,
      questions: filteredQuestions,
      isShuffled: false,
      totalQuestions: filteredQuestions.length,
    });
  }, [selectedCategories, getFilteredQuestions]);

  const applyCategories = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    const filteredQuestions = getFilteredQuestions(categories);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    
    setGameState({
      currentIndex: 0,
      questions: shuffled,
      isShuffled: true,
      totalQuestions: shuffled.length,
    });
  }, [getFilteredQuestions]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < gameState.questions.length) {
      setGameState(prev => ({
        ...prev,
        currentIndex: index,
      }));
    }
  }, [gameState.questions.length]);

  return {
    gameState,
    selectedCategories,
    currentQuestion: gameState.questions[gameState.currentIndex],
    nextQuestion,
    previousQuestion,
    shuffleDeck,
    resetDeck,
    applyCategories,
    goToQuestion,
  };
};