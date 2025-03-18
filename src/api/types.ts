
export interface HealthResponse {
  status: string;
}

export interface DocumentTypeDetectionRequest {
  text: string;
}

export interface DocumentTypeDetectionResponse {
  document_type: string;
  confidence?: number;
}

export interface TextEnhancementRequest {
  text: string;
  document_type?: string;
}

export interface TextEnhancementResponse {
  enhanced_text: string;
  document_type?: string;
}

export interface OCRImageResponse {
  text: string;
  confidence?: number;
}

export interface ProcessFileResponse {
  text: string;
  document_type: string;
  enhanced_text: string;
  confidence?: number;
}

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
} | {
  error: string;
  status: number;
};

export interface FileUploadProps {
  onFileSelected: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

export type DocumentType = 'prescription' | 'lab_report' | 'clinical_note' | 'discharge_summary' | 'other' | 'auto_detect';
