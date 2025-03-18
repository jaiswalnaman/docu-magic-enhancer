
import React, { useRef, useState } from 'react';
import { FileUploadProps } from '../api/types';

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelected,
  acceptedFileTypes = 'image/*,application/pdf,.docx',
  maxSizeMB = 10
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File | null) => {
    setError(null);
    
    if (!file) {
      setFileName(null);
      onFileSelected(null);
      return;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`);
      setFileName(null);
      onFileSelected(null);
      return;
    }

    // Check file type
    const fileTypes = acceptedFileTypes.split(',');
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    const mimeTypeMatch = fileTypes.some(type => {
      if (type.includes('*')) {
        return file.type.startsWith(type.replace('*', ''));
      }
      if (type.startsWith('.')) {
        return `.${fileExtension}` === type;
      }
      return file.type === type;
    });

    if (!mimeTypeMatch) {
      setError(`File type not supported. Please upload ${acceptedFileTypes.replace(/,/g, ', ')}.`);
      setFileName(null);
      onFileSelected(null);
      return;
    }

    // Valid file
    setFileName(file.name);
    onFileSelected(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    validateAndSetFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelected(null);
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ease-in-out
        ${isDragging 
          ? 'border-medical-500 bg-medical-50' 
          : error 
            ? 'border-red-300 bg-red-50' 
            : fileName 
              ? 'border-green-300 bg-green-50' 
              : 'border-gray-300 hover:border-medical-300 bg-gray-50 hover:bg-gray-100'
        }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="sr-only"
        accept={acceptedFileTypes}
        onChange={handleFileChange}
      />
      
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        {!fileName ? (
          <>
            <svg 
              className={`h-12 w-12 mb-2 ${error ? 'text-red-400' : 'text-medical-400'}`} 
              stroke="currentColor" 
              fill="none" 
              viewBox="0 0 48 48" 
              aria-hidden="true"
            >
              <path 
                d="M24 8l3.293 3.293a1 1 0 01-1.414 1.414L24 10.828l-1.879 1.879a1 1 0 11-1.414-1.414L24 8zm0 0v12m12 16H12a4 4 0 01-4-4V12a4 4 0 014-4h8l4 4h8a4 4 0 014 4v20a4 4 0 01-4 4z" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <p className={`text-sm ${error ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
              {error || (
                <>
                  <span className="font-semibold text-medical-600">Click to upload</span> or drag and drop
                </>
              )}
            </p>
            <p className="text-xs text-gray-500">
              {error ? 'Please try again' : `${acceptedFileTypes.replace(/,/g, ', ')} (up to ${maxSizeMB}MB)`}
            </p>
          </>
        ) : (
          <div className="flex items-center space-x-2">
            <svg 
              className="h-8 w-8 text-green-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium truncate max-w-xs">{fileName}</span>
            <button 
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClearFile}
            >
              <svg 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
