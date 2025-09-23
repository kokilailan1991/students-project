import React from 'react';

interface ResumeTabProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

const ResumeTab: React.FC<ResumeTabProps> = ({ onUpgrade }) => {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">👤</span>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Resume & CV Builder</h3>
        <p className="text-gray-600 mb-6">
          Generate ATS-friendly resumes, bullet points, and LinkedIn summaries
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-lg">🔒</span>
            <span className="font-medium text-yellow-800">Pro Feature</span>
          </div>
          <p className="text-sm text-yellow-700 mb-4">
            Upgrade to Pro to access resume building tools
          </p>
          <button
            onClick={() => onUpgrade('pro')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Upgrade to Pro - ₹499
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeTab;