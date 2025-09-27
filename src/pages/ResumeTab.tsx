import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  Download, 
  Lock, 
  Sparkles, 
  Zap, 
  Award,
  TrendingUp,
  Users,
  Target,
  Star,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Briefcase,
  GraduationCap,
  Link,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface ResumeTabProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

const ResumeTab: React.FC<ResumeTabProps> = ({ onUpgrade }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const resumeFeatures = [
    {
      icon: FileText,
      title: "ATS-Friendly Resume",
      description: "Optimized for Applicant Tracking Systems",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Bullet Point Generator",
      description: "Powerful action verbs and quantified achievements",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Link,
      title: "LinkedIn Summary",
      description: "Professional profile optimization",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Award,
      title: "Cover Letter Builder",
      description: "Personalized cover letters for each application",
      color: "from-orange-500 to-red-500"
    }
  ];

  const templates = [
    { id: 'modern', name: 'Modern Professional', preview: 'Clean, minimalist design' },
    { id: 'executive', name: 'Executive Style', preview: 'Bold, authoritative layout' },
    { id: 'creative', name: 'Creative Portfolio', preview: 'Eye-catching, innovative design' },
    { id: 'academic', name: 'Academic CV', preview: 'Scholarly, publication-focused' }
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
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="font-medium">Pro Feature</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
            Resume & CV Builder
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Create professional, ATS-friendly resumes that get you noticed by top employers
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
                <Briefcase className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-white/70 text-sm">ATS Pass Rate</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">3x</div>
              <div className="text-white/70 text-sm">More Interviews</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-white/70 text-sm">Templates</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resumeFeatures.map((feature, index) => (
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

        {/* Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden mb-12"
        >
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Professional Templates
                </h2>
                <p className="text-white/80 text-lg">
                  Choose from our collection of ATS-optimized resume templates
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                    selectedTemplate === template.id 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4 mb-4 h-32 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.preview}</p>
                  {selectedTemplate === template.id && (
                    <div className="mt-3 flex items-center text-blue-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Upgrade Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-0 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Unlock Resume Builder
                </h2>
                <p className="text-white/80 text-lg">
                  Get access to all professional resume building tools
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
                Ready to Build Your Professional Resume?
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of professionals who have landed their dream jobs with our AI-powered resume builder
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">ATS Optimization</h4>
                <p className="text-sm text-gray-600">Pass through Applicant Tracking Systems</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Multiple Formats</h4>
                <p className="text-sm text-gray-600">PDF, Word, and online versions</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Industry Templates</h4>
                <p className="text-sm text-gray-600">Tailored for your field</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpgrade('pro')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg rounded-2xl flex items-center justify-center space-x-3"
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

export default ResumeTab;