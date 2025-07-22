import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, ClockIcon, DollarSignIcon, PercentIcon, TrendingUpIcon, CoinsIcon } from 'lucide-react';
// Mock data - in a real app, this would come from API
const portfolioData = [{
  name: 'BTC',
  value: 45,
  color: '#F7931A'
}, {
  name: 'ETH',
  value: 30,
  color: '#627EEA'
}, {
  name: 'SOL',
  value: 15,
  color: '#00FFA3'
}, {
  name: 'ADA',
  value: 10,
  color: '#0033AD'
}];
const profitLossData = [{
  date: '2023-01',
  profit: 4000,
  loss: -2400
}, {
  date: '2023-02',
  profit: 3000,
  loss: -1398
}, {
  date: '2023-03',
  profit: 2000,
  loss: -9800
}, {
  date: '2023-04',
  profit: 2780,
  loss: -3908
}, {
  date: '2023-05',
  profit: 1890,
  loss: -4800
}, {
  date: '2023-06',
  profit: 2390,
  loss: -3800
}, {
  date: '2023-07',
  profit: 3490,
  loss: -4300
}];
const accountHistoryData = [{
  date: '2023-01-01',
  balance: 10000
}, {
  date: '2023-02-01',
  balance: 12000
}, {
  date: '2023-03-01',
  balance: 9800
}, {
  date: '2023-04-01',
  balance: 11500
}, {
  date: '2023-05-01',
  balance: 13800
}, {
  date: '2023-06-01',
  balance: 15000
}, {
  date: '2023-07-01',
  balance: 14200
}];
const recentTrades = [{
  id: 1,
  pair: 'BTC/USDT',
  type: 'BUY',
  amount: '0.05 BTC',
  price: '42,350.00',
  value: '2,117.50',
  time: '2023-07-01 14:32'
}, {
  id: 2,
  pair: 'ETH/USDT',
  type: 'SELL',
  amount: '1.2 ETH',
  price: '2,205.75',
  value: '2,646.90',
  time: '2023-07-01 12:15'
}, {
  id: 3,
  pair: 'SOL/USDT',
  type: 'BUY',
  amount: '15 SOL',
  price: '103.45',
  value: '1,551.75',
  time: '2023-06-30 23:45'
}, {
  id: 4,
  pair: 'BTC/USDT',
  type: 'SELL',
  amount: '0.02 BTC',
  price: '41,980.00',
  value: '839.60',
  time: '2023-06-30 18:22'
}, {
  id: 5,
  pair: 'ETH/USDT',
  type: 'BUY',
  amount: '0.8 ETH',
  price: '2,195.30',
  value: '1,756.24',
  time: '2023-06-29 09:11'
}];
export function TradingDashboard() {
  return <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Trading Dashboard
        </h1>
        <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow flex items-center">
          <ClockIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: 2 minutes ago
          </span>
        </div>
      </div>
      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Balance
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $14,235.80
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <DollarSignIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+5.25%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              from last month
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Margin Used
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $3,850.00
              </p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
              <PercentIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              27% of total balance
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Daily P&L
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                +$320.50
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <TrendingUpIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+2.3%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">today</span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Open Positions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <CoinsIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Across 5 cryptocurrencies
            </span>
          </div>
        </div>
      </div>
      {/* Charts and Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Allocation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Portfolio Allocation
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={portfolioData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {portfolioData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {portfolioData.map(item => <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: item.color
            }}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {item.name}: {item.value}%
                </span>
              </div>)}
          </div>
        </div>
        {/* Account Balance History */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Account Balance History
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accountHistoryData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#3b82f6" activeDot={{
                r: 8
              }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Profit & Loss Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Profit & Loss Analysis
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitLossData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="profit" fill="#10b981" />
                <Bar dataKey="loss" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Trades */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Recent Trades
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pair
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value (USDT)
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentTrades.map(trade => <tr key={trade.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {trade.pair}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${trade.type === 'BUY' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {trade.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {trade.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {trade.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {trade.time}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}