
import React, { useState } from 'react';
import { DocumentType } from '../api/types';
import { detectDocumentType, enhanceText } from '../api/apiService';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'sonner';

interface TextProcessorProps {
  onResultChange: (result: { type: 'text' | 'enhancement'; data: any }) => void;
}

const TextProcessor: React.FC<TextProcessorProps> = ({ onResultChange }) => {
  const [inputText, setInputText] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('auto_detect');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const documentTypes: { value: DocumentType; label: string }[] = [
    { value: 'auto_detect', label: 'Auto-detect' },
    { value: 'prescription', label: 'Prescription' },
    { value: 'lab_report', label: 'Lab Report' },
    { value: 'clinical_note', label: 'Clinical Note' },
    { value: 'discharge_summary', label: 'Discharge Summary' },
    { value: 'other', label: 'Other' },
  ];

  const handleDetectType = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to detect the document type');
      return;
    }

    try {
      setIsDetecting(true);
      const result = await detectDocumentType({ text: inputText });
      onResultChange({ type: 'text', data: result });
      toast.success(`Detected document type: ${result.document_type}`);
    } catch (error) {
      console.error('Error detecting document type:', error);
      toast.error('Failed to detect document type');
    } finally {
      setIsDetecting(false);
    }
  };

  const handleEnhanceText = async () => {
    if (!inputText.trim()) {
      toast.warning('Please enter some text to enhance');
      return;
    }

    try {
      setIsEnhancing(true);
      const result = await enhanceText({ 
        text: inputText,
        document_type: documentType === 'auto_detect' ? undefined : documentType,
      });
      onResultChange({ type: 'enhancement', data: result });
      toast.success('Text enhanced successfully');
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast.error('Failed to enhance text');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 card-hover-effect">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Text Processing</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Medical Text
            </label>
            <textarea
              id="text-input"
              rows={6}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter medical text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="document-type" className="block text-sm font-medium text-gray-700 mb-1">
              Document Type
            </label>
            <select
              id="document-type"
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-medical-500 focus:border-transparent transition-all duration-200"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              {documentType === 'auto_detect' 
                ? 'The system will attempt to detect the document type automatically' 
                : 'Document type will be used for text enhancement'}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleDetectType}
              disabled={isDetecting || isEnhancing || !inputText.trim()}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${(isDetecting || isEnhancing || !inputText.trim())
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-medical-600 text-white hover:bg-medical-700 active:bg-medical-800'
                }`}
            >
              {isDetecting ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Detecting...
                </span>
              ) : (
                'Detect Type'
              )}
            </button>
            
            <button
              type="button"
              onClick={handleEnhanceText}
              disabled={isDetecting || isEnhancing || !inputText.trim()}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${(isDetecting || isEnhancing || !inputText.trim())
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                }`}
            >
              {isEnhancing ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Enhancing...
                </span>
              ) : (
                'Enhance Text'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;
