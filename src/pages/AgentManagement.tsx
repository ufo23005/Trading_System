import React, { useState } from 'react';
import '@xyflow/react/dist/style.css';
import { PlusIcon, SearchIcon, SettingsIcon, PlayIcon, PauseIcon, TrashIcon, EditIcon, CpuIcon } from 'lucide-react';
import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
// Mock data - in a real app, this would come from API
const agentsList = [{
  id: 1,
  name: 'BTC Analyst',
  type: 'Cryptocurrency',
  status: 'active',
  lastRun: '2023-07-01 14:32',
  performance: '+5.8%',
  description: 'Analyzes Bitcoin price movements and market sentiment'
}, {
  id: 2,
  name: 'ETH Analyst',
  type: 'Cryptocurrency',
  status: 'active',
  lastRun: '2023-07-01 13:15',
  performance: '+3.2%',
  description: 'Monitors Ethereum ecosystem and gas prices'
}, {
  id: 3,
  name: 'Market Sentiment',
  type: 'General',
  status: 'active',
  lastRun: '2023-07-01 12:00',
  performance: 'N/A',
  description: 'Analyzes overall market sentiment from news and social media'
}, {
  id: 4,
  name: 'Risk Manager',
  type: 'System',
  status: 'active',
  lastRun: '2023-07-01 11:45',
  performance: 'N/A',
  description: 'Monitors portfolio risk and suggests position adjustments'
}, {
  id: 5,
  name: 'SOL Analyst',
  type: 'Cryptocurrency',
  status: 'paused',
  lastRun: '2023-06-30 23:10',
  performance: '-1.2%',
  description: 'Tracks Solana ecosystem developments and on-chain metrics'
}];
// Mock flow nodes and edges for the Flow Editor
const initialNodes = [{
  id: '1',
  type: 'input',
  data: {
    label: 'Market Data'
  },
  position: {
    x: 250,
    y: 5
  }
}, {
  id: '2',
  data: {
    label: 'Sentiment Analysis'
  },
  position: {
    x: 100,
    y: 100
  }
}, {
  id: '3',
  data: {
    label: 'Technical Analysis'
  },
  position: {
    x: 400,
    y: 100
  }
}, {
  id: '4',
  data: {
    label: 'Decision Engine'
  },
  position: {
    x: 250,
    y: 200
  }
}, {
  id: '5',
  type: 'output',
  data: {
    label: 'Trade Execution'
  },
  position: {
    x: 250,
    y: 300
  }
}];
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
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  return <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Agent Management
        </h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-4 w-4 mr-2" />
          Create New Agent
        </button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search agents..." />
        </div>
        <select className="block w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option value="">All Types</option>
          <option value="cryptocurrency">Cryptocurrency</option>
          <option value="general">General</option>
          <option value="system">System</option>
        </select>
        <select className="block w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>
      </div>
      {/* Agents List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Run
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Performance
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
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
                    {agent.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {agent.lastRun}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {agent.performance === 'N/A' ? <span className="text-gray-500 dark:text-gray-400">
                      N/A
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
            {selectedAgent ? `${selectedAgent.name} Flow` : 'Agent Flow Editor'}
          </h2>
          <button className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Edit Flow
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
            Agent Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Agent Name
                </label>
                <input type="text" id="agent-name" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800" defaultValue={selectedAgent.name} />
              </div>
              <div className="mb-4">
                <label htmlFor="agent-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Agent Type
                </label>
                <select id="agent-type" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800" defaultValue={selectedAgent.type.toLowerCase()}>
                  <option value="cryptocurrency">Cryptocurrency</option>
                  <option value="general">General</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="agent-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea id="agent-description" rows={3} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800" defaultValue={selectedAgent.description}></textarea>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="agent-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  AI Model
                </label>
                <select id="agent-model" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800">
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="llama-7b">Llama 7B (Ollama)</option>
                  <option value="mistral-7b">Mistral 7B (Ollama)</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="agent-schedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Run Schedule
                </label>
                <select id="agent-schedule" className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-800">
                  <option value="1min">Every 1 minute</option>
                  <option value="5min">Every 5 minutes</option>
                  <option value="15min">Every 15 minutes</option>
                  <option value="1hour">Hourly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Permissions
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input id="permission-read" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                    <label htmlFor="permission-read" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Read Market Data
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="permission-analyze" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
                    <label htmlFor="permission-analyze" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Run Analysis
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input id="permission-trade" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label htmlFor="permission-trade" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Execute Trades
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>}
    </div>;
}