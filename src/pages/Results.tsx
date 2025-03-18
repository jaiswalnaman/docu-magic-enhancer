
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ResultDisplay from '../components/ResultDisplay';

const Results = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="mt-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Results</h1>
          <p className="text-gray-600 mb-8">View your processed document results below</p>
          <div className="animate-fade-in">
            <ResultDisplay result={result} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
