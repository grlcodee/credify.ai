import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken } from '@/ai/google-auth';

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType } = await request.json();

    if (!imageBase64 || !mimeType) {
      return NextResponse.json(
        { error: 'Missing imageBase64 or mimeType' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    if (!accessToken) {
      console.error('[/api/ocr] No access token available');
      return NextResponse.json({ text: '', confidence: 0, error: 'Server misconfiguration: missing Google access token. Ensure service-account.json is present and has the required roles.' }, { status: 500 });
    }

    console.log('[/api/ocr] Calling Gemini Vision API for text extraction');

    // Call Gemini Vision API with the actual image
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Extract all text from this image. Return only the extracted text, preserving the structure and layout as much as possible. If there's no readable text, respond with 'NO_TEXT_FOUND'."
              },
              {
                inlineData: {
                  mimeType,
                  data: imageBase64,
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMsg = errorData.error?.message || 'Unknown error';
      console.error('[/api/ocr] API Error:', errorMsg);
      console.error('[/api/ocr] Full error data:', JSON.stringify(errorData, null, 2));
      throw new Error(`OCR failed: ${errorMsg}`);
    }

    const data = await response.json();
    console.log('[/api/ocr] API Response received');
    const extractedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[/api/ocr] Extracted text length:', extractedText.length);
    console.log('[/api/ocr] Extracted text preview:', extractedText.substring(0, 100));

    if (extractedText === 'NO_TEXT_FOUND' || !extractedText.trim()) {
      return NextResponse.json({
        text: '',
        confidence: 0,
        error: 'No text found in the image'
      });
    }

    return NextResponse.json({
      text: extractedText,
      confidence: 0.85,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during OCR';
    console.error('[/api/ocr] Error:', errorMessage);
    return NextResponse.json(
      { 
        text: '',
        confidence: 0,
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
