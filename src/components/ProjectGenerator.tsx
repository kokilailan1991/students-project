'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Presentation, 
  Download, 
  Loader2, 
  Lock, 
  CheckCircle, 
  Settings,
  Sparkles,
  ArrowRight,
  Zap,
  Star,
  Crown,
  Shield,
  Rocket,
  Brain,
  Target,
  Award,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'
import AdvancedExport from '@/components/advanced-export'

interface ProjectGeneratorProps {
  onUpgrade: (tier: 'pro' | 'premium') => void
  userId: string | null
}

interface GeneratedContent {
  type: 'abstract' | 'report' | 'ppt'
  content: string
  slides?: Array<{ title: string; content: string }>
  projectId?: string
}

const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({ onUpgrade, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    technologies: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [showAdvancedExport, setShowAdvancedExport] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateContent = async (type: 'abstract' | 'report' | 'ppt') => {
    if (!formData.title.trim()) {
      toast.error('Please enter a project title')
      return
    }

    if (!userId) {
      toast.error('User not authenticated')
      return
    }

    setIsGenerating(true)
    toast.loading(`Generating ${type}...`, { id: 'generating' })

    try {
      const response = await fetch(`/api/generate/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          domain: formData.domain,
          technologies: formData.technologies,
          userId
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const newContent: GeneratedContent = {
        type,
        content: type === 'ppt' ? '' : data[type] || data.abstract || data.report,
        slides: type === 'ppt' ? data.slides : undefined,
        projectId: data.projectId
      }

      setGeneratedContent(newContent)
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} generated successfully!`, { id: 'generating' })
    } catch (error) {
      console.error('Generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate content', { id: 'generating' })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadContent = (format: 'txt' | 'pdf') => {
    if (!generatedContent) return

    const content = generatedContent.type === 'ppt' 
      ? generatedContent.slides?.map((slide, index) => 
          `Slide ${index + 1}: ${slide.title}\n${slide.content}\n\n`
        ).join('') || ''
      : generatedContent.content || ''

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.title.replace(/\s+/g, '_')}_${generatedContent.type}.${format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success(`Downloaded ${generatedContent.type} as ${format.toUpperCase()}`)
  }

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
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-1" />
              AI-Powered
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
            ProjectPAL
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            AI Project Generator
          </h2>
          
          <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8 leading-relaxed">
            Transform your project ideas into professional abstracts, comprehensive reports, and stunning presentations with AI-powered precision
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center space-x-2 text-white/70">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
              <span className="font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse delay-300"></div>
              <span className="font-medium">Academic Quality</span>
            </div>
            <div className="flex items-center space-x-2 text-white/70">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse delay-700"></div>
              <span className="font-medium">Export Ready</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-white/70 text-sm">Students Helped</div>
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
              <div className="text-white/70 text-sm">Success Rate</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-8 w-8 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">2min</div>
              <div className="text-white/70 text-sm">Average Time</div>
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
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                      Project Details
                    </CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      Provide comprehensive project information for AI-powered content generation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-base font-semibold text-gray-800 flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Project Title *</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Intelligent E-commerce Platform with AI-Powered Recommendation System"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl"
                  />
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span>Be specific and descriptive for better results</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="domain" className="text-base font-semibold text-gray-800 flex items-center space-x-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    <span>Domain/Field</span>
                  </Label>
                  <Input
                    id="domain"
                    placeholder="e.g., Web Development, Machine Learning, IoT, Data Science"
                    value={formData.domain}
                    onChange={(e) => handleInputChange('domain', e.target.value)}
                    className="h-14 text-lg border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 rounded-xl"
                  />
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Specify the academic or professional domain</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="technologies" className="text-base font-semibold text-gray-800 flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-emerald-600" />
                    <span>Technologies & Tools</span>
                  </Label>
                  <Input
                    id="technologies"
                    placeholder="e.g., React, Node.js, MongoDB, Python, TensorFlow, AWS"
                    value={formData.technologies}
                    onChange={(e) => handleInputChange('technologies', e.target.value)}
                    className="h-14 text-lg border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 rounded-xl"
                  />
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>List all technologies, frameworks, and tools used</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generation Options */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-3 flex items-center justify-center space-x-3">
                <Sparkles className="h-8 w-8 text-yellow-400" />
                <span>AI Content Generation</span>
                <Sparkles className="h-8 w-8 text-yellow-400" />
              </h3>
              <p className="text-white/80 text-lg">Choose the type of content you want to generate</p>
            </div>
            
            {/* Abstract - Free */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-2xl mb-2">Project Abstract</h4>
                        <p className="text-gray-600 text-lg mb-3">Professional 150-200 word abstract with academic standards</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-emerald-600 font-medium">Academic Quality</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                            <span className="text-sm text-blue-600 font-medium">150-200 words</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-base font-bold px-4 py-2 shadow-lg">
                      FREE
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => generateContent('abstract')}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg rounded-xl group"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Generating Abstract...
                      </>
                    ) : (
                      <>
                        <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Generate Abstract
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Report - Pro */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                          <Crown className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-2xl mb-2">Comprehensive Report</h4>
                        <p className="text-gray-600 text-lg mb-3">Complete project report with all academic sections and detailed analysis</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-blue-600 font-medium">7+ Sections</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
                            <span className="text-sm text-purple-600 font-medium">Academic Standard</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-base font-bold px-4 py-2 shadow-lg">
                      PRO
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => generateContent('report')}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg rounded-xl group"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Generate Full Report
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* PPT - Pro */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-16 translate-x-16"></div>
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Presentation className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-2xl mb-2">Presentation Slides</h4>
                        <p className="text-gray-600 text-lg mb-3">Professional PowerPoint presentation with 6+ slides and visual elements</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-purple-600 font-medium">6+ Slides</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-300"></div>
                            <span className="text-sm text-pink-600 font-medium">Ready to Present</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-base font-bold px-4 py-2 shadow-lg">
                      PRO
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => generateContent('ppt')}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold h-16 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg rounded-xl group"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                        Generating Slides...
                      </>
                    ) : (
                      <>
                        <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Generate PPT Slides
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Generated Content */}
        <AnimatePresence>
          {generatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-12"
            >
              <Card className="bg-white/95 backdrop-blur-xl border-0 shadow-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-bold text-white mb-2">
                          ✨ Generated {generatedContent.type.charAt(0).toUpperCase() + generatedContent.type.slice(1)}
                        </CardTitle>
                        <p className="text-white/80 text-lg">
                          AI-powered content ready for your project
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => downloadContent('txt')}
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        TXT
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => downloadContent('pdf')}
                        className="bg-white text-blue-600 hover:bg-white/90 shadow-lg"
                      >
                        <Download className="h-5 w-5 mr-2" />
                        PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setShowAdvancedExport(true)}
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                      >
                        <Settings className="h-5 w-5 mr-2" />
                        Advanced
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 max-h-96 overflow-y-auto border border-gray-200 shadow-inner">
                    <pre className="whitespace-pre-wrap text-base text-gray-800 leading-relaxed font-sans">
                      {generatedContent.type === 'ppt' 
                        ? generatedContent.slides?.map((slide, index) => 
                            `Slide ${index + 1}: ${slide.title}\n${slide.content}\n\n`
                          ).join('')
                        : generatedContent.content
                      }
                    </pre>
                  </div>
                  
                  {/* Content Stats */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">AI Generated</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                        <span className="text-sm font-medium text-gray-700">Academic Quality</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                        <span className="text-sm font-medium text-gray-700">Export Ready</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Generated on {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Advanced Export Modal */}
        {showAdvancedExport && generatedContent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Advanced Export Options</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAdvancedExport(false)}
                  >
                    ×
                  </Button>
                </div>
                <AdvancedExport
                  content={generatedContent.content}
                  contentType={generatedContent.type}
                  onExport={(options) => {
                    console.log('Export options:', options)
                    setShowAdvancedExport(false)
                    toast.success('Export completed successfully!')
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectGenerator
