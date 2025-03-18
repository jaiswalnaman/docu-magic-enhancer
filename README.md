
# Medical Document Processor

A ReactJS application that interacts with a Flask backend API to process, analyze, and enhance medical documents.

## Features

- Health status checking
- Document type detection
- Text enhancement
- OCR processing for images
- Comprehensive file processing (images, PDFs, DOCXs)
- Clean, modern UI inspired by Apple design principles

## Technologies Used

- ReactJS with TypeScript
- Tailwind CSS for styling
- Axios for API requests
- React Markdown for rendering enhanced text

## Setup Instructions

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone this repository:
   ```
   git clone <repository-url>
   cd medical-document-processor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update the API base URL:
   - Open `src/api/apiClient.ts`
   - Replace `<your-ngrok-id>` in the `BASE_URL` constant with your actual ngrok URL
   ```typescript
   const BASE_URL = 'https://<your-ngrok-id>.ngrok-free.app';
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

The application interacts with the following Flask backend API endpoints:

- `GET /health`: Check the health status of the backend
- `POST /detect-document-type`: Takes a text input and detects the document type
- `POST /enhance-text`: Takes a text input and an optional document type, returns enhanced medical text
- `POST /ocr-image`: Takes an image file, performs OCR, and returns the extracted text
- `POST /process-file`: Takes a file (image, PDF, or DOCX), processes it, and returns enhanced text

## Project Structure

```
src/
├── api/
│   ├── apiClient.ts     # Axios client configuration
│   ├── apiService.ts    # API service functions
│   └── types.ts         # TypeScript interfaces
├── components/
│   ├── FileProcessor.tsx     # File processing component
│   ├── FileUpload.tsx        # File upload component
│   ├── HealthCheck.tsx       # Health check component
│   ├── LoadingSpinner.tsx    # Loading spinner component
│   ├── Navbar.tsx            # Navigation bar component
│   ├── ResultDisplay.tsx     # Result display component
│   └── TextProcessor.tsx     # Text processing component
└── pages/
    ├── Index.tsx        # Home page
    └── NotFound.tsx     # 404 page
```

## Troubleshooting

- If you encounter CORS issues, ensure your Flask backend has CORS enabled
- For file upload failures, check that your Flask backend is correctly configured for multipart/form-data
- If the ngrok URL changes, update it in the `apiClient.ts` file

## License

MIT
