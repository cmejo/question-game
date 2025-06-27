import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  isFlipping: boolean;
  categoryColor: string;
  categoryName: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  isFlipping, 
  categoryColor, 
  categoryName 
}) => {
  return (
    <div className={`relative w-full max-w-2xl mx-auto transform-gpu transition-all duration-500 ${
      isFlipping ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
    }`}>
      <div className="relative">
        {/* Card Shadow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor}/20 rounded-2xl blur-xl transform rotate-1 scale-105`}></div>
        
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-white via-gray-50/50 to-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-8 md:p-12 shadow-2xl">
          {/* Category Badge */}
          <div className={`absolute top-4 right-4 bg-gradient-to-r ${categoryColor} text-white px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wide shadow-lg`}>
            {categoryName}
          </div>
          
          {/* Question Number */}
          <div className={`absolute top-4 left-4 bg-gradient-to-r ${categoryColor} text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg`}>
            {question.id}
          </div>
          
          {/* Question Text */}
          <div className="pt-12 pb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-relaxed text-center">
              {question.text}
            </h2>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-2">
              <div className={`w-2 h-2 bg-gradient-to-r ${categoryColor} rounded-full opacity-60`}></div>
              <div className={`w-2 h-2 bg-gradient-to-r ${categoryColor} rounded-full opacity-80`}></div>
              <div className={`w-2 h-2 bg-gradient-to-r ${categoryColor} rounded-full opacity-60`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};