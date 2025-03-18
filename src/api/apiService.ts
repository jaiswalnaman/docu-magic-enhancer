
import apiClient from './apiClient';
import {
  HealthResponse,
  DocumentTypeDetectionRequest,
  DocumentTypeDetectionResponse,
  TextEnhancementRequest,
  TextEnhancementResponse,
  OCRImageResponse,
  ProcessFileResponse,
} from './types';

// Health check endpoint
export const checkHealth = async (): Promise<HealthResponse> => {
  const response = await apiClient.get<HealthResponse>('/health');
  return response.data;
};

// Document type detection
export const detectDocumentType = async (request: DocumentTypeDetectionRequest): Promise<DocumentTypeDetectionResponse> => {
  const response = await apiClient.post<DocumentTypeDetectionResponse>('/detect-document-type', request);
  return response.data;
};

// Text enhancement
export const enhanceText = async (request: TextEnhancementRequest): Promise<TextEnhancementResponse> => {
  const response = await apiClient.post<TextEnhancementResponse>('/enhance-text', request);
  return response.data;
};

// OCR image
export const ocrImage = async (file: File): Promise<OCRImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<OCRImageResponse>('/ocr-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Process file (image, PDF, DOCX)
export const processFile = async (file: File): Promise<ProcessFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<ProcessFileResponse>('/process-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};
