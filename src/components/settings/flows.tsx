import { useLanguage } from '../../contexts/LanguageContext';

export function FlowsSettings() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('flows.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('flows.description')}
        </p>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {t('flows.placeholder')}
        </div>
      </div>
    </div>
  );
}