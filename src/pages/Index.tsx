
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HealthCheck from '../components/HealthCheck';
import TextProcessor from '../components/TextProcessor';
import FileProcessor from '../components/FileProcessor';
import ResultDisplay from '../components/ResultDisplay';

const Index: React.FC = () => {
  const [result, setResult] = useState<{
    type: 'text' | 'enhancement' | 'ocr' | 'process';
    data: any;
  } | null>(null);

  const handleResultChange = (newResult: typeof result) => {
    setResult(newResult);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="mt-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Medical Document Processor</h1>
          <p className="text-gray-600 mb-8">Process, analyze, and enhance medical documents using AI</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6 animate-fade-in">
              <HealthCheck />
              <TextProcessor onResultChange={handleResultChange} />
              <FileProcessor onResultChange={handleResultChange} />
            </div>
            
            <div className="animate-fade-in lg:sticky lg:top-24 lg:h-[calc(100vh-100px)]">
              <ResultDisplay result={result} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
