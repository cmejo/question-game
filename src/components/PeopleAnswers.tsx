import React, { useState, useEffect } from 'react';
import { PersonAnswers } from '../types';
import { Users, Calendar, MessageCircle, Search, ChevronDown, ChevronRight } from 'lucide-react';

interface PeopleAnswersProps {
  fetchAllAnswers: () => Promise<PersonAnswers[]>;
  onClose: () => void;
}

export const PeopleAnswers: React.FC<PeopleAnswersProps> = ({
  fetchAllAnswers,
  onClose
}) => {
  const [peopleAnswers, setPeopleAnswers] = useState<PersonAnswers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  useEffect(() => {
    const loadAnswers = async () => {
      try {
        setLoading(true);
        const data = await fetchAllAnswers();
        setPeopleAnswers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load answers');
      } finally {
        setLoading(false);
      }
    };

    loadAnswers();
  }, [fetchAllAnswers]);

  const filteredPeople = peopleAnswers.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.answers.some(answer => 
      answer.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answer.answer_text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Community Answers</h2>
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                {peopleAnswers.length} {peopleAnswers.length === 1 ? 'person' : 'people'}
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

        {/* Search */}
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search people or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-indigo-300 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading answers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredPeople.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {searchTerm 
                  ? 'No answers match your search criteria' 
                  : 'No answers yet. Be the first to share your thoughts!'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPeople.map((person) => (
                <div key={person.name} className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  {/* Person Header */}
                  <button
                    onClick={() => setExpandedPerson(expandedPerson === person.name ? null : person.name)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {person.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-gray-800">{person.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{person.totalAnswers} answer{person.totalAnswers !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Last answered {new Date(person.lastAnswered).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedPerson === person.name ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Person's Answers */}
                  {expandedPerson === person.name && (
                    <div className="border-t border-gray-200 p-6 space-y-6">
                      {person.answers.map((answer) => (
                        <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                          {/* Question */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className={`bg-gradient-to-r ${getCategoryColor(answer.category || '')} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                                  {getCategoryName(answer.category || '')}
                                </span>
                                <span className="text-sm text-gray-500">Question #{answer.question_id}</span>
                              </div>
                              <h4 className="text-lg font-medium text-gray-800 leading-relaxed">
                                {answer.question_text}
                              </h4>
                            </div>
                          </div>

                          {/* Answer */}
                          <div className="bg-white rounded-lg p-4 mb-3">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                              {answer.answer_text}
                            </p>
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {new Date(answer.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <div className="text-xs">
                              {answer.answer_text.length} characters
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};