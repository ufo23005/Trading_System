import { useState } from 'react';
import '@xyflow/react/dist/style.css';
import { PlusIcon, SearchIcon, SettingsIcon, PlayIcon, PauseIcon, TrashIcon, EditIcon, CpuIcon } from 'lucide-react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { useLanguage } from '../contexts/LanguageContext';

// Agent interface definition
interface Agent {
  id: number;
  name: string;
  type: string;
  status: string;
  lastRun: string;
  performance: string;
  description: string;
}
// Mock data - in a real app, this would come from API - moved inside component for translations
// Mock flow nodes and edges for the Flow Editor will be created inside the component
const initialEdges = [{
  id: 'e1-2',
  source: '1',
  target: '2'
}, {
  id: 'e1-3',
  source: '1',
  target: '3'
}, {
  id: 'e2-4',
  source: '2',
  target: '4'
}, {
  id: 'e3-4',
  source: '3',
  target: '4'
}, {
  id: 'e4-5',
  source: '4',
  target: '5'
}];
export function AgentManagement() {
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Mock data with translated content
  const agentsList: Agent[] = [{
    id: 1,
    name: t('agents.btcAnalyst'),
    type: t('agents.cryptocurrency'),
    status: 'active',
    lastRun: '2023-07-01 14:32',
    performance: '+5.8%',
    description: t('agents.btcAnalystDesc')
  }, {
    id: 2,
    name: t('agents.ethAnalyst'),
    type: t('agents.cryptocurrency'),
    status: 'active',
    lastRun: '2023-07-01 13:15',
    performance: '+3.2%',
    description: t('agents.ethAnalystDesc')
  }, {
    id: 3,
    name: t('agents.marketSentiment'),
    type: t('agents.general'),
    status: 'active',
    lastRun: '2023-07-01 12:00',
    performance: 'N/A',
    description: t('agents.marketSentimentDesc')
  }, {
    id: 4,
    name: t('agents.riskManager'),
    type: t('agents.system'),
    status: 'active',
    lastRun: '2023-07-01 11:45',
    performance: 'N/A',
    description: t('agents.riskManagerDesc')
  }, {
    id: 5,
    name: t('agents.solAnalyst'),
    type: t('agents.cryptocurrency'),
    status: 'paused',
    lastRun: '2023-06-30 23:10',
    performance: '-1.2%',
    description: t('agents.solAnalystDesc')
  }];
  
  // Create flow nodes with translated labels
  const initialNodes = [{
    id: '1',
    type: 'input',
    data: {
      label: t('agents.marketData')
    },
    position: {
      x: 250,
      y: 5
    }
  }, {
    id: '2',
    data: {
      label: t('agents.sentimentAnalysis')
    },
    position: {
      x: 100,
      y: 100
    }
  }, {
    id: '3',
    data: {
      label: t('agents.technicalAnalysis')
    },
    position: {
      x: 400,
      y: 100
    }
  }, {
    id: '4',
    data: {
      label: t('agents.decisionEngine')
    },
    position: {
      x: 250,
      y: 200
    }
  }, {
    id: '5',
    type: 'output',
    data: {
      label: t('agents.tradeExecution')
    },
    position: {
      x: 250,
      y: 300
    }
  }];
  
  const nodes = initialNodes;
  const edges = initialEdges;
  return <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('agents.title')}
        </h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-4 w-4 mr-2" />
          {t('agents.createNewAgent')}
        </button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder={t('agents.searchAgents')} />
        </div>
        <select className="block w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-500 dark:text-gray-400">
          <option value="">{t('agents.allTypes')}</option>
          <option value="cryptocurrency">{t('agents.cryptocurrency')}</option>
          <option value="general">{t('agents.general')}</option>
          <option value="system">{t('agents.system')}</option>
        </select>
        <select className="block w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-500 dark:text-gray-400">
          <option value="">{t('agents.allStatus')}</option>
          <option value="active">{t('agents.active')}</option>
          <option value="paused">{t('agents.paused')}</option>
        </select>
      </div>
      {/* Agents List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('agents.agent')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('agents.type')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('agents.status')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('agents.lastRun')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('agents.performance')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('agents.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {agentsList.map(agent => <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setSelectedAgent(agent)}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                      <CpuIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {agent.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {agent.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {agent.type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${agent.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'}`}>
                    {agent.status === 'active' ? t('agents.active') : t('agents.paused')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {agent.lastRun}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {agent.performance === 'N/A' ? <span className="text-gray-500 dark:text-gray-400">
                      {t('common.notApplicable')}
                    </span> : <span className={`font-medium ${agent.performance.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {agent.performance}
                    </span>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex space-x-2">
                    {agent.status === 'active' ? <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <PauseIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </button> : <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <PlayIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                      </button>}
                    <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <EditIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                    </button>
                    <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {/* Agent Flow Editor */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {selectedAgent ? `${selectedAgent.name} ${t('agents.agentFlow')}` : t('agents.agentFlowEditor')}
          </h2>
          <button className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <SettingsIcon className="h-4 w-4 mr-2" />
            {t('agents.editFlow')}
          </button>
        </div>
        <div style={{
        height: 400
      }} className="border border-gray-200 dark:border-gray-700 rounded-lg">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
      </div>
      {/* Agent Configuration Panel - Only shown when an agent is selected */}
      {selectedAgent && <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('agents.agentConfiguration')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('agents.agentName')}
                </label>
                <input type="text" id="agent-name" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800" defaultValue={selectedAgent.name} />
              </div>
              <div className="mb-4">
                <label htmlFor="agent-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('agents.agentType')}
                </label>
                <select id="agent-type" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800" defaultValue={selectedAgent.type.toLowerCase()}>
                  <option value="cryptocurrency">{t('agents.cryptocurrency')}</option>
                  <option value="general">{t('agents.general')}</option>
                  <option value="system">{t('agents.system')}</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="agent-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('agents.description')}
                </label>
                <textarea id="agent-description" rows={3} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800" defaultValue={selectedAgent.description}></textarea>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="agent-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('agents.aiModel')}
                </label>
                <select id="agent-model" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800">
                  <option value="gpt-4">{t('agents.gpt4')}</option>
                  <option value="gpt-3.5-turbo">{t('agents.gpt35turbo')}</option>
                  <option value="llama-7b">{t('agents.llama7b')}</option>
                  <option value="mistral-7b">{t('agents.mistral7b')}</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="agent-schedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('agents.runSchedule')}
                </label>
                <select id="agent-schedule" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800">
                  <option value="1min">{t('agents.every1minute')}</option>
                  <option value="5min">{t('agents.every5minutes')}</option>
                  <option value="15min">{t('agents.every15minutes')}</option>
                  <option value="1hour">{t('agents.hourly')}</option>
                  <option value="daily">{t('agents.daily')}</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('agents.permissions')}
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="permission-read" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                    <label htmlFor="permission-read" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('agents.readMarketData')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="permission-analyze" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                    <label htmlFor="permission-analyze" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('agents.runAnalysis')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="permission-trade" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="permission-trade" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      {t('agents.executeTrades')}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('common.cancel')}
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
              {t('agents.saveChanges')}
            </button>
          </div>
        </div>}
    </div>;
}