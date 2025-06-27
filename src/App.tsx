import React, { useState, useEffect } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { GameControls } from './components/GameControls';
import { ProgressBar } from './components/ProgressBar';
import { AnswerInput } from './components/AnswerInput';
import { AnswersHistory } from './components/AnswersHistory';
import { PeopleAnswers } from './components/PeopleAnswers';
import { NameInput } from './components/NameInput';
import { CategoryPicker } from './components/CategoryPicker';
import { useGameState } from './hooks/useGameState';
import { useAnswers } from './hooks/useAnswers';
import { useUserName } from './hooks/useUserName';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

function App() {
  const {
    gameState,
    selectedCategories,
    currentQuestion,
    nextQuestion,
    previousQuestion,
    shuffleDeck,
    resetDeck,
    applyCategories,
  } = useGameState();

  const {
    answers,
    loading: answersLoading,
    error: answersError,
    saveAnswer,
    getAnswerForQuestion,
    deleteAnswer,
    fetchAllAnswers
  } = useAnswers();

  const { userName, saveUserName } = useUserName();

  const [isFlipping, setIsFlipping] = useState(false);
  const [showAnswersHistory, setShowAnswersHistory] = useState(false);
  const [showPeopleAnswers, setShowPeopleAnswers] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const handleNext = () => {
    setIsFlipping(true);
    setTimeout(() => {
      nextQuestion();
      setIsFlipping(false);
    }, 250);
  };

  const handlePrevious = () => {
    setIsFlipping(true);
    setTimeout(() => {
      previousQuestion();
      setIsFlipping(false);
    }, 250);
  };

  const handleShuffle = () => {
    setIsFlipping(true);
    setTimeout(() => {
      shuffleDeck();
      setIsFlipping(false);
    }, 250);
  };

  const handleReset = () => {
    setIsFlipping(true);
    setTimeout(() => {
      resetDeck();
      setIsFlipping(false);
    }, 250);
  };

  const handleCategoriesChange = (categories: string[]) => {
    setIsFlipping(true);
    setTimeout(() => {
      applyCategories(categories);
      setIsFlipping(false);
    }, 250);
  };

  const handleSaveAnswer = async (answerText: string, answerUserName?: string) => {
    if (!currentQuestion) return;

    await saveAnswer({
      question_id: currentQuestion.id,
      question_text: currentQuestion.text,
      answer_text: answerText,
      category: currentQuestion.category,
      user_name: answerUserName || userName
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in textarea or input
      if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLInputElement) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 's' || event.key === 'S') {
        event.preventDefault();
        handleShuffle();
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        handleReset();
      } else if (event.key === 'h' || event.key === 'H') {
        event.preventDefault();
        setShowAnswersHistory(true);
      } else if (event.key === 'p' || event.key === 'P') {
        event.preventDefault();
        setShowPeopleAnswers(true);
      } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault();
        setShowCategoryPicker(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exploration':
        return 'from-emerald-500 to-teal-600';
      case 'insight':
        return 'from-amber-500 to-orange-600';
      case 'intimacy':
        return 'from-rose-500 to-pink-600';
      case 'dreams':
        return 'from-purple-500 to-indigo-600';
      case 'values':
        return 'from-blue-500 to-cyan-600';
      case 'identity':
        return 'from-green-500 to-emerald-600';
      case 'relationships':
        return 'from-pink-500 to-rose-600';
      case 'experiences':
        return 'from-orange-500 to-red-600';
      case 'fears':
        return 'from-gray-500 to-slate-600';
      case 'legacy':
        return 'from-violet-500 to-purple-600';
      case 'deep':
        return 'from-indigo-600 to-purple-700';
      default:
        return 'from-indigo-500 to-purple-600';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'exploration':
        return 'Light Exploration';
      case 'insight':
        return 'Emotional Insight';
      case 'intimacy':
        return 'Deep Intimacy';
      case 'dreams':
        return 'Dreams & Aspirations';
      case 'values':
        return 'Values & Morality';
      case 'identity':
        return 'Identity & Self-Reflection';
      case 'relationships':
        return 'Relationships & Connection';
      case 'experiences':
        return 'Experiences & Memories';
      case 'fears':
        return 'Fears & Vulnerabilities';
      case 'legacy':
        return 'Future & Legacy';
      case 'deep':
        return 'Deep Dive';
      default:
        return category;
    }
  };

  const currentAnswer = currentQuestion ? getAnswerForQuestion(currentQuestion.id) : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-rose-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-300/15 to-purple-300/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-200/10 to-orange-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-8 px-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Heart className="w-8 h-8 text-rose-600" />
              <Sparkles className="w-4 h-4 text-amber-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 via-amber-600 to-indigo-800 bg-clip-text text-transparent">
              Deep Conversation Cards
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>
              {selectedCategories.length > 0 
                ? `${gameState.totalQuestions} filtered questions` 
                : `Journey through ${gameState.totalQuestions} questions across 11 categories`}
            </span>
            {answers.length > 0 && (
              <>
                <span>•</span>
                <button
                  onClick={() => setShowAnswersHistory(true)}
                  className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{answers.length} answer{answers.length !== 1 ? 's' : ''} saved</span>
                </button>
              </>
            )}
          </div>
        </header>

        {/* Progress Bar */}
        <div className="px-4 mb-8">
          <ProgressBar
            currentIndex={gameState.currentIndex}
            totalQuestions={gameState.totalQuestions}
            isShuffled={gameState.isShuffled}
            categoryColor={currentQuestion ? getCategoryColor(currentQuestion.category || '') : ''}
            categoryName={currentQuestion ? getCategoryName(currentQuestion.category || '') : ''}
          />
        </div>

        {/* Question Card */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 mb-8">
          {currentQuestion && (
            <>
              <QuestionCard
                question={currentQuestion}
                isFlipping={isFlipping}
                categoryColor={getCategoryColor(currentQuestion.category || '')}
                categoryName={getCategoryName(currentQuestion.category || '')}
              />
              
              {/* Name Input */}
              <div className="w-full max-w-2xl mb-4">
                <NameInput
                  currentName={userName}
                  onSave={saveUserName}
                  categoryColor={getCategoryColor(currentQuestion.category || '')}
                />
              </div>
              
              {/* Answer Input */}
              <div className="w-full max-w-2xl">
                <AnswerInput
                  question={currentQuestion}
                  existingAnswer={currentAnswer}
                  onSave={handleSaveAnswer}
                  categoryColor={getCategoryColor(currentQuestion.category || '')}
                  userName={userName}
                />
              </div>
            </>
          )}
        </div>

        {/* Game Controls */}
        <div className="px-4 pb-8">
          <GameControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            onShuffle={handleShuffle}
            onReset={handleReset}
            onShowHistory={() => setShowAnswersHistory(true)}
            onShowPeopleAnswers={() => setShowPeopleAnswers(true)}
            onShowCategoryPicker={() => setShowCategoryPicker(true)}
            isShuffled={gameState.isShuffled}
            canGoPrevious={gameState.currentIndex > 0}
            canGoNext={gameState.currentIndex < gameState.totalQuestions - 1}
            answersCount={answers.length}
            hasSelectedCategories={selectedCategories.length > 0}
          />
        </div>

        {/* Keyboard Shortcuts */}
        <div className="text-center pb-6 px-4">
          <div className="text-xs text-gray-500 space-x-4">
            <span>← Previous</span>
            <span>→ / Space Next</span>
            <span>S Shuffle</span>
            <span>R Reset</span>
            <span>H History</span>
            <span>P People</span>
            <span>F Filter</span>
          </div>
        </div>
      </div>

      {/* Category Picker Modal */}
      {showCategoryPicker && (
        <CategoryPicker
          selectedCategories={selectedCategories}
          onCategoriesChange={handleCategoriesChange}
          onClose={() => setShowCategoryPicker(false)}
        />
      )}

      {/* Answers History Modal */}
      {showAnswersHistory && (
        <AnswersHistory
          answers={answers}
          onDeleteAnswer={deleteAnswer}
          onClose={() => setShowAnswersHistory(false)}
        />
      )}

      {/* People Answers Modal */}
      {showPeopleAnswers && (
        <PeopleAnswers
          fetchAllAnswers={fetchAllAnswers}
          onClose={() => setShowPeopleAnswers(false)}
        />
      )}

      {/* Error Display */}
      {answersError && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-200 text-red-800 px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm">{answersError}</p>
        </div>
      )}
    </div>
  );
}

export default App;
