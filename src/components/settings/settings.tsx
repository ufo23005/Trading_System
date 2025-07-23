import { Key, Palette, Settings2, Workflow, CpuIcon } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ApiKeysSettings } from './api-keys';
import { AppearanceSettings } from './appearance';
import { FlowsSettings } from './flows';
import { GeneralSettings } from './general';
import { Models } from './models';

interface SettingsNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

export function Settings() {
  const { t } = useLanguage();
  const [selectedSection, setSelectedSection] = useState('models');

  const navigationItems: SettingsNavItem[] = [
    {
      id: 'general',
      label: t('settings.general'),
      icon: Settings2,
      description: t('settings.generalDesc'),
    },
    {
      id: 'api',
      label: t('settings.apiKeys'),
      icon: Key,
      description: t('settings.apiKeysDesc'),
    },
    {
      id: 'models',
      label: t('settings.models'),
      icon: CpuIcon,
      description: t('settings.modelsDesc'),
    },
    {
      id: 'flows',
      label: t('settings.flows'),
      icon: Workflow,
      description: t('settings.flowsDesc'),
    },
    {
      id: 'appearance',
      label: t('settings.appearance'),
      icon: Palette,
      description: t('settings.appearanceDesc'),
    },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'general':
        return <GeneralSettings />;
      case 'models':
        return <Models />;
      case 'flows':
        return <FlowsSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'api':
        return <ApiKeysSettings />;
      default:
        return <Models />;
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full">
        {/* Left Navigation Pane */}
        <div className="w-60 bg-white dark:bg-gray-800 flex-shrink-0">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('nav.settings')}</h1>
          </div>
          <nav className="p-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md text-sm transition-colors ${
                    isSelected 
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Pane */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}