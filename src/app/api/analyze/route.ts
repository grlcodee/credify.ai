import { analyzeContentAndProvideVerdict } from '@/ai/flows/analyze-content-and-provide-verdict';

// Supported languages
const SUPPORTED_LANGUAGES = [
  'en', 'hi', 'ta', 'te', 'kn', 'bn', 'mr', 'gu', 'pa'
] as const;

type Language = typeof SUPPORTED_LANGUAGES[number];

const LANGUAGE_NAMES: Record<Language, string> = {
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

export async function POST(request: Request) {
  try {
    const { content, language = 'en', imageBase64, mimeType } = await request.json();

    if (!content || typeof content !== 'string') {
      return Response.json(
        { error: 'Missing or invalid "content" field' },
        { status: 400 }
      );
    }

    // Validate language
    const lang = (SUPPORTED_LANGUAGES.includes(language) ? language : 'en') as Language;

    const result = await analyzeContentAndProvideVerdict({ 
      content,
      language: lang,
      languageName: LANGUAGE_NAMES[lang],
      imageBase64,
      mimeType
    });

    return Response.json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[/api/analyze] Error:', errorMessage);
    return Response.json(
      { error: errorMessage || 'Failed to analyze content' },
      { status: 500 }
    );
  }
}
