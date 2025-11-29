'use client';

/**
 * @fileOverview OCR service client - calls /api/ocr endpoint for text extraction
 */

export interface OCRResult {
  text: string;
  confidence: number;
  error?: string;
}

export async function extractTextFromImage(imageBase64: string, mimeType: string): Promise<OCRResult> {
  try {
    const response = await fetch('/api/ocr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        mimeType,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'OCR request failed');
    }

    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during OCR';
    return {
      text: '',
      confidence: 0,
      error: errorMessage
    };
  }
}

export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract base64 data (remove data:image/...;base64, prefix)
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function getMimeType(file: File): string {
  if (file.type) return file.type;
  
  const ext = file.name.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp'
  };
  
  return mimeTypes[ext as string] || 'image/jpeg';
}
