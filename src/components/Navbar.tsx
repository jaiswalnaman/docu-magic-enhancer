
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm backdrop-blur-sm bg-opacity-80 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 text-medical-600" 
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 12H15M12 9V15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="ml-2 text-xl font-medium tracking-tight text-gray-900">
              Medical Document Processor
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
