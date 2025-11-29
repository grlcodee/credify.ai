'use server';

import { analyzeContentAndProvideVerdict } from '@/ai/flows/analyze-content-and-provide-verdict';
import type { AnalyzeContentOutput } from '@/ai/flows/analyze-content-and-provide-verdict';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  bn: 'Bengali',
  mr: 'Marathi',
  gu: 'Gujarati',
  pa: 'Punjabi',
};

export async function getAnalysis(
  content: string, 
  language: string = 'en',
  imageBase64?: string,
  mimeType?: string
): Promise<AnalyzeContentOutput> {
  if (!content || content.trim().length === 0) {
    throw new Error('Content cannot be empty.');
  }

  try {
    const languageName = LANGUAGE_NAMES[language] || 'English';
    const analysisResult = await analyzeContentAndProvideVerdict({ 
      content, 
      language,
      languageName,
      imageBase64,
      mimeType
    });
    return analysisResult;
  } catch (error) {
    console.error('AI analysis failed:', error);
    // In a real application, you might want to log this error to a monitoring service.
    throw new Error('Failed to analyze content due to an internal error. Please try again later.');
  }
}
