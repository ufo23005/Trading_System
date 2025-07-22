import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { BarChart3Icon, CoinsIcon, CpuIcon, SettingsIcon, BellIcon, UserIcon, Settings2 } from 'lucide-react';
export function Layout() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
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
            <button className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
              <UserIcon className="h-5 w-5 mr-1" />
              <span>Admin</span>
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
                  Trading Dashboard
                </span>
              </NavLink>
              <NavLink to="/api-cost" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('api-cost')} onMouseLeave={() => setHoveredItem(null)}>
                <SettingsIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'api-cost' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  API Cost Monitoring
                </span>
              </NavLink>
              <NavLink to="/agents" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('agents')} onMouseLeave={() => setHoveredItem(null)}>
                <CpuIcon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'agents' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  Agent Management
                </span>
              </NavLink>
            </div>
            
            <div className="mb-4">
              <NavLink to="/settings" className={({
              isActive
            }) => `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-blue-500' : ''}`} onMouseEnter={() => setHoveredItem('settings')} onMouseLeave={() => setHoveredItem(null)}>
                <Settings2 className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={`whitespace-nowrap ${isSidebarExpanded || hoveredItem === 'settings' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  Settings
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
    </div>;
}