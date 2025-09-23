import React, { useState } from 'react';
import ProjectsTab from '../pages/ProjectsTab';
import AssignmentsTab from '../pages/AssignmentsTab';
import FlashcardsTab from '../pages/FlashcardsTab';
import ResumeTab from '../pages/ResumeTab';
import VivaTab from '../pages/VivaTab';
import ExtrasTab from '../pages/ExtrasTab';

interface DashboardProps {
  onUpgrade: (tier: 'pro' | 'premium') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onUpgrade }) => {
  const [activeTab, setActiveTab] = useState('projects');

  const tabs = [
    {
      id: 'projects',
      name: 'Projects',
      icon: '📁',
      component: ProjectsTab,
      unlocked: true,
    },
    {
      id: 'assignments',
      name: 'Assignments',
      icon: '📄',
      component: AssignmentsTab,
      unlocked: false,
    },
    {
      id: 'flashcards',
      name: 'Flashcards',
      icon: '🧠',
      component: FlashcardsTab,
      unlocked: true,
    },
    {
      id: 'resume',
      name: 'Resume & CV',
      icon: '👤',
      component: ResumeTab,
      unlocked: false,
    },
    {
      id: 'viva',
      name: 'Viva & Interview',
      icon: '💬',
      component: VivaTab,
      unlocked: false,
    },
    {
      id: 'extras',
      name: 'Extras',
      icon: '➕',
      component: ExtrasTab,
      unlocked: false,
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                  : tab.unlocked 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50'
              }`}
              disabled={!tab.unlocked}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.name}</span>
              {!tab.unlocked && <span className="text-xs">🔒</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {ActiveComponent && (
          <ActiveComponent onUpgrade={onUpgrade} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;