'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Presentation, Download, Loader2, Lock, CheckCircle, Settings } from 'lucide-react'
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
          userId,
          projectId: generatedContent?.projectId
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content')
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
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              AI Project Generator
            </h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Transform your project ideas into professional abstracts, comprehensive reports, and stunning presentations with AI-powered precision
            </p>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Academic Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Export Ready</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-t-xl">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <span>Project Details</span>
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Provide comprehensive project information for AI-powered content generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Intelligent E-commerce Platform with AI-Powered Recommendation System"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500">Be specific and descriptive for better results</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-sm font-semibold text-gray-700">Domain/Field</Label>
                  <Input
                    id="domain"
                    placeholder="e.g., Web Development, Machine Learning, IoT, Data Science"
                    value={formData.domain}
                    onChange={(e) => handleInputChange('domain', e.target.value)}
                    className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500">Specify the academic or professional domain</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="technologies" className="text-sm font-semibold text-gray-700">Technologies & Tools</Label>
                  <Input
                    id="technologies"
                    placeholder="e.g., React, Node.js, MongoDB, Python, TensorFlow, AWS"
                    value={formData.technologies}
                    onChange={(e) => handleInputChange('technologies', e.target.value)}
                    className="h-12 text-base border-2 focus:border-blue-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500">List all technologies, frameworks, and tools used</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generation Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Content Generation</h3>
              <p className="text-gray-600">Choose the type of content you want to generate</p>
            </div>
            
            {/* Abstract - Free */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-xl">Project Abstract</h4>
                      <p className="text-sm text-gray-600">Professional 150-200 word abstract</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Academic Quality</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200 text-sm font-semibold px-3 py-1">Free</Badge>
                </div>
                <Button 
                  onClick={() => generateContent('abstract')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold h-14 shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Abstract...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Generate Abstract
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Report - Pro */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-xl">Comprehensive Report</h4>
                      <p className="text-sm text-gray-600">Complete project report with all academic sections</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-blue-600 font-medium">7+ Sections</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm font-semibold px-3 py-1">Pro</Badge>
                  </div>
                </div>
                <Button 
                  onClick={() => generateContent('report')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold h-14 shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-5 w-5" />
                      Generate Full Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* PPT - Pro */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Presentation className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-xl">Presentation Slides</h4>
                      <p className="text-sm text-gray-600">Professional PowerPoint presentation with 6+ slides</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-xs text-purple-600 font-medium">Ready to Present</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-sm font-semibold px-3 py-1">Pro</Badge>
                  </div>
                </div>
                <Button 
                  onClick={() => generateContent('ppt')}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold h-14 shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Slides...
                    </>
                  ) : (
                    <>
                      <Presentation className="mr-2 h-5 w-5" />
                      Generate PPT Slides
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Generated Content */}
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl">
              <CardHeader className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        Generated {generatedContent.type.charAt(0).toUpperCase() + generatedContent.type.slice(1)}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        AI-generated content ready for your project
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadContent('txt')}
                      className="flex items-center space-x-2 border-2 hover:bg-gray-50"
                    >
                      <Download className="h-4 w-4" />
                      <span>TXT</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => downloadContent('pdf')}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Download className="h-4 w-4" />
                      <span>PDF</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAdvancedExport(true)}
                      className="flex items-center space-x-2 border-2 border-purple-300 hover:bg-purple-50"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Advanced</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 max-h-96 overflow-y-auto border border-gray-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
                    {generatedContent.type === 'ppt' 
                      ? generatedContent.slides?.map((slide, index) => 
                          `Slide ${index + 1}: ${slide.title}\n${slide.content}\n\n`
                        ).join('')
                      : generatedContent.content
                    }
                  </pre>
                </div>
                
                {/* Content Stats */}
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>AI Generated</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Academic Quality</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Generated on {new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

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