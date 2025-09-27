import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  Download, 
  Trash2, 
  Sparkles, 
  Loader2, 
  Zap, 
  BookOpen,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

interface FlashcardsTabProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
}

const FlashcardsTab: React.FC<FlashcardsTabProps> = ({ onUpgrade }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [inputText, setInputText] = useState('');
  const [category, setCategory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAnswer, setShowAnswer] = useState<{ [key: string]: boolean }>({});

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
          answer: 'The main purpose is to create an efficient solution for the given problem using modern technologies and innovative approaches.',
          category: category || 'General',
          difficulty: 'medium',
          createdAt: new Date()
        },
        {
          id: '2',
          question: 'Which technologies are used in this implementation?',
          answer: 'The project utilizes modern web technologies including React, Node.js, and cloud-based services for scalable deployment.',
          category: category || 'General',
          difficulty: 'easy',
          createdAt: new Date()
        },
        {
          id: '3',
          question: 'What are the key features and benefits?',
          answer: 'Key features include user authentication, real-time data management, advanced reporting capabilities, and responsive design.',
          category: category || 'General',
          difficulty: 'hard',
          createdAt: new Date()
        }
      ];
      
      setFlashcards(prev => [...prev, ...mockCards]);
      setIsGenerating(false);
    }, 2000);
  };

  const deleteFlashcard = (id: string) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
  };

  const toggleAnswer = (id: string) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportFlashcards = (format: 'pdf' | 'csv') => {
    if (flashcards.length === 0) {
      alert('No flashcards to export');
      return;
    }

    if (format === 'csv') {
      const csvContent = flashcards.map(card => 
        `${card.question},"${card.answer}",${card.category},${card.difficulty}`
      ).join('\n');
      
      const blob = new Blob([`Question,Answer,Category,Difficulty\n${csvContent}`], { type: 'text/csv' });
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">AI-Powered</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent mb-6 leading-tight">
            Flashcard Generator
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your notes into interactive study cards with AI-powered precision and professional quality
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <BookOpen className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{flashcards.length}</div>
              <div className="text-white/70 text-sm">Cards Generated</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-white/70 text-sm">Accuracy Rate</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">5x</div>
              <div className="text-white/70 text-sm">Study Efficiency</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Content Input
                    </h2>
                    <p className="text-white/80 text-lg">
                      Paste your notes, textbooks, or any text content
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-800 flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                    <span>Text/Notes to Convert</span>
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your notes, textbook content, lecture transcripts, or any educational material you want to convert into interactive flashcards..."
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 resize-none h-40 text-base"
                  />
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span>AI will automatically generate relevant Q&A pairs</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-base font-semibold text-gray-800 flex items-center space-x-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    <span>Category (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Computer Science, Mathematics, History, Biology"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-base"
                  />
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span>Helps organize and categorize your flashcards</span>
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateFlashcards}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg rounded-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Generating Cards...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-6 w-6" />
                      <span>Generate Flashcards</span>
                      <ChevronRight className="h-6 w-6" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Generated Flashcards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        Generated Cards
                      </h2>
                      <p className="text-white/80 text-lg">
                        {flashcards.length} interactive flashcards ready
                      </p>
                    </div>
                  </div>
                  {flashcards.length > 0 && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => exportFlashcards('csv')}
                        className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                      >
                        <Download className="h-4 w-4" />
                        <span>CSV</span>
                      </button>
                      <button
                        onClick={() => exportFlashcards('pdf')}
                        className="bg-white text-purple-600 hover:bg-white/90 font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg"
                      >
                        <Download className="h-4 w-4" />
                        <span>PDF</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-8 h-full">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {flashcards.map((card, index) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(card.difficulty)}`}>
                              {card.difficulty}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              {card.category}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteFlashcard(card.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              <span className="text-sm font-semibold text-emerald-700">Question</span>
                            </div>
                            <p className="text-gray-900 font-medium">{card.question}</p>
                          </div>
                          
                          <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm font-semibold text-purple-700">Answer</span>
                              </div>
                              <button
                                onClick={() => toggleAnswer(card.id)}
                                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                              >
                                {showAnswer[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                            <motion.div
                              initial={false}
                              animate={{ height: showAnswer[card.id] ? "auto" : "0", opacity: showAnswer[card.id] ? 1 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-700">{card.answer}</p>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {flashcards.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6">
                          <Brain className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">No flashcards yet</h3>
                        <p className="text-gray-600 mb-2">Enter your content and generate your first set of flashcards</p>
                        <p className="text-sm text-gray-500">Perfect for studying, exam prep, and knowledge retention</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsTab;