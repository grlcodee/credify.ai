'use server';

import { analyzeContentAndProvideVerdict } from '@/ai/flows/analyze-content-and-provide-verdict';
import type { AnalyzeContentOutput } from '@/ai/flows/analyze-content-and-provide-verdict';

export async function getAnalysis(content: string): Promise<AnalyzeContentOutput> {
  if (!content || content.trim().length === 0) {
    throw new Error('Content cannot be empty.');
  }

  try {
    const analysisResult = await analyzeContentAndProvideVerdict({ content });
    return analysisResult;
  } catch (error) {
    console.error('AI analysis failed:', error);
    // In a real application, you might want to log this error to a monitoring service.
    throw new Error('Failed to analyze content due to an internal error. Please try again later.');
  }
}
