import React, { useState } from 'react';

interface FlashcardsTabProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ onUpgrade }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateFlashcards = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to convert to flashcards');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockCards: Flashcard[] = [
        {
          id: '1',
          question: 'What is the main purpose of this project?',
          answer: 'The main purpose is to create an efficient solution for the given problem.',
          category: category || 'General'
        },
        {
          id: '2',
          question: 'Which technologies are used?',
          answer: 'The project uses modern web technologies and frameworks.',
          category: category || 'General'
        },
        {
          id: '3',
          question: 'What are the key features?',
          answer: 'Key features include user authentication, data management, and reporting.',
          category: category || 'General'
        }
      ];
      
      setFlashcards(prev => [...prev, ...mockCards]);
      setIsGenerating(false);
    }, 2000);
  };

  const deleteFlashcard = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  const exportFlashcards = (format: 'pdf' | 'csv') => {
    if (flashcards.length === 0) {
      alert('No flashcards to export');
      return;
    }

    if (format === 'csv') {
      const csvContent = flashcards.map(card => 
        `${card.question},"${card.answer}",${card.category}`
      ).join('\n');
      
      const blob = new Blob([`Question,Answer,Category\n${csvContent}`], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flashcards.csv';
      a.click();
    } else {
      alert('PDF export coming soon!');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Flashcard Generator</h2>
        <p className="text-gray-600">Convert your notes and text into Q&A flashcards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text/Notes to Convert
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your notes, textbook content, or any text you want to convert to flashcards..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category (Optional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Computer Science, Mathematics, History"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={generateFlashcards}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span className="text-lg">🧠</span>
            <span>{isGenerating ? 'Generating...' : 'Generate Flashcards'}</span>
          </button>
        </div>

        {/* Generated Flashcards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Flashcards ({flashcards.length})
            </h3>
            {flashcards.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={() => exportFlashcards('csv')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center space-x-1"
                >
                  <span>💾</span>
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => exportFlashcards('pdf')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center space-x-1"
                >
                  <span>💾</span>
                  <span>PDF</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {flashcards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {card.category}
                  </span>
                  <button
                    onClick={() => deleteFlashcard(card.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <span className="text-sm">🗑️</span>
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Q:</span>
                    <p className="text-sm text-gray-900">{card.question}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">A:</span>
                    <p className="text-sm text-gray-600">{card.answer}</p>
                  </div>
                </div>
              </div>
            ))}

            {flashcards.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl mb-2 block">🧠</span>
                <p>No flashcards generated yet</p>
                <p className="text-sm">Enter some text and click "Generate Flashcards"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsTab;