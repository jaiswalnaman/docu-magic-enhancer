
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResultDisplayProps {
  result: {
    type: 'text' | 'enhancement' | 'ocr' | 'process';
    data: any;
  } | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full transition-all duration-300 card-hover-effect">
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Results</h2>
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="mt-2 text-sm font-medium">No results to display</p>
              <p className="mt-1 text-xs text-gray-500">
                Process text or files to see results here
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderResultContent = () => {
    switch (result.type) {
      case 'text':
        return (
          <div className="animate-fade-in-up">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium mb-2">Document Type Detection</h3>
              <div className="flex items-center space-x-2">
                <div 
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-100 text-medical-800"
                >
                  {result.data.document_type}
                </div>
                {result.data.confidence !== undefined && (
                  <span className="text-xs text-gray-500">
                    Confidence: {Math.round(result.data.confidence * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'enhancement':
        return (
          <div className="animate-fade-in-up">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium mb-2">Enhanced Text</h3>
              {result.data.document_type && (
                <div className="mb-2">
                  <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-100 text-medical-800 inline-block">
                    {result.data.document_type}
                  </div>
                </div>
              )}
              <div className="prose prose-sm max-w-none markdown-content">
                <ReactMarkdown>{result.data.enhanced_text}</ReactMarkdown>
              </div>
            </div>
          </div>
        );
        
      case 'ocr':
        return (
          <div className="animate-fade-in-up">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-md font-medium mb-2">OCR Result</h3>
              {result.data.confidence !== undefined && (
                <div className="mb-2">
                  <span className="text-xs text-gray-500">
                    Confidence: {Math.round(result.data.confidence * 100)}%
                  </span>
                </div>
              )}
              <pre className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-800 overflow-auto whitespace-pre-wrap">
                {result.data.text}
              </pre>
            </div>
          </div>
        );
        
      case 'process':
        return (
          <div className="animate-fade-in-up">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-md font-medium mb-2">Document Type</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div 
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-medical-100 text-medical-800"
                    >
                      {result.data.document_type}
                    </div>
                    {result.data.confidence !== undefined && (
                      <span className="text-xs text-gray-500">
                        Confidence: {Math.round(result.data.confidence * 100)}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Extracted Text</h3>
                  <pre className="bg-white p-3 rounded border border-gray-200 text-sm text-gray-800 overflow-auto whitespace-pre-wrap max-h-28">
                    {result.data.text}
                  </pre>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Enhanced Text</h3>
                  <div className="prose prose-sm max-w-none markdown-content">
                    <ReactMarkdown>{result.data.enhanced_text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
            <p>Unknown result type: {result.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 card-hover-effect">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Results</h2>
        <div className="overflow-auto max-h-[600px] custom-scrollbar">
          {renderResultContent()}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
