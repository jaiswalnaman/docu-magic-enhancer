
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileProcessor from '../components/FileProcessor';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const handleResultChange = (result: {
    type: 'text' | 'enhancement' | 'ocr' | 'process';
    data: any;
  } | null) => {
    if (result) {
      navigate('/results', { state: { result } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="mt-6">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">Medical Document Processor</h1>
          <p className="text-gray-600 mb-8">Process, analyze, and enhance medical documents using AI</p>
          
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6 animate-fade-in">
              <FileProcessor onResultChange={handleResultChange} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
