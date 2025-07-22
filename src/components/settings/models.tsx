import { Cloud, Server } from 'lucide-react';
import { useState } from 'react';
import { CloudModels } from './models/cloud';
import { OllamaSettings } from './models/ollama';

interface ModelSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  component: React.ComponentType;
}

export function Models() {
  const [selectedSection, setSelectedSection] = useState('cloud');

  const modelSections: ModelSection[] = [
    {
      id: 'cloud',
      label: 'Cloud',
      icon: Cloud,
      description: 'API-based models from cloud providers',
      component: CloudModels,
    },
    {
      id: 'local',
      label: 'Ollama',
      icon: Server,
      description: 'Ollama models running locally on your machine',
      component: OllamaSettings,
    },
  ];

  const renderContent = () => {
    const section = modelSections.find(s => s.id === selectedSection);
    if (!section) return null;
    
    const Component = section.component;
    return <Component />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Models</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your AI models from local and cloud providers.
        </p>
      </div>

      {/* Model Type Navigation */}
      <div className="flex space-x-1 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg border border-gray-300 dark:border-gray-700">
        {modelSections.map((section) => {
          const Icon = section.icon;
          const isSelected = selectedSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isSelected 
                  ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm" 
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/30"
              }`}
            >
              <Icon className="h-4 w-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
}