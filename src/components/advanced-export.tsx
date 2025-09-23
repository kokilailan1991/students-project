'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  FileText, 
  Presentation, 
  Image, 
  FileSpreadsheet,
  Palette,
  Settings,
  CheckCircle,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface ExportOptions {
  format: 'pdf' | 'docx' | 'pptx' | 'html' | 'csv'
  branding: boolean
  customLogo?: string
  institutionName?: string
  watermark?: boolean
  pageNumbers: boolean
  tableOfContents: boolean
  customStyling: boolean
}

interface AdvancedExportProps {
  content: string
  contentType: 'abstract' | 'report' | 'ppt' | 'flashcards'
  onExport: (options: ExportOptions) => void
}

const AdvancedExport: React.FC<AdvancedExportProps> = ({ content, contentType, onExport }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    branding: false,
    pageNumbers: true,
    tableOfContents: false,
    customStyling: false,
    watermark: false
  })

  const [isExporting, setIsExporting] = useState(false)

  const formatOptions = [
    {
      id: 'pdf' as const,
      name: 'PDF Document',
      icon: FileText,
      description: 'Professional PDF with custom styling',
      color: 'from-red-500 to-pink-500',
      popular: true
    },
    {
      id: 'docx' as const,
      name: 'Word Document',
      icon: FileText,
      description: 'Editable Microsoft Word document',
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'pptx' as const,
      name: 'PowerPoint',
      icon: Presentation,
      description: 'Professional presentation slides',
      color: 'from-orange-500 to-red-500',
      popular: contentType === 'ppt'
    },
    {
      id: 'html' as const,
      name: 'HTML Web Page',
      icon: Image,
      description: 'Interactive web page format',
      color: 'from-green-500 to-emerald-500',
      popular: false
    },
    {
      id: 'csv' as const,
      name: 'CSV Spreadsheet',
      icon: FileSpreadsheet,
      description: 'Data in spreadsheet format',
      color: 'from-purple-500 to-indigo-500',
      popular: contentType === 'flashcards'
    }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await onExport(exportOptions)
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
    } finally {
      setIsExporting(false)
    }
  }

  const updateOption = (key: keyof ExportOptions, value: any) => {
    setExportOptions(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <Download className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Advanced Export Options</h2>
        </div>
        <p className="text-gray-600">Customize your export with professional formatting and branding</p>
      </motion.div>

      {/* Format Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Export Format</span>
            </CardTitle>
            <CardDescription>Choose the format that best suits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formatOptions.map((format) => {
                const Icon = format.icon
                const isSelected = exportOptions.format === format.id
                return (
                  <motion.div
                    key={format.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'ring-2 ring-blue-500 bg-blue-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => updateOption('format', format.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${format.color}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-gray-800">{format.name}</h4>
                              {format.popular && (
                                <Badge className="bg-green-100 text-green-800 text-xs">Popular</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-600">{format.description}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Customization Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-purple-600" />
              <span>Customization Options</span>
            </CardTitle>
            <CardDescription>Personalize your exported document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Branding Options */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Branding & Styling</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution Name</Label>
                  <Input
                    id="institution"
                    placeholder="Your University/College"
                    value={exportOptions.institutionName || ''}
                    onChange={(e) => updateOption('institutionName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL (Optional)</Label>
                  <Input
                    id="logo"
                    placeholder="https://example.com/logo.png"
                    value={exportOptions.customLogo || ''}
                    onChange={(e) => updateOption('customLogo', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.branding}
                    onChange={(e) => updateOption('branding', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Add institution branding</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.watermark}
                    onChange={(e) => updateOption('watermark', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Add "Generated by ProjectPAL" watermark</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.customStyling}
                    onChange={(e) => updateOption('customStyling', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Apply custom styling and colors</span>
                </label>
              </div>
            </div>

            {/* Document Options */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Document Features</h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.pageNumbers}
                    onChange={(e) => updateOption('pageNumbers', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Include page numbers</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.tableOfContents}
                    onChange={(e) => updateOption('tableOfContents', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Generate table of contents</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Export Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex justify-center"
      >
        <Button
          onClick={handleExport}
          disabled={isExporting}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Exporting...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Export with Custom Options
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}

export default AdvancedExport
