import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Mic, 
  Users, 
  Lock, 
  Sparkles, 
  Zap, 
  Award,
  TrendingUp,
  Target,
  Star,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  GraduationCap,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Brain,
  Clock,
  Trophy,
  BookOpen
} from 'lucide-react';

interface VivaTabProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

const VivaTab: React.FC<VivaTabProps> = ({ onUpgrade }) => {
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const vivaFeatures = [
    {
      icon: MessageCircle,
      title: "Viva Questions",
      description: "Domain-specific questions with detailed answers",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "HR Interview Prep",
      description: "Behavioral and situational questions",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Technical Interviews",
      description: "Coding, problem-solving, and technical concepts",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Mic,
      title: "Elevator Pitch",
      description: "Compelling 30-second self-introductions",
      color: "from-orange-500 to-red-500"
    }
  ];

  const categories = [
    { id: 'technical', name: 'Technical Viva', icon: Brain, count: '150+ Questions' },
    { id: 'hr', name: 'HR Interview', icon: Users, count: '80+ Questions' },
    { id: 'academic', name: 'Academic Defense', icon: GraduationCap, count: '120+ Questions' },
    { id: 'industry', name: 'Industry Specific', icon: Briefcase, count: '200+ Questions' }
  ];

  const sampleQuestions = [
    {
      category: 'Technical',
      question: 'Explain the concept of machine learning and its applications in real-world scenarios.',
      difficulty: 'Medium',
      type: 'Conceptual'
    },
    {
      category: 'HR',
      question: 'Tell me about a time when you had to work under pressure to meet a deadline.',
      difficulty: 'Easy',
      type: 'Behavioral'
    },
    {
      category: 'Academic',
      question: 'What are the limitations of your research methodology and how would you address them?',
      difficulty: 'Hard',
      type: 'Critical Analysis'
    }
  ];

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
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">Pro Feature</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent mb-6 leading-tight">
            Viva & Interview Prep
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Master your interviews with AI-powered practice questions and professional preparation tools
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
                <Target className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">550+</div>
              <div className="text-white/70 text-sm">Practice Questions</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <Trophy className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">92%</div>
              <div className="text-white/70 text-sm">Success Rate</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">15min</div>
              <div className="text-white/70 text-sm">Daily Practice</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {vivaFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden mb-12"
        >
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Interview Categories
                </h2>
                <p className="text-white/80 text-lg">
                  Comprehensive question banks for every type of interview
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br from-gray-50 to-emerald-50 rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'border-emerald-500 shadow-lg' 
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-4 mb-4 h-32 flex flex-col items-center justify-center">
                    <category.icon className="h-8 w-8 text-emerald-600 mb-2" />
                    <span className="text-xs text-emerald-600 font-medium">{category.count}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                  {selectedCategory === category.id && (
                    <div className="mt-3 flex items-center text-emerald-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sample Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden mb-12"
        >
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Sample Questions
                </h2>
                <p className="text-white/80 text-lg">
                  Preview of the types of questions you'll practice with
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              {sampleQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {question.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 border-green-200' :
                        question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        {question.type}
                      </span>
                    </div>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-900 font-medium">{question.question}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upgrade Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Unlock Interview Prep
                </h2>
                <p className="text-white/80 text-lg">
                  Get access to comprehensive interview preparation tools
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Star className="h-4 w-4" />
                <span>Pro Feature</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Ace Your Interviews?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of students who have successfully passed their viva and interviews with our AI-powered preparation tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">550+ Questions</h4>
                <p className="text-sm text-gray-600">Comprehensive question bank</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Multiple Categories</h4>
                <p className="text-sm text-gray-600">Technical, HR, Academic, Industry</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Practice Mode</h4>
                <p className="text-sm text-gray-600">Simulate real interview conditions</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpgrade('pro')}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg rounded-2xl flex items-center justify-center space-x-3"
            >
              <Lock className="h-6 w-6" />
              <span>Upgrade to Pro - ₹499</span>
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VivaTab;