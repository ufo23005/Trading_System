import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';
import { TradingDashboard } from './pages/TradingDashboard';
import { ApiCostMonitoring } from './pages/ApiCostMonitoring';
import { AgentManagement } from './pages/AgentManagement';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TradingDashboard />} />
            <Route path="api-cost" element={<ApiCostMonitoring />} />
            <Route path="agents" element={<AgentManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}