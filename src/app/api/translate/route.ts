import { NextRequest, NextResponse } from 'next/server';

// Cache translations in memory to avoid repeated API calls
const translationCache = new Map<string, string>();

// Language code mapping
const languageNames: Record<string, string> = {
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

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Text and target language are required' },
        { status: 400 }
      );
    }

    // If target language is English, return original text
    if (targetLanguage === 'en') {
      return NextResponse.json({ translatedText: text });
    }

    // Check cache first
    const cacheKey = `${text}:${targetLanguage}`;
    if (translationCache.has(cacheKey)) {
      return NextResponse.json({ 
        translatedText: translationCache.get(cacheKey),
        cached: true 
      });
    }

    // Use Gemini REST API for translation
    const targetLangName = languageNames[targetLanguage] || targetLanguage;
    const prompt = `Translate the following English text to ${targetLangName}. Provide ONLY the translation, no explanations or additional text:\n\n${text}`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;

    // Cache the translation
    translationCache.set(cacheKey, translatedText);

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
