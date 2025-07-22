import { AlertTriangle, Brain, Server } from 'lucide-react';

export function OllamaSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Ollama</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage local AI models with Ollama for enhanced privacy and performance.
          </p>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-300">Ollama Not Installed</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Install Ollama to use local AI models. Visit{' '}
              <a 
                href="https://ollama.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:no-underline text-blue-600 dark:text-blue-400"
              >
                ollama.com
              </a>{' '}
              to download and install.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-800 dark:text-gray-100">Available Models</h3>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            0 downloaded
          </span>
        </div>
        
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No models available</p>
        </div>
      </div>
    </div>
  );
}