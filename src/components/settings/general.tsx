import { useState, useEffect } from 'react';
import { SaveIcon, RotateCcwIcon, UserIcon, GlobeIcon, BellIcon, ShieldIcon, ClockIcon, DatabaseIcon, DownloadIcon, AlertCircleIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function GeneralSettings() {
  const { language, setLanguage, t } = useLanguage();
  const [settings, setSettings] = useState({
    // User Profile
    username: 'admin',
    email: 'admin@example.com',
    timezone: 'UTC',
    language: language,
    
    // Trading Preferences
    defaultCurrency: 'USD',
    riskTolerance: 'medium',
    autoRefreshInterval: '30',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    tradingAlerts: true,
    priceAlerts: true,
    systemAlerts: true,
    
    // Security
    sessionTimeout: '60',
    twoFactorAuth: false,
    
    // Data & Performance
    dataRetention: '365',
    cacheEnabled: true,
    compressData: true,
    
    // System
    autoBackup: true,
    debugMode: false,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    
    // Special handling for language change
    if (key === 'language') {
      setLanguage(value);
    }
  };

  // Sync language state when context changes
  useEffect(() => {
    setSettings(prev => ({ ...prev, language }));
  }, [language]);

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
    alert(t('alerts.settingsSaved'));
  };

  const resetSettings = () => {
    if (confirm(t('alerts.confirmReset'))) {
      setSettings({
        username: 'admin',
        email: 'admin@example.com',
        timezone: 'UTC',
        language: 'en',
        defaultCurrency: 'USD',
        riskTolerance: 'medium',
        autoRefreshInterval: '30',
        emailNotifications: true,
        pushNotifications: true,
        tradingAlerts: true,
        priceAlerts: true,
        systemAlerts: true,
        sessionTimeout: '60',
        twoFactorAuth: false,
        dataRetention: '365',
        cacheEnabled: true,
        compressData: true,
        autoBackup: true,
        debugMode: false,
      });
      setHasChanges(true);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('general.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('general.description')}
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
            onClick={resetSettings}
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcwIcon className="h-4 w-4 mr-2" />
            {t('common.reset')}
          </button>
          <button
            onClick={saveSettings}
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

      {/* User Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('general.userProfileTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('general.userProfileDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.username')}</label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) => updateSetting('username', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.email')}</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.timezone')}</label>
            <select
              value={settings.timezone}
              onChange={(e) => updateSetting('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="UTC">{t('general.utc')}</option>
              <option value="America/New_York">{t('general.easternTime')}</option>
              <option value="America/Chicago">{t('general.centralTime')}</option>
              <option value="America/Los_Angeles">{t('general.pacificTime')}</option>
              <option value="Europe/London">{t('general.london')}</option>
              <option value="Asia/Tokyo">{t('general.tokyo')}</option>
              <option value="Asia/Shanghai">{t('general.shanghai')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('common.language')}</label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="en">{t('language.english')}</option>
              <option value="zh">{t('language.traditionalChinese')}</option>
              <option value="zh-cn">{t('language.simplifiedChinese')}</option>
              <option value="ja">{t('language.japanese')}</option>
              <option value="ko">{t('language.korean')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trading Preferences Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <GlobeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('general.tradingPreferencesTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('general.tradingPreferencesDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('general.defaultCurrency')}</label>
            <select
              value={settings.defaultCurrency}
              onChange={(e) => updateSetting('defaultCurrency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="USD">{t('currency.usd')}</option>
              <option value="EUR">{t('currency.eur')}</option>
              <option value="GBP">{t('currency.gbp')}</option>
              <option value="JPY">{t('currency.jpy')}</option>
              <option value="BTC">{t('currency.btc')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('general.riskTolerance')}</label>
            <select
              value={settings.riskTolerance}
              onChange={(e) => updateSetting('riskTolerance', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="conservative">{t('general.conservative')}</option>
              <option value="medium">{t('general.medium')}</option>
              <option value="aggressive">{t('general.aggressive')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('general.autoRefresh')}</label>
            <select
              value={settings.autoRefreshInterval}
              onChange={(e) => updateSetting('autoRefreshInterval', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="5">{t('general.5seconds')}</option>
              <option value="10">{t('general.10seconds')}</option>
              <option value="30">{t('general.30seconds')}</option>
              <option value="60">{t('general.1minute')}</option>
              <option value="300">{t('general.5minutes')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <BellIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('general.notificationsTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('general.notificationsDesc')}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.emailNotifications')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.emailNotificationsDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => updateSetting('emailNotifications', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.pushNotifications')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.pushNotificationsDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.tradingAlerts')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.tradingAlertsDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.tradingAlerts}
              onChange={(e) => updateSetting('tradingAlerts', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.priceAlerts')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.priceAlertsDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.priceAlerts}
              onChange={(e) => updateSetting('priceAlerts', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.systemAlerts')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.systemAlertsDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.systemAlerts}
              onChange={(e) => updateSetting('systemAlerts', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
            <ShieldIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('general.securityTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('general.securityDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('general.sessionTimeout')}</label>
            <select
              value={settings.sessionTimeout}
              onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="15">{t('general.15minutes')}</option>
              <option value="30">{t('general.30minutes')}</option>
              <option value="60">{t('general.1hour')}</option>
              <option value="240">{t('general.4hours')}</option>
              <option value="480">{t('general.8hours')}</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.twoFactorAuth')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.twoFactorAuthDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => updateSetting('twoFactorAuth', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Data & Performance Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <DatabaseIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('general.dataPerformanceTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('general.dataPerformanceDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('general.dataRetention')}</label>
            <select
              value={settings.dataRetention}
              onChange={(e) => updateSetting('dataRetention', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="30">{t('general.30days')}</option>
              <option value="90">{t('general.90days')}</option>
              <option value="180">{t('general.180days')}</option>
              <option value="365">{t('general.1year')}</option>
              <option value="730">{t('general.2years')}</option>
              <option value="-1">{t('general.forever')}</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.enableCaching')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.enableCachingDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.cacheEnabled}
                onChange={(e) => updateSetting('cacheEnabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.compressData')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.compressDataDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.compressData}
                onChange={(e) => updateSetting('compressData', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <DownloadIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('general.systemTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('general.systemDesc')}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.autoBackup')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.autoBackupDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.autoBackup}
              onChange={(e) => updateSetting('autoBackup', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('general.debugMode')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('general.debugModeDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.debugMode}
              onChange={(e) => updateSetting('debugMode', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}