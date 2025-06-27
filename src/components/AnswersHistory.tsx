import React, { useState } from 'react';
import { Answer } from '../types';
import { BookOpen, Calendar, Search, Trash2, Edit3 } from 'lucide-react';

interface AnswersHistoryProps {
  answers: Answer[];
  onDeleteAnswer: (answerId: string) => Promise<void>;
  onClose: () => void;
}

export const AnswersHistory: React.FC<AnswersHistoryProps> = ({
  answers,
  onDeleteAnswer,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const categories = ['all', ...new Set(answers.map(a => a.category).filter(Boolean))];
  
  const filteredAnswers = answers.filter(answer => {
    const matchesSearch = answer.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         answer.answer_text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || answer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (answerId: string) => {
    if (!confirm('Are you sure you want to delete this answer?')) return;
    
    setIsDeleting(answerId);
    try {
      await onDeleteAnswer(answerId);
    } catch (error) {
      console.error('Failed to delete answer:', error);
    } finally {
      setIsDeleting(null);
    }
  };

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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Your Answers</h2>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {answers.length} {answers.length === 1 ? 'answer' : 'answers'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl text-gray-500">×</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions or answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="all">All Categories</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>
                  {getCategoryName(category)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Answers List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {filteredAnswers.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No answers match your search criteria' 
                  : 'No answers yet. Start answering questions to see them here!'}
              </p>
            </div>
          ) : (
            filteredAnswers.map((answer) => (
              <div key={answer.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Question */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`bg-gradient-to-r ${getCategoryColor(answer.category || '')} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                        {getCategoryName(answer.category || '')}
                      </span>
                      <span className="text-sm text-gray-500">Question #{answer.question_id}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 leading-relaxed">
                      {answer.question_text}
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(answer.id)}
                    disabled={isDeleting === answer.id}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    {isDeleting === answer.id ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Answer */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {answer.answer_text}
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(answer.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    {answer.updated_at !== answer.created_at && (
                      <div className="flex items-center space-x-1">
                        <Edit3 className="w-4 h-4" />
                        <span>
                          Updated {new Date(answer.updated_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-xs">
                    {answer.answer_text.length} characters
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};