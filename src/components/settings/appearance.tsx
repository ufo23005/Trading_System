import { useState } from 'react';
import { SaveIcon, RotateCcwIcon, PaletteIcon, TypeIcon, LayoutIcon, BarChart3Icon, ZapIcon, MonitorIcon, SunIcon, MoonIcon, ComputerIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AppearanceSettings() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState({
    // Theme Settings
    theme: 'system', // light, dark, system
    accentColor: 'blue',
    
    // Typography
    fontSize: 'medium',
    fontFamily: 'inter',
    
    // Layout & Density
    layoutDensity: 'comfortable',
    sidebarStyle: 'classic',
    showBreadcrumbs: true,
    compactMode: false,
    
    // Charts & Visualization
    chartTheme: 'modern',
    chartAnimations: true,
    candlestickStyle: 'classic',
    gridLines: true,
    
    // Animation & Effects
    enableAnimations: true,
    transitionSpeed: 'normal',
    hoverEffects: true,
    
    // Dashboard Customization
    showWelcomeMessage: true,
    cardShadows: true,
    roundedCorners: 'medium',
    coloredHeaders: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    console.log('Saving appearance settings:', settings);
    setHasChanges(false);
    alert(t('alerts.appearanceSaved'));
  };

  const resetSettings = () => {
    if (confirm(t('alerts.confirmAppearanceReset'))) {
      setSettings({
        theme: 'system',
        accentColor: 'blue',
        fontSize: 'medium',
        fontFamily: 'inter',
        layoutDensity: 'comfortable',
        sidebarStyle: 'classic',
        showBreadcrumbs: true,
        compactMode: false,
        chartTheme: 'modern',
        chartAnimations: true,
        candlestickStyle: 'classic',
        gridLines: true,
        enableAnimations: true,
        transitionSpeed: 'normal',
        hoverEffects: true,
        showWelcomeMessage: true,
        cardShadows: true,
        roundedCorners: 'medium',
        coloredHeaders: true,
      });
      setHasChanges(true);
    }
  };

  const colorOptions = [
    { value: 'blue', name: t('appearance.blue'), color: 'bg-blue-500' },
    { value: 'green', name: t('appearance.green'), color: 'bg-green-500' },
    { value: 'purple', name: t('appearance.purple'), color: 'bg-purple-500' },
    { value: 'orange', name: t('appearance.orange'), color: 'bg-orange-500' },
    { value: 'red', name: t('appearance.red'), color: 'bg-red-500' },
    { value: 'teal', name: t('appearance.teal'), color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('appearance.title')}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('appearance.description')}
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

      {/* Theme Settings Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <PaletteIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appearance.themeSettingsTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('appearance.themeSettingsDesc')}</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Theme Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('appearance.themeMode')}</label>
            <div className="flex gap-3">
              <button
                onClick={() => updateSetting('theme', 'light')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                  settings.theme === 'light'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <SunIcon className="h-5 w-5" />
                <span className={`text-sm font-medium ${
                  settings.theme === 'light' 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}>{t('appearance.light')}</span>
              </button>
              <button
                onClick={() => updateSetting('theme', 'dark')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                  settings.theme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <MoonIcon className="h-5 w-5" />
                <span className={`text-sm font-medium ${
                  settings.theme === 'dark' 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}>{t('appearance.dark')}</span>
              </button>
              <button
                onClick={() => updateSetting('theme', 'system')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                  settings.theme === 'system'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <ComputerIcon className="h-5 w-5" />
                <span className={`text-sm font-medium ${
                  settings.theme === 'system' 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}>{t('appearance.system')}</span>
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t('appearance.accentColor')}</label>
            <div className="flex gap-3 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => updateSetting('accentColor', color.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-colors ${
                    settings.accentColor === color.value
                      ? 'border-gray-400 dark:border-gray-500'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                  <span className={`text-sm font-medium ${
                    settings.accentColor === color.value 
                      ? 'text-gray-800 dark:text-gray-200' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <TypeIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appearance.typographyTitle')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('appearance.typographyDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.fontSize')}</label>
            <select
              value={settings.fontSize}
              onChange={(e) => updateSetting('fontSize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="small">{t('appearance.small')}</option>
              <option value="medium">{t('appearance.medium')}</option>
              <option value="large">{t('appearance.large')}</option>
              <option value="extra-large">{t('appearance.extraLarge')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.fontFamily')}</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => updateSetting('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="inter">{t('appearance.inter')}</option>
              <option value="system">{t('appearance.systemUI')}</option>
              <option value="roboto">{t('appearance.roboto')}</option>
              <option value="opensans">{t('appearance.openSans')}</option>
              <option value="sourcesans">{t('appearance.sourceSans')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout & Density Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <LayoutIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appearance.layoutDensitySection')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('appearance.layoutDensitySectionDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.layoutDensity')}</label>
            <select
              value={settings.layoutDensity}
              onChange={(e) => updateSetting('layoutDensity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="compact">{t('appearance.compact')}</option>
              <option value="comfortable">{t('appearance.comfortable')}</option>
              <option value="spacious">{t('appearance.spacious')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.sidebarStyle')}</label>
            <select
              value={settings.sidebarStyle}
              onChange={(e) => updateSetting('sidebarStyle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="classic">{t('appearance.classic')}</option>
              <option value="minimal">{t('appearance.minimal')}</option>
              <option value="modern">{t('appearance.modern')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.cornerRadius')}</label>
            <select
              value={settings.roundedCorners}
              onChange={(e) => updateSetting('roundedCorners', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="none">{t('appearance.none')}</option>
              <option value="small">{t('appearance.cornerSmall')}</option>
              <option value="medium">{t('appearance.cornerMedium')}</option>
              <option value="large">{t('appearance.cornerLarge')}</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.showBreadcrumbs')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.showBreadcrumbsDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.showBreadcrumbs}
                onChange={(e) => updateSetting('showBreadcrumbs', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.compactMode')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.compactModeDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) => updateSetting('compactMode', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts & Visualization Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <BarChart3Icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appearance.chartsVisualizationSection')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('appearance.chartsVisualizationSectionDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.chartTheme')}</label>
            <select
              value={settings.chartTheme}
              onChange={(e) => updateSetting('chartTheme', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="modern">{t('appearance.modern')}</option>
              <option value="classic">{t('appearance.classic')}</option>
              <option value="minimal">{t('appearance.minimal')}</option>
              <option value="professional">{t('appearance.professional')}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.candlestickStyle')}</label>
            <select
              value={settings.candlestickStyle}
              onChange={(e) => updateSetting('candlestickStyle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="classic">{t('appearance.classic')}</option>
              <option value="hollow">{t('appearance.hollow')}</option>
              <option value="filled">{t('appearance.filled')}</option>
              <option value="line">{t('appearance.line')}</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.chartAnimations')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.chartAnimationsDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.chartAnimations}
                onChange={(e) => updateSetting('chartAnimations', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.gridLines')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.gridLinesDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.gridLines}
                onChange={(e) => updateSetting('gridLines', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animation & Effects Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <ZapIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appearance.animationEffectsSection')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('appearance.animationEffectsSectionDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('appearance.transitionSpeed')}</label>
            <select
              value={settings.transitionSpeed}
              onChange={(e) => updateSetting('transitionSpeed', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="slow">{t('appearance.slow')}</option>
              <option value="normal">{t('appearance.normal')}</option>
              <option value="fast">{t('appearance.fast')}</option>
              <option value="instant">{t('appearance.instant')}</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.enableAnimations')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.enableAnimationsDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.enableAnimations}
                onChange={(e) => updateSetting('enableAnimations', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.hoverEffects')}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.hoverEffectsDesc')}</div>
              </div>
              <input
                type="checkbox"
                checked={settings.hoverEffects}
                onChange={(e) => updateSetting('hoverEffects', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Customization Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <MonitorIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('appearance.dashboardCustomizationSection')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('appearance.dashboardCustomizationSectionDesc')}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.showWelcomeMessage')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.showWelcomeMessageDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.showWelcomeMessage}
              onChange={(e) => updateSetting('showWelcomeMessage', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.cardShadows')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.cardShadowsDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.cardShadows}
              onChange={(e) => updateSetting('cardShadows', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('appearance.coloredHeaders')}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('appearance.coloredHeadersDesc')}</div>
            </div>
            <input
              type="checkbox"
              checked={settings.coloredHeaders}
              onChange={(e) => updateSetting('coloredHeaders', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
}