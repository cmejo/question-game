import React, { useState, useEffect } from 'react';
import { Question, Answer } from '../types';
import { Save, Edit3, Check, X } from 'lucide-react';

interface AnswerInputProps {
  question: Question;
  existingAnswer?: Answer;
  onSave: (answerText: string, userName?: string) => Promise<void>;
  categoryColor: string;
  userName: string;
}

export const AnswerInput: React.FC<AnswerInputProps> = ({
  question,
  existingAnswer,
  onSave,
  categoryColor,
  userName
}) => {
  const [answerText, setAnswerText] = useState(existingAnswer?.answer_text || '');
  const [isEditing, setIsEditing] = useState(!existingAnswer);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setAnswerText(existingAnswer?.answer_text || '');
    setIsEditing(!existingAnswer);
  }, [existingAnswer]);

  const handleSave = async () => {
    if (!answerText.trim()) return;

    setIsSaving(true);
    try {
      await onSave(answerText.trim(), userName);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to save answer:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setAnswerText(existingAnswer?.answer_text || '');
    setIsEditing(!existingAnswer);
  };

  if (!isEditing && existingAnswer) {
    return (
      <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>Your Answer</span>
            {existingAnswer.user_name && (
              <span className="text-sm text-gray-500">
                by {existingAnswer.user_name}
              </span>
            )}
          </h3>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {existingAnswer.answer_text}
        </p>
        <div className="mt-3 text-xs text-gray-500">
          {existingAnswer.updated_at !== existingAnswer.created_at ? 'Updated' : 'Answered'} on{' '}
          {new Date(existingAnswer.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Edit3 className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          {existingAnswer ? 'Edit Your Answer' : 'Write Your Answer'}
        </h3>
        {userName && (
          <span className="text-sm text-gray-500">
            as {userName}
          </span>
        )}
      </div>
      
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Share your thoughts, feelings, or experiences..."
        className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
        style={{ 
          focusRingColor: `rgb(${categoryColor.includes('emerald') ? '16 185 129' : categoryColor.includes('amber') ? '245 158 11' : '236 72 153'})` 
        }}
      />
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          {answerText.length} characters
        </div>
        
        <div className="flex items-center space-x-3">
          {existingAnswer && (
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          )}
          
          <button
            onClick={handleSave}
            disabled={!answerText.trim() || isSaving}
            className={`flex items-center space-x-2 px-6 py-2 bg-gradient-to-r ${categoryColor} text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{existingAnswer ? 'Update' : 'Save'} Answer</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {showSuccess && (
        <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded-lg flex items-center space-x-2 text-green-800">
          <Check className="w-4 h-4" />
          <span className="text-sm">Answer saved successfully!</span>
        </div>
      )}
    </div>
  );
};