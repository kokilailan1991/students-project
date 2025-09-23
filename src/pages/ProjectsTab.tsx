import React, { useState } from 'react';

interface ProjectsTabProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ onUpgrade }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDomain, setProjectDomain] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerate = async (type: string) => {
    if (!projectTitle.trim()) {
      alert('Please enter a project title');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockContent = {
        abstract: `This project presents a comprehensive solution for ${projectTitle} in the domain of ${projectDomain}. The system utilizes modern technologies including ${technologies} to deliver an efficient and scalable solution. The project addresses key challenges in the field and provides innovative approaches to problem-solving.`,
        report: `# ${projectTitle}\n\n## Abstract\n\nThis project presents a comprehensive solution...\n\n## Introduction\n\n## Literature Review\n\n## Methodology\n\n## Implementation\n\n## Results\n\n## Conclusion\n\n## References`,
        ppt: [
          { title: 'Introduction', content: 'Project overview and objectives' },
          { title: 'Problem Statement', content: 'Current challenges and limitations' },
          { title: 'Solution', content: 'Proposed approach and methodology' },
          { title: 'Implementation', content: 'Technical details and architecture' },
          { title: 'Results', content: 'Key findings and outcomes' },
          { title: 'Conclusion', content: 'Summary and future work' }
        ]
      };
      
      setGeneratedContent({ ...mockContent, type });
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = (format: string) => {
    if (!generatedContent) return;
    
    // Simulate download
    const element = document.createElement('a');
    const file = new Blob([generatedContent.report || generatedContent.abstract], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${projectTitle.replace(/\s+/g, '_')}.${format}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Generator</h2>
        <p className="text-gray-600">Generate abstracts, reports, and presentations for your projects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g., E-commerce Website with AI Recommendations"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain
            </label>
            <input
              type="text"
              value={projectDomain}
              onChange={(e) => setProjectDomain(e.target.value)}
              placeholder="e.g., Web Development, Machine Learning, IoT"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies
            </label>
            <input
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB, Python"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Generation Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Generate Content</h3>
          
          {/* Abstract - Free */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📄</span>
                <span className="font-medium">Abstract</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
              </div>
              <button
                onClick={() => handleGenerate('abstract')}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            <p className="text-sm text-gray-600">Generate a professional project abstract</p>
          </div>

          {/* Report - Pro */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 opacity-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📄</span>
                <span className="font-medium">Full Report</span>
                <span className="text-xs">🔒</span>
              </div>
              <button
                onClick={() => onUpgrade('pro')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Upgrade to Pro
              </button>
            </div>
            <p className="text-sm text-gray-600">Generate a complete project report with all sections</p>
          </div>

          {/* PPT - Pro */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 opacity-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <span className="font-medium">PPT Slides</span>
                <span className="text-xs">🔒</span>
              </div>
              <button
                onClick={() => onUpgrade('pro')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Upgrade to Pro
              </button>
            </div>
            <p className="text-sm text-gray-600">Generate PowerPoint presentation slides</p>
          </div>
        </div>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload('txt')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center space-x-1"
              >
                <span>💾</span>
                <span>Download TXT</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {generatedContent.type === 'ppt' 
                ? generatedContent.ppt.map((slide: any, index: number) => 
                    `Slide ${index + 1}: ${slide.title}\n${slide.content}\n\n`
                  ).join('')
                : generatedContent.abstract || generatedContent.report
              }
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;