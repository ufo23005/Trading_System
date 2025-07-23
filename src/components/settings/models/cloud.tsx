import { Cloud } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

export function CloudModels() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800 dark:text-gray-100">{t('models.availableModels')}</h3>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            0 {t('models.modelsFromProviders')} 0 {t('models.providers')}
          </span>
        </div>
        
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <Cloud className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">{t('models.cloudAvailableSoon')}</p>
        </div>
      </div>
    </div>
  );
}