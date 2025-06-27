import React from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw, BookOpen, Users, Filter } from 'lucide-react';

interface GameControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onReset: () => void;
  onShowHistory: () => void;
  onShowPeopleAnswers: () => void;
  onShowCategoryPicker: () => void;
  isShuffled: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  answersCount: number;
  hasSelectedCategories: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onPrevious,
  onNext,
  onShuffle,
  onReset,
  onShowHistory,
  onShowPeopleAnswers,
  onShowCategoryPicker,
  isShuffled,
  canGoPrevious,
  canGoNext,
  answersCount,
  hasSelectedCategories
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-indigo-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300"></div>
      </button>

      {/* Category Filter Button */}
      <button
        onClick={onShowCategoryPicker}
        className={`group relative flex items-center justify-center w-14 h-14 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
          hasSelectedCategories
            ? 'bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-400 text-white'
            : 'bg-white/80 hover:bg-white border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600'
        }`}
      >
        <Filter className={`w-5 h-5 transition-all duration-200 ${hasSelectedCategories ? 'text-white' : 'group-hover:text-blue-600'}`} />
        <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl transition-all duration-300 ${
          hasSelectedCategories 
            ? 'from-blue-600/0 to-cyan-700/0' 
            : 'from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10'
        }`}></div>
      </button>

      {/* Shuffle Button */}
      <button
        onClick={onShuffle}
        className={`group relative flex items-center justify-center w-14 h-14 backdrop-blur-sm border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
          isShuffled
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-400 text-white'
            : 'bg-white/80 hover:bg-white border-gray-200 hover:border-indigo-300 text-gray-600 hover:text-indigo-600'
        }`}
      >
        <Shuffle className={`w-5 h-5 transition-all duration-200 ${isShuffled ? 'text-white' : 'group-hover:text-indigo-600'}`} />
        <div className={`absolute inset-0 bg-gradient-to-r rounded-2xl transition-all duration-300 ${
          isShuffled 
            ? 'from-indigo-600/0 to-purple-700/0' 
            : 'from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10'
        }`}></div>
      </button>

      {/* History Button */}
      <button
        onClick={onShowHistory}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-emerald-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="relative">
          <BookOpen className="w-5 h-5 text-gray-600 group-hover:text-emerald-600 transition-colors duration-200" />
          {answersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
              {answersCount > 99 ? '99+' : answersCount}
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 rounded-2xl transition-all duration-300"></div>
      </button>

      {/* People Answers Button */}
      <button
        onClick={onShowPeopleAnswers}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-purple-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Users className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors duration-200" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-300"></div>
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-orange-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <RotateCcw className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors duration-200" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 rounded-2xl transition-all duration-300"></div>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="group relative flex items-center justify-center w-14 h-14 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 hover:border-indigo-300 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-indigo-600 transition-colors duration-200" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300"></div>
      </button>
    </div>
  );
};