import React, { useState } from 'react';
import { User, Check, X } from 'lucide-react';

interface NameInputProps {
  currentName: string;
  onSave: (name: string) => void;
  categoryColor: string;
}

export const NameInput: React.FC<NameInputProps> = ({
  currentName,
  onSave,
  categoryColor
}) => {
  const [isEditing, setIsEditing] = useState(!currentName);
  const [name, setName] = useState(currentName);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (trimmedName) {
      onSave(trimmedName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setName(currentName);
    setIsEditing(false);
  };

  if (!isEditing && currentName) {
    return (
      <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 bg-gradient-to-r ${categoryColor} rounded-full flex items-center justify-center`}>
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Answering as</p>
            <p className="font-semibold text-gray-800">{currentName}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
      <div className="flex items-center space-x-2 mb-3">
        <User className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-800">What's your name?</h3>
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:border-transparent transition-all duration-200 bg-white/80"
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
        
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className={`p-2 bg-gradient-to-r ${categoryColor} text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Check className="w-4 h-4" />
        </button>
        
        {currentName && (
          <button
            onClick={handleCancel}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};