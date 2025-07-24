import { useState } from 'react';
import { EyeIcon, EyeOffIcon, SaveIcon, RotateCcwIcon, CheckCircleIcon, CoinsIcon, TrendingUpIcon, CpuIcon, DatabaseIcon, LinkIcon, NewspaperIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { PasswordAuthModal } from './PasswordAuthModal';

interface ApiKey {
  id: string;
  name: string;
  placeholder: string;
  value: string;
}

interface ApiCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  keys: ApiKey[];
}

export function ApiKeysSettings() {
  const { t } = useLanguage();
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [authModal, setAuthModal] = useState({ isOpen: false, action: '', keyId: '' });

  const categories: ApiCategory[] = [
    {
      id: 'exchanges',
      title: t('apiKeys.exchangeApis'),
      description: t('apiKeys.exchangeApisDesc'),
      icon: CoinsIcon,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      keys: [
        { id: 'binance', name: t('apiKeys.binance'), placeholder: t('apiKeys.enterBinance'), value: '' },
        { id: 'okx', name: t('apiKeys.okx'), placeholder: t('apiKeys.enterOkx'), value: '' },
        { id: 'bingx', name: t('apiKeys.bingx'), placeholder: t('apiKeys.enterBingx'), value: '' },
        { id: 'bitget', name: t('apiKeys.bitget'), placeholder: t('apiKeys.enterBitget'), value: '' },
        { id: 'pionex', name: t('apiKeys.pionex'), placeholder: t('apiKeys.enterPionex'), value: '' },
      ]
    },
    {
      id: 'stocks',
      title: t('apiKeys.stockApis'),
      description: t('apiKeys.stockApisDesc'),
      icon: TrendingUpIcon,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      keys: [
        { id: 'financial_datasets', name: t('apiKeys.financialDatasets'), placeholder: t('apiKeys.enterFinancialDatasets'), value: '' },
      ]
    },
    {
      id: 'crypto-data',
      title: t('apiKeys.cryptoDataSources'),
      description: t('apiKeys.cryptoDataSourcesDesc'),
      icon: DatabaseIcon,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      keys: [
        { id: 'coinmarketcap', name: t('apiKeys.coinmarketcap'), placeholder: t('apiKeys.enterCoinmarketcap'), value: '' },
        { id: 'messari', name: t('apiKeys.messari'), placeholder: t('apiKeys.enterMessari'), value: '' },
      ]
    },
    {
      id: 'onchain',
      title: t('apiKeys.onChainDataAnalysis'),
      description: t('apiKeys.onChainDataAnalysisDesc'),
      icon: LinkIcon,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
      keys: [
        { id: 'glassnode', name: t('apiKeys.glassnode'), placeholder: t('apiKeys.enterGlassnode'), value: '' },
        { id: 'santiment', name: t('apiKeys.santiment'), placeholder: t('apiKeys.enterSantiment'), value: '' },
      ]
    },
    {
      id: 'news-sentiment',
      title: t('apiKeys.newsSocialSentiment'),
      description: t('apiKeys.newsSocialSentimentDesc'),
      icon: NewspaperIcon,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      keys: [
        { id: 'news_api', name: t('apiKeys.newsApi'), placeholder: t('apiKeys.enterNewsApi'), value: '' },
        { id: 'twitter_bearer', name: t('apiKeys.twitterBearer'), placeholder: t('apiKeys.enterTwitterBearer'), value: '' },
      ]
    },
    {
      id: 'llm',
      title: t('apiKeys.llmApis'),
      description: t('apiKeys.llmApisDesc'),
      icon: CpuIcon,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      keys: [
        { id: 'openai', name: t('apiKeys.openai'), placeholder: t('apiKeys.enterOpenai'), value: '' },
        { id: 'anthropic', name: t('apiKeys.anthropic'), placeholder: t('apiKeys.enterAnthropic'), value: '' },
        { id: 'deepseek', name: t('apiKeys.deepseek'), placeholder: t('apiKeys.enterDeepseek'), value: '' },
        { id: 'gemini', name: t('apiKeys.gemini'), placeholder: t('apiKeys.enterGemini'), value: '' },
        { id: 'llama', name: t('apiKeys.llama'), placeholder: t('apiKeys.enterLlama'), value: '' },
      ]
    }
  ];

  const togglePasswordVisibility = (keyId: string) => {
    if (!showPasswords[keyId]) {
      // Show password requires authentication
      setAuthModal({ isOpen: true, action: 'showPassword', keyId });
    } else {
      // Hide password doesn't require authentication
      setShowPasswords(prev => ({
        ...prev,
        [keyId]: false
      }));
    }
  };

  const handleKeyChange = (keyId: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [keyId]: value
    }));
    setHasChanges(true);
    
    // Remove from saved keys if modified
    if (savedKeys.has(keyId)) {
      setSavedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(keyId);
        return newSet;
      });
    }
  };

  const saveAllKeys = () => {
    setAuthModal({ isOpen: true, action: 'save', keyId: '' });
  };

  const handleSaveAfterAuth = () => {
    // In a real app, this would save to backend/localStorage
    console.log('Saving API keys:', apiKeys);
    
    // Mark all keys as saved
    const allKeyIds = categories.flatMap(cat => cat.keys.map(key => key.id));
    setSavedKeys(new Set(allKeyIds));
    setHasChanges(false);
    
    // Show success message (in real app, use toast notification)
    alert(t('alerts.apiKeysSaved'));
  };

  const resetKeys = () => {
    setAuthModal({ isOpen: true, action: 'reset', keyId: '' });
  };

  const handleResetAfterAuth = () => {
    setApiKeys({});
    setSavedKeys(new Set());
    setHasChanges(false);
    setShowPasswords({});
  };

  const renderKeyInput = (key: ApiKey) => {
    const isVisible = showPasswords[key.id];
    const currentValue = apiKeys[key.id] || '';
    const isSaved = savedKeys.has(key.id) && currentValue;

    return (
      <div key={key.id} className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={key.id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {key.name}
          </label>
          {isSaved && (
            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              {t('apiKeys.saved')}
            </div>
          )}
        </div>
        <div className="relative">
          <input
            id={key.id}
            type={isVisible ? 'text' : 'password'}
            value={currentValue}
            onChange={(e) => handleKeyChange(key.id, e.target.value)}
            placeholder={key.placeholder}
            className="block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility(key.id)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {isVisible ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    );
  };

  const handleAuthSuccess = () => {
    const { action, keyId } = authModal;
    
    switch (action) {
      case 'showPassword':
        setShowPasswords(prev => ({
          ...prev,
          [keyId]: true
        }));
        break;
      case 'save':
        handleSaveAfterAuth();
        break;
      case 'reset':
        handleResetAfterAuth();
        break;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('apiKeys.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('apiKeys.description')}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {hasChanges ? (
            <span className="text-amber-600 dark:text-amber-400">{t('common.unsavedChanges')}</span>
          ) : (
            <span>{t('common.allChangesSaved')}</span>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetKeys}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcwIcon className="h-4 w-4 mr-2" />
            {t('common.reset')}
          </button>
          <button
            onClick={saveAllKeys}
            disabled={!hasChanges}
            className={`flex items-center px-4 py-2 text-sm text-white rounded-lg transition-colors ${
              hasChanges 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            {t('common.saveAll')}
          </button>
        </div>
      </div>

      {/* API Key Categories */}
      <div className="space-y-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.id} 
              className={`rounded-lg border-2 ${category.bgColor} shadow-sm hover:shadow-md transition-shadow`}
            >
              {/* Category Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${category.bgColor} border ${category.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${category.color}`}>
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* API Keys Grid */}
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {category.keys.map(renderKeyInput)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>{t('apiKeys.securityNotice')}:</strong> {t('apiKeys.securityMessage')}
        </div>
      </div>

      {/* Password Authentication Modal */}
      <PasswordAuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, action: '', keyId: '' })}
        onSuccess={handleAuthSuccess}
        title={
          authModal.action === 'showPassword' ? t('passwordAuth.titleShowKey') :
          authModal.action === 'save' ? t('passwordAuth.titleSave') :
          authModal.action === 'reset' ? t('passwordAuth.titleReset') :
          t('passwordAuth.title')
        }
        description={
          authModal.action === 'showPassword' ? t('passwordAuth.descShowKey') :
          authModal.action === 'save' ? t('passwordAuth.descSave') :
          authModal.action === 'reset' ? t('passwordAuth.descReset') :
          t('passwordAuth.description')
        }
      />
    </div>
  );
}