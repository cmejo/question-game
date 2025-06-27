import React, { useState } from 'react';
import { Filter, X, Check, Shuffle } from 'lucide-react';

interface CategoryPickerProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onClose: () => void;
}

const categories = [
  { id: 'exploration', name: 'Light Exploration', color: 'from-emerald-500 to-teal-600', count: 35 },
  { id: 'insight', name: 'Emotional Insight', color: 'from-amber-500 to-orange-600', count: 37 },
  { id: 'intimacy', name: 'Deep Intimacy', color: 'from-rose-500 to-pink-600', count: 40 },
  { id: 'dreams', name: 'Dreams & Aspirations', color: 'from-purple-500 to-indigo-600', count: 10 },
  { id: 'values', name: 'Values & Morality', color: 'from-blue-500 to-cyan-600', count: 10 },
  { id: 'identity', name: 'Identity & Self-Reflection', color: 'from-green-500 to-emerald-600', count: 10 },
  { id: 'relationships', name: 'Relationships & Connection', color: 'from-pink-500 to-rose-600', count: 10 },
  { id: 'experiences', name: 'Experiences & Memories', color: 'from-orange-500 to-red-600', count: 10 },
  { id: 'fears', name: 'Fears & Vulnerabilities', color: 'from-gray-500 to-slate-600', count: 10 },
  { id: 'legacy', name: 'Future & Legacy', color: 'from-violet-500 to-purple-600', count: 4 },
  { id: 'deep', name: 'Deep Dive', color: 'from-indigo-600 to-purple-700', count: 10 }
];

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedCategories,
  onCategoriesChange,
  onClose
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>(selectedCategories);

  const toggleCategory = (categoryId: string) => {
    setTempSelected(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const selectAll = () => {
    setTempSelected(categories.map(cat => cat.id));
  };

  const selectNone = () => {
    setTempSelected([]);
  };

  const applySelection = () => {
    onCategoriesChange(tempSelected);
    onClose();
  };

  const totalQuestions = categories
    .filter(cat => tempSelected.includes(cat.id))
    .reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Filter className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-800">Choose Categories</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Select the types of questions you'd like to explore
          </p>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={selectAll}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                Select All
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={selectNone}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="text-sm text-gray-600">
              {tempSelected.length} categories • {totalQuestions} questions
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((category) => {
              const isSelected = tempSelected.includes(category.id);
              
              return (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-indigo-300 bg-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`w-4 h-4 bg-gradient-to-r ${category.color} rounded-full`}></div>
                        <h3 className="font-semibold text-gray-800">{category.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {category.count} question{category.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {tempSelected.length === 0 ? (
                <span className="text-amber-600 font-medium">Select at least one category</span>
              ) : (
                <span>Ready to explore {totalQuestions} questions</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applySelection}
                disabled={tempSelected.length === 0}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Shuffle className="w-4 h-4" />
                <span>Apply & Shuffle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};