import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  isShuffled: boolean;
  categoryColor: string;
  categoryName: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentIndex, 
  totalQuestions, 
  isShuffled,
  categoryColor,
  categoryName
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-600">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          {categoryName && (
            <span className={`bg-gradient-to-r ${categoryColor} text-white px-3 py-1 rounded-full text-xs font-medium`}>
              {categoryName}
            </span>
          )}
          {isShuffled && (
            <span className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Shuffled
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200/60 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${categoryColor} rounded-full transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center mt-4 space-x-1">
        {Array.from({ length: Math.min(10, totalQuestions) }).map((_, index) => {
          const dotIndex = Math.floor((index * totalQuestions) / 10);
          const isActive = currentIndex >= dotIndex;
          const isCurrent = Math.floor((currentIndex * 10) / totalQuestions) === index;
          
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isCurrent
                  ? `bg-gradient-to-r ${categoryColor} scale-125 shadow-md`
                  : isActive
                  ? `bg-gradient-to-r ${categoryColor} opacity-70`
                  : 'bg-gray-300/50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};