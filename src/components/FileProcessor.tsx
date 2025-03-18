
import React, { useState } from 'react';
import FileUpload from './FileUpload';
import { ocrImage, processFile } from '../api/apiService';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'sonner';

interface FileProcessorProps {
  onResultChange: (result: { type: 'ocr' | 'process'; data: any }) => void;
}

const FileProcessor: React.FC<FileProcessorProps> = ({ onResultChange }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
    if (file) {
      const type = file.type;
      setFileType(type);
    } else {
      setFileType(null);
    }
  };

  const handleOCRImage = async () => {
    if (!selectedFile) {
      toast.warning('Please select an image file first');
      return;
    }

    const isImage = selectedFile.type.startsWith('image/');
    if (!isImage) {
      toast.error('OCR processing requires an image file');
      return;
    }

    try {
      setIsProcessingOCR(true);
      const result = await ocrImage(selectedFile);
      onResultChange({ type: 'ocr', data: result });
      toast.success('OCR processing completed successfully');
    } catch (error) {
      console.error('Error processing OCR:', error);
      toast.error('Failed to process image with OCR');
    } finally {
      setIsProcessingOCR(false);
    }
  };

  const handleProcessFile = async () => {
    if (!selectedFile) {
      toast.warning('Please select a file first');
      return;
    }

    try {
      setIsProcessingFile(true);
      const result = await processFile(selectedFile);
      onResultChange({ type: 'process', data: result });
      toast.success('File processed successfully');
    } catch (error) {
      console.error('Error processing file:', error);
      toast.error('Failed to process file');
    } finally {
      setIsProcessingFile(false);
    }
  };

  const isImage = fileType?.startsWith('image/');
  const isPDF = fileType === 'application/pdf';
  const isDOCX = fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const isProcessableFile = isImage || isPDF || isDOCX;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 card-hover-effect">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">File Processing</h2>
        <div className="space-y-4">
          <FileUpload 
            onFileSelected={handleFileSelected}
            acceptedFileTypes="image/*,application/pdf,.docx"
            maxSizeMB={10}
          />

          {selectedFile && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {isImage ? (
                  <span>Image files can be processed with OCR or full processing</span>
                ) : isPDF ? (
                  <span>PDF files will be processed using OCR and enhancement</span>
                ) : isDOCX ? (
                  <span>DOCX files will be processed using text extraction and enhancement</span>
                ) : (
                  <span className="text-red-500">Unsupported file type</span>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleOCRImage}
                  disabled={isProcessingOCR || isProcessingFile || !isImage}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${(isProcessingOCR || isProcessingFile || !isImage)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-medical-600 text-white hover:bg-medical-700 active:bg-medical-800'
                    }`}
                >
                  {isProcessingOCR ? (
                    <span className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </span>
                  ) : (
                    'OCR Image'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleProcessFile}
                  disabled={isProcessingOCR || isProcessingFile || !isProcessableFile}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${(isProcessingOCR || isProcessingFile || !isProcessableFile)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                    }`}
                >
                  {isProcessingFile ? (
                    <span className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </span>
                  ) : (
                    'Process File'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileProcessor;
