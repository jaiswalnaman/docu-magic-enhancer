
import React, { useState } from 'react';
import { checkHealth } from '../api/apiService';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'sonner';

const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleHealthCheck = async () => {
    try {
      setIsLoading(true);
      setStatus(null);
      const response = await checkHealth();
      setStatus(response.status);

      if (response.status === 'ok') {
        toast.success('Backend is operational');
      } else {
        toast.warning('Backend is not healthy');
      }
    } catch (error) {
      console.error('Health check failed:', error);
      setStatus('error');
      toast.error('Failed to connect to backend');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 card-hover-effect">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">System Status</h2>
          <div 
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium
              ${status === 'ok' 
                ? 'bg-green-100 text-green-800' 
                : status === 'error' 
                  ? 'bg-red-100 text-red-800' 
                  : status 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
              }`}
          >
            {status === 'ok' 
              ? 'Online' 
              : status === 'error' 
                ? 'Error' 
                : status 
                  ? status 
                  : 'Unknown'}
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          Check if the backend API is operational and responding to requests
        </p>
        
        <button
          type="button"
          onClick={handleHealthCheck}
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${isLoading 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-medical-600 text-white hover:bg-medical-700 active:bg-medical-800'
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Checking...
            </span>
          ) : (
            'Check Health Status'
          )}
        </button>
      </div>
    </div>
  );
};

export default HealthCheck;
