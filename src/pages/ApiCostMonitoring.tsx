import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { DollarSignIcon, TrendingUpIcon, AlertCircleIcon, FilterIcon, DownloadIcon, CpuIcon, CoinsIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// Mock data - in a real app, this would come from API
const monthlyCostData = [{
  name: 'Jan',
  OpenAI: 240,
  Anthropic: 180,
  Ollama: 0,
  Deepseek: 60,
  Gemini: 100,
  Other: 50
}, {
  name: 'Feb',
  OpenAI: 260,
  Anthropic: 200,
  Ollama: 0,
  Deepseek: 70,
  Gemini: 110,
  Other: 60
}, {
  name: 'Mar',
  OpenAI: 280,
  Anthropic: 210,
  Ollama: 0,
  Deepseek: 80,
  Gemini: 120,
  Other: 70
}, {
  name: 'Apr',
  OpenAI: 300,
  Anthropic: 220,
  Ollama: 0,
  Deepseek: 90,
  Gemini: 130,
  Other: 40
}, {
  name: 'May',
  OpenAI: 320,
  Anthropic: 230,
  Ollama: 0,
  Deepseek: 100,
  Gemini: 140,
  Other: 50
}, {
  name: 'Jun',
  OpenAI: 340,
  Anthropic: 240,
  Ollama: 0,
  Deepseek: 110,
  Gemini: 150,
  Other: 60
}, {
  name: 'Jul',
  OpenAI: 360,
  Anthropic: 250,
  Ollama: 0,
  Deepseek: 120,
  Gemini: 160,
  Other: 70
}];
const dailyUsageData = [{
  date: '07/01',
  tokens: 1200000,
  cost: 24
}, {
  date: '07/02',
  tokens: 980000,
  cost: 19.6
}, {
  date: '07/03',
  tokens: 1500000,
  cost: 30
}, {
  date: '07/04',
  tokens: 1320000,
  cost: 26.4
}, {
  date: '07/05',
  tokens: 1100000,
  cost: 22
}, {
  date: '07/06',
  tokens: 950000,
  cost: 19
}, {
  date: '07/07',
  tokens: 1400000,
  cost: 28
}];
const modelDistributionData = [{
  name: 'GPT-4o',
  value: 180
}, {
  name: 'GPT-4.1',
  value: 120
}, {
  name: 'Anthropic Sonnet 4',
  value: 150
}, {
  name: 'Anthropic Opus 4',
  value: 100
}, {
  name: 'Gemini 2.5 Pro',
  value: 90
}, {
  name: 'Deepseek R1',
  value: 70
}, {
  name: 'Others',
  value: 50
}];
const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
const apiServiceCosts = [{
  id: 1,
  service: 'OpenAI API (GPT-4o)',
  usage: '8.5M tokens',
  cost: '$170.00',
  change: '+8%'
}, {
  id: 2,
  service: 'OpenAI API (GPT-4.1)',
  usage: '6.2M tokens',
  cost: '$124.00',
  change: '+12%'
}, {
  id: 3,
  service: 'OpenAI API (GPT-o3)',
  usage: '3.3M tokens',
  cost: '$66.00',
  change: 'New'
}, {
  id: 4,
  service: 'Anthropic (Sonnet 4)',
  usage: '7.5M tokens',
  cost: '$150.00',
  change: '+15%'
}, {
  id: 5,
  service: 'Anthropic (Opus 4)',
  usage: '2.5M tokens',
  cost: '$100.00',
  change: '+5%'
}, {
  id: 6,
  service: 'Anthropic (Haiku 3.5)',
  usage: '1.2M tokens',
  cost: '$18.00',
  change: 'New'
}, {
  id: 7,
  service: 'Ollama (4 Scout)',
  usage: '3.8M tokens',
  cost: '$0.00',
  change: '0%'
}, {
  id: 8,
  service: 'Ollama (4 Maverick)',
  usage: '2.0M tokens',
  cost: '$0.00',
  change: '0%'
}, {
  id: 9,
  service: 'Deepseek (R1)',
  usage: '4.2M tokens',
  cost: '$84.00',
  change: '+10%'
}, {
  id: 10,
  service: 'Deepseek (V3)',
  usage: '1.8M tokens',
  cost: '$36.00',
  change: 'New'
}, {
  id: 11,
  service: 'Gemini (2.5 Pro)',
  usage: '5.5M tokens',
  cost: '$110.00',
  change: '+7%'
}, {
  id: 12,
  service: 'Gemini (2.5 Flash)',
  usage: '2.5M tokens',
  cost: '$50.00',
  change: 'New'
}, {
  id: 13,
  service: 'Other Services',
  usage: 'Various',
  cost: '$70.00',
  change: '-8%'
}];

// Date picker component
function DatePicker({ selectedDate, onDateChange, isOpen, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
  const [viewMode, setViewMode] = useState('day'); // 'day', 'month', 'year'
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const shortMonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const handlePrevMonth = () => {
    if (viewMode === 'day') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    } else if (viewMode === 'month') {
      setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1));
    } else if (viewMode === 'year') {
      setCurrentMonth(new Date(currentMonth.getFullYear() - 10, currentMonth.getMonth(), 1));
    }
  };
  
  const handleNextMonth = () => {
    if (viewMode === 'day') {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    } else if (viewMode === 'month') {
      setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1));
    } else if (viewMode === 'year') {
      setCurrentMonth(new Date(currentMonth.getFullYear() + 10, currentMonth.getMonth(), 1));
    }
  };
  
  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateChange(newDate);
    onClose();
  };
  
  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setViewMode('day');
  };
  
  const handleYearSelect = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setViewMode('month');
  };
  
  const handleTitleClick = () => {
    if (viewMode === 'day') {
      setViewMode('month');
    } else if (viewMode === 'month') {
      setViewMode('year');
    }
  };
  
  const getDisplayTitle = () => {
    if (viewMode === 'day') {
      return `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    } else if (viewMode === 'month') {
      return currentMonth.getFullYear().toString();
    } else {
      return currentMonth.getFullYear().toString();
    }
  };
  
  const generateYearRange = () => {
    const currentYear = currentMonth.getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10;
    return Array.from({length: 12}, (_, i) => startYear + i);
  };
  
  // Reset to day view when calendar opens
  useEffect(() => {
    if (isOpen) {
      setViewMode('day');
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const renderDayView = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate.getDate() === day && 
                        selectedDate.getMonth() === currentMonth.getMonth() && 
                        selectedDate.getFullYear() === currentMonth.getFullYear();
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-10 w-10 text-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isSelected 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return (
      <>
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="h-10 w-10 text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </>
    );
  };
  
  const renderMonthView = () => {
    return (
      <div className="grid grid-cols-3 gap-3">
        {shortMonthNames.map((month, index) => {
          const isSelected = selectedDate.getMonth() === index && 
                            selectedDate.getFullYear() === currentMonth.getFullYear();
          
          return (
            <button
              key={index}
              onClick={() => handleMonthSelect(index)}
              className={`h-12 px-3 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isSelected 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>
    );
  };
  
  const renderYearView = () => {
    const years = generateYearRange();
    
    return (
      <div className="grid grid-cols-3 gap-3">
        {years.map((year) => {
          const isSelected = selectedDate.getFullYear() === year;
          
          return (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`h-12 px-3 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isSelected 
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-6 w-80">
      <div className="flex items-center justify-between mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        <button 
          onClick={handleTitleClick}
          className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded-lg transition-colors"
        >
          {getDisplayTitle()}
        </button>
        
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
      
      {viewMode === 'day' && renderDayView()}
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'year' && renderYearView()}
    </div>
  );
}

// Service Filter component
function ServiceFilter({ selectedServices, onServiceChange, isOpen, onClose }) {
  const filterDropdownRef = useRef(null);
  
  const services = [
    { id: 'gpt-4o', name: 'OpenAI API (GPT-4o)' },
    { id: 'gpt-4.1', name: 'OpenAI API (GPT-4.1)' },
    { id: 'gpt-o3', name: 'OpenAI API (GPT-o3)' },
    { id: 'sonnet-4', name: 'Anthropic (Sonnet 4)' },
    { id: 'opus-4', name: 'Anthropic (Opus 4)' },
    { id: 'haiku-3.5', name: 'Anthropic (Haiku 3.5)' },
    { id: 'ollama-scout', name: 'Ollama (4 Scout)' },
    { id: 'ollama-maverick', name: 'Ollama (4 Maverick)' },
    { id: 'deepseek-r1', name: 'Deepseek (R1)' },
    { id: 'deepseek-v3', name: 'Deepseek (V3)' },
    { id: 'gemini-2.5-pro', name: 'Gemini (2.5 Pro)' },
    { id: 'gemini-2.5-flash', name: 'Gemini (2.5 Flash)' },
    { id: 'other', name: 'Other Services' }
  ];
  
  const handleServiceToggle = (serviceId) => {
    const updatedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    onServiceChange(updatedServices);
  };
  
  const handleSelectAll = () => {
    const allServiceIds = services.map(service => service.id);
    onServiceChange(allServiceIds);
  };
  
  const handleDeselectAll = () => {
    onServiceChange([]);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
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
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={filterDropdownRef}
      className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 w-80 max-h-96 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Filter Services</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {selectedServices.length} of {services.length} selected
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto p-2">
        {services.map((service) => (
          <label
            key={service.id}
            className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceToggle(service.id)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
            />
            <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
              {service.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function ApiCostMonitoring() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 1)); // July 2024
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([
    'gpt-4o', 'gpt-4.1', 'gpt-o3', 'sonnet-4', 'opus-4', 'haiku-3.5', 
    'ollama-scout', 'ollama-maverick', 'deepseek-r1', 'deepseek-v3', 
    'gemini-2.5-pro', 'gemini-2.5-flash', 'other'
  ]); // Initially all services selected
  const datePickerRef = useRef(null);
  const filterRef = useRef(null);
  
  const formatDateDisplay = (date) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    // Filter data based on the selected date
    filterDataByDate(newDate);
  };
  
  const handleServiceChange = (updatedServices) => {
    setSelectedServices(updatedServices);
    // Filter data based on selected services
    filterDataByServices(updatedServices);
  };
  
  const filterDataByDate = (date) => {
    // In a real app, this would filter data from API based on the selected date
    // For now, we'll just log the filtering action
    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    
    console.log(`Filtering data for ${monthName} ${year}`);
    
    // Example: Update the monthly data to reflect the selected period
    // This would typically involve making an API call with the date parameters
    updateDataForSelectedPeriod(date);
  };
  
  const updateDataForSelectedPeriod = (date) => {
    // This would typically update your data arrays based on the selected date
    // For demonstration, we'll show how this would work
    const month = date.getMonth();
    const year = date.getFullYear();
    
    // Example logic for updating data (in real app, this would come from API)
    if (year === 2024 && month === 6) { // July 2024
      console.log('Showing July 2024 data');
    } else if (year === 2024 && month === 5) { // June 2024
      console.log('Would show June 2024 data');
    } else {
      console.log(`Would show data for ${date.toLocaleDateString()}`);
    }
    
    // In a real app, you would:
    // 1. Make API call with date parameters
    // 2. Update state with new data
    // 3. Charts would automatically re-render with new data
  };
  
  const filterDataByServices = (services) => {
    // In a real app, this would filter charts and table data based on selected services
    console.log('Filtering data for services:', services);
    
    // Example logic for filtering services
    const serviceNames = services.map(serviceId => {
      const serviceMap = {
        'gpt-4o': 'OpenAI API (GPT-4o)',
        'gpt-4.1': 'OpenAI API (GPT-4.1)', 
        'gpt-o3': 'OpenAI API (GPT-o3)',
        'sonnet-4': 'Anthropic (Sonnet 4)',
        'opus-4': 'Anthropic (Opus 4)',
        'haiku-3.5': 'Anthropic (Haiku 3.5)',
        'ollama-scout': 'Ollama (4 Scout)',
        'ollama-maverick': 'Ollama (4 Maverick)',
        'deepseek-r1': 'Deepseek (R1)',
        'deepseek-v3': 'Deepseek (V3)',
        'gemini-2.5-pro': 'Gemini (2.5 Pro)',
        'gemini-2.5-flash': 'Gemini (2.5 Flash)',
        'other': 'Other Services'
      };
      return serviceMap[serviceId];
    });
    
    console.log(`Showing data for: ${serviceNames.join(', ')}`);
    
    // In a real app, you would:
    // 1. Filter monthlyCostData, dailyUsageData, modelDistributionData, apiServiceCosts
    // 2. Update chart data based on selected services
    // 3. Recalculate totals and statistics
    // 4. Update summary cards with filtered data
  };
  
  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          API Cost Monitoring
        </h1>
        <div className="flex space-x-3">
          <div className="relative" ref={datePickerRef}>
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              {formatDateDisplay(selectedDate)}
            </button>
            
            <DatePicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
            />
          </div>
          
          <div className="relative" ref={filterRef}>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedServices.length < 13 ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
              {selectedServices.length < 13 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                  {selectedServices.length}
                </span>
              )}
            </button>
            
            <ServiceFilter
              selectedServices={selectedServices}
              onServiceChange={handleServiceChange}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-300">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Monthly Cost
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $978.00
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <DollarSignIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUpIcon className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium">+11.2%</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              from last month
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                LLM API Cost
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $908.00
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <CpuIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              92.8% of total API costs
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Cost per Trade
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $1.95
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <CoinsIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUpIcon className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500 font-medium">+0.20</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">
              from last month
            </span>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Costs by Provider */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Monthly Costs by LLM Provider
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyCostData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="OpenAI" stackId="a" fill="#8884d8" />
                <Bar dataKey="Anthropic" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Deepseek" stackId="a" fill="#ffc658" />
                <Bar dataKey="Gemini" stackId="a" fill="#ff8042" />
                <Bar dataKey="Other" stackId="a" fill="#a4de6c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Model Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            LLM Model Cost Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={modelDistributionData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {modelDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {/* Daily LLM Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Daily LLM Usage
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyUsageData} margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="tokens" stroke="#8884d8" name="Tokens Used" />
                <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#82ca9d" name="Cost ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* API Services Cost Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            LLM API Services Cost Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  LLM Service
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {apiServiceCosts.map(service => <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {service.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {service.usage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {service.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center ${service.change === '0%' ? 'text-gray-500 dark:text-gray-400' : service.change === 'New' ? 'text-blue-600 dark:text-blue-400' : service.change.startsWith('+') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {service.change}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* Alert Section */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircleIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              OpenAI GPT-4.1 costs have increased by 12% this month. Consider
              using GPT-o3 for less critical tasks to optimize costs.
            </p>
          </div>
        </div>
      </div>
    </div>;
}