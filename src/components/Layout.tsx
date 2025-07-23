import { useState, useRef, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BarChart3Icon, CoinsIcon, CpuIcon, SettingsIcon, BellIcon, UserIcon, Settings2, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
// Auth Modal Component
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    displayName: '',
    email: ''
  });
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentView('login');
      setFormData({ username: '', password: '', displayName: '', email: '' });
      setShowPassword(false);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission based on current view
    console.log(`${currentView} form submitted:`, formData);
    
    if (currentView === 'login') {
      // Handle login
      alert('Login functionality would be implemented here');
    } else if (currentView === 'register') {
      // Handle registration
      alert('Registration functionality would be implemented here');
    } else if (currentView === 'forgot') {
      // Handle forgot password
      alert('Password reset email would be sent');
    }
    
    onClose();
  };

  if (!isOpen) return null;

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('auth.username')}
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder={t('auth.enterUsername')}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('auth.password')}
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder={t('auth.enterPassword')}
            required
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {t('auth.login')}
      </button>

      <div className="flex justify-between text-sm">
        <button
          type="button"
          onClick={() => setCurrentView('register')}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          {t('auth.createAccount')}
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('forgot')}
          className="text-gray-600 dark:text-gray-400 hover:underline"
        >
          {t('auth.forgotPasswordQ')}
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('auth.displayName')}
        </label>
        <input
          id="displayName"
          type="text"
          value={formData.displayName}
          onChange={(e) => handleInputChange('displayName', e.target.value)}
          placeholder={t('auth.enterDisplayName')}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <div>
        <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('auth.username')}
        </label>
        <input
          id="reg-username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder={t('auth.enterUsername')}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>
      
      <div>
        <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('auth.password')}
        </label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder={t('auth.enterPassword')}
            required
            className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
      >
        {t('auth.register')}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setCurrentView('login')}
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          {t('auth.alreadyHaveAccount')}
        </button>
      </div>
    </form>
  );

  const renderForgotForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="forgot-username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('auth.username')}
        </label>
        <input
          id="forgot-username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          placeholder={t('auth.enterUsername')}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
      >
        {t('auth.resetPassword')}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setCurrentView('login')}
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          {t('auth.backToLogin')}
        </button>
      </div>
    </form>
  );

  const getTitle = () => {
    switch (currentView) {
      case 'register': return t('auth.register');
      case 'forgot': return t('auth.forgotPassword');
      default: return t('auth.login');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {currentView === 'login' && renderLoginForm()}
        {currentView === 'register' && renderRegisterForm()}
        {currentView === 'forgot' && renderForgotForm()}
      </div>
    </div>
  );
}

export function Layout() {
  const { t } = useLanguage();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  return <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Navigation - Full Width */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          {/* AI Crypto Fund Title */}
          <h1 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <CoinsIcon className="h-6 w-6 flex-shrink-0" />
            <span>AI Crypto Fund</span>
          </h1>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
              <BellIcon className="h-5 w-5" />
            </button>
            <div className="border-l border-gray-300 dark:border-gray-600 h-6"></div>
            <button 
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <UserIcon className="h-5 w-5 mr-1" />
              <span>{t('header.admin')}</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Container with Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="absolute left-0 top-0 bottom-0 z-10 h-full">
          <div 
            className={`${isSidebarExpanded ? 'w-64' : 'w-16'} h-full min-h-full flex flex-col transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg`}
            onMouseEnter={() => setIsSidebarExpanded(true)}
            onMouseLeave={() => setIsSidebarExpanded(false)}
          >
          <nav className="flex-1 flex flex-col justify-between">
            <div>
              <NavLink to="/" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('dashboard')} onMouseLeave={() => setHoveredItem(null)} end>
                <BarChart3Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'dashboard' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  {t('nav.tradingDashboard')}
                </span>
              </NavLink>
              <NavLink to="/api-cost" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('api-cost')} onMouseLeave={() => setHoveredItem(null)}>
                <SettingsIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'api-cost' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  {t('nav.apiCostMonitoring')}
                </span>
              </NavLink>
              <NavLink to="/agents" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('agents')} onMouseLeave={() => setHoveredItem(null)}>
                <CpuIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'agents' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  {t('nav.agentManagement')}
                </span>
              </NavLink>
            </div>
            
            <div className="mb-4">
              <NavLink to="/settings" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('settings')} onMouseLeave={() => setHoveredItem(null)}>
                <Settings2 className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'settings' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  {t('nav.settings')}
                </span>
              </NavLink>
            </div>
          </nav>
          </div>
        </div>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 ml-16">
          <Outlet />
        </main>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>;
}