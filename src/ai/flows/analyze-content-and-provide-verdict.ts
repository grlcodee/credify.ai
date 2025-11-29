'use server';

/**
 * @fileOverview Analyzes content using Research Agent workflow with web search and evidence gathering.
 *
 * - analyzeContentAndProvideVerdict - A function that handles the content analysis process.
 * - AnalyzeContentInput - The input type for the analyzeContentAndprovideVerdict function.
 * - AnalyzeContentOutput - The return type for the analyzeContentAndprovideVerdict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as cheerio from 'cheerio';
import { tavily } from '@tavily/core';
import { getAccessToken } from '@/ai/google-auth';

// Initialize Tavily client
const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY || '' });

// Retry helper with exponential backoff for rate limiting
async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | unknown = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const errorStr = String(error);
      
      // Check if it's a rate limit error (429)
      if (errorStr.includes('429') || errorStr.includes('Too Many Requests') || errorStr.includes('Resource exhausted')) {
        if (attempt < maxRetries - 1) {
          const delayMs = baseDelayMs * Math.pow(2, attempt) + Math.random() * 1000;
          console.warn(`[Retry] Rate limited (429). Attempt ${attempt + 1}/${maxRetries}. Waiting ${Math.round(delayMs)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
      }
      
      // For other errors, don't retry
      throw error;
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Analyze content with image using Gemini Vision API
 * This function calls Gemini directly with both text and image for multimodal analysis
 */
async function analyzeWithVisionAPI(
  content: string,
  imageBase64: string,
  mimeType: string,
  researchSources: Array<{ url: string; title: string; snippet: string }>,
  language?: string,
  languageName?: string
): Promise<AnalyzeContentOutput> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error('No access token available for Gemini Vision API');
  }

  // Build the prompt
  let promptText = `You are an expert fact-checker analyzing content using evidence from multiple verified web sources.

Content to Analyze:
${content}

NOTE: An image has been provided for visual analysis. Consider both the visual content of the image AND the extracted text when forming your verdict. Analyze visual elements like:
- Visual misinformation (e.g., doctored images, misleading captions)
- Context of the image (does it match the claim?)
- Authenticity of visual elements
- Any manipulated or misleading visual content

`;

  if (researchSources.length > 0) {
    promptText += `\nResearch Evidence from Web Sources:\n`;
    researchSources.forEach((source, index) => {
      promptText += `Source ${index}: ${source.title}\nURL: ${source.url}\nExcerpt: ${source.snippet}\n---\n`;
    });
  }

  promptText += `\nYour task:
1. Analyze the content claim carefully including visual analysis of the image
2. Review all provided research sources and their evidence
3. Determine the factual accuracy based on the evidence
4. Provide a credibility score (0-100) and verdict

Guidelines:
- If the content discusses a future/hypothetical event, set factCheckVerdict to "Speculative"
- If multiple credible sources confirm the claim, mark as "True" (score 70-100)
- If multiple credible sources contradict the claim, mark as "False" (score 0-30)
- If sources show partial truth or context is missing, mark as "Misleading" (score 30-70)
- If insufficient evidence from sources, mark as "Not enough verified data available" (score 40-60)
- For image-based claims, consider if the image is manipulated, out of context, or authentic

AI-Generated Content Detection:
- Determine if content appears to be AI-generated
- Provide aiGenerated (boolean), aiGenerationConfidence (0-100), and aiGenerationIndicators (array of reasons)

Emotion and Bias Detection (Sentence-Level Analysis):
For EACH sentence in the content:
1. Detect emotion: "anger", "fear", "neutral", or "joy"
   - anger: hostile, aggressive, antagonistic language
   - fear: threatening, alarming, anxiety-inducing language
   - neutral: objective, factual, balanced language
   - joy: positive, uplifting, optimistic language

2. Detect bias type: "cherry-picking", "sensationalism", "exaggeration", "loaded-language", or "none"
   - cherry-picking: selective evidence, ignoring contradictory data
   - sensationalism: shocking, dramatic, attention-grabbing language
   - exaggeration: overstatement, hyperbole, extreme claims
   - loaded-language: emotionally charged words, value-laden terms
   - none: neutral, objective language

Then provide article-level aggregation:
- dominantEmotion: most prevalent emotion
- emotionDistribution: percentage breakdown (anger, fear, neutral, joy)
- dominantBiasType: most prevalent bias type
- biasDistribution: percentage breakdown (cherryPicking, sensationalism, exaggeration, loadedLanguage, none)
- overallBiasScore: 0-100 (intensity of bias)
- overallEmotionScore: 0-100 (intensity of emotion)
`;

  if (languageName) {
    promptText += `\nIMPORTANT: Respond ENTIRELY in ${languageName} language. All text fields must be written in ${languageName}.\n`;
  }

  promptText += `\nReturn a JSON object with the following fields:
1. credibilityScore (number 0-100)
2. factCheckVerdict (string: "True"/"Misleading"/"False"/"Not enough verified data available"/"Speculative"/"Questionable")
3. verifiedSummary (string: objective summary${languageName ? ` in ${languageName}` : ''})
4. evidenceSources (array of strings: source URLs that support your conclusion)
5. biasEmotionAnalysis (string: analysis of bias/manipulation${languageName ? ` in ${languageName}` : ''})
6. emotionBiasProfile (object):
   - sentenceLevelAnalysis (array of objects):
     - sentence (string)
     - emotion ("anger"/"fear"/"neutral"/"joy")
     - biasType ("cherry-picking"/"sensationalism"/"exaggeration"/"loaded-language"/"none")
   - articleLevelSummary (object):
     - dominantEmotion ("anger"/"fear"/"neutral"/"joy")
     - emotionDistribution (object): {anger: %, fear: %, neutral: %, joy: %}
     - dominantBiasType ("cherry-picking"/"sensationalism"/"exaggeration"/"loaded-language"/"none")
     - biasDistribution (object): {cherryPicking: %, sensationalism: %, exaggeration: %, loadedLanguage: %, none: %}
     - overallBiasScore (0-100)
     - overallEmotionScore (0-100)
7. aiGenerated (boolean)
8. aiGenerationConfidence (number 0-100)
9. aiGenerationIndicators (array of strings)

Respond with ONLY the JSON object, no additional text.`;

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: promptText,
              },
              {
                inlineData: {
                  mimeType,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          topK: 40,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    const errorMsg = errorData.error?.message || 'Unknown error';
    throw new Error(`Gemini Vision API failed: ${errorMsg}`);
  }

  const data = await response.json();
  const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!resultText) {
    throw new Error('No response from Gemini Vision API');
  }

  // Parse JSON from response
  let jsonMatch = resultText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    // Try to find JSON in code block
    jsonMatch = resultText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
    if (jsonMatch) {
      jsonMatch[0] = jsonMatch[1];
    }
  }

  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Gemini Vision API response');
  }

  const parsedResult = JSON.parse(jsonMatch[0]);

  // Validate and return with type safety
  return AnalyzeContentOutputSchema.parse(parsedResult);
}

// --- Research Agent with Tavily ---
interface ResearchSource {
  url: string;
  title: string;
  content: string;
  snippet: string;
  score: number;
}

interface ResearchResult {
  sources: ResearchSource[];
  totalSourcesFound: number;
  searchQueries: string[];
}

/**
 * Research Agent: Performs multiple targeted web searches using Tavily API
 * to gather comprehensive evidence about a claim or content.
 */
async function researchClaimWithTavily(claim: string): Promise<ResearchResult> {
  console.log(`[Research Agent] Starting research for claim: "${claim.substring(0, 100)}..."`);
  
  // Sanitize and truncate claim for search queries
  const sanitizedClaim = claim
    .replace(/[\x00-\x1F\x7F]+/g, ' ')
    .replace(/\s\s+/g, ' ')
    .trim()
    .substring(0, 250);

  // Define multiple search strategies to get diverse sources
  const searchQueries = [
    sanitizedClaim, // Base claim
    `${sanitizedClaim} fact check`, // Fact-checking sites
    `${sanitizedClaim} debunk`, // Debunking articles
    `${sanitizedClaim} verified news`, // Verified news sources
  ];

  console.log(`[Research Agent] Executing ${searchQueries.length} search queries`);

  const allSources: ResearchSource[] = [];
  const seenUrls = new Set<string>();

  // Execute searches sequentially to avoid rate limiting
  for (const query of searchQueries) {
    try {
      console.log(`[Research Agent] Searching: "${query}"`);
      
      const response = await tavilyClient.search(query, {
        maxResults: 5,
        searchDepth: 'advanced',
        includeAnswer: false,
        includeRawContent: false,
      });

      console.log(`[Research Agent] Found ${response.results?.length || 0} results for query`);

      if (response.results && Array.isArray(response.results)) {
        for (const result of response.results) {
          // Deduplicate by URL
          if (!seenUrls.has(result.url)) {
            seenUrls.add(result.url);
            allSources.push({
              url: result.url,
              title: result.title || 'Untitled',
              content: result.content || '',
              snippet: (result.content || '').substring(0, 300),
              score: result.score || 0,
            });
          }
        }
      }

      // Small delay between queries to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`[Research Agent] Error searching "${query}":`, error);
      // Continue with other queries even if one fails
    }
  }

  // Sort by score and take top 10
  allSources.sort((a, b) => b.score - a.score);
  const topSources = allSources.slice(0, 10);

  console.log(`[Research Agent] Total unique sources found: ${allSources.length}, using top ${topSources.length}`);

  return {
    sources: topSources,
    totalSourcesFound: allSources.length,
    searchQueries,
  };
}

/**
 * Extract more content from a URL using Cheerio (optional enhancement).
 * This is currently not used but can be enabled for deeper content extraction.
 */
async function extractContentFromUrl(url: string): Promise<string | null> {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return null;
    }

    const response = await fetch(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });
    
    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noise
    $('script, style, noscript, iframe, img, svg, header, footer, nav, aside').remove();

    // Try to find main content
    const mainContent = $('main, article, #main, #content, .post, .article-body, .entry-content').first().text();
    
    let bodyText;
    if (mainContent && mainContent.trim().length > 100) {
      bodyText = mainContent;
    } else {
      bodyText = $('body').text();
    }

    const cleanedText = bodyText.replace(/\s\s+/g, ' ').trim();
    return cleanedText.length > 100 ? cleanedText.substring(0, 2000) : null;
  } catch (error) {
    console.error(`[Content Extraction] Error for ${url}:`, error);
    return null;
  }
}

const AnalyzeContentInputSchema = z.object({
  content: z.string().describe('The text content or URL to analyze.'),
  language: z.string().optional().describe('Language code for the response (e.g., en, hi, ta, te, kn, bn, mr, gu, pa).'),
  languageName: z.string().optional().describe('Full language name for the response.'),
  imageBase64: z.string().optional().describe('Base64-encoded image data for visual analysis.'),
  mimeType: z.string().optional().describe('MIME type of the image (e.g., image/jpeg, image/png).'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  credibilityScore: z.number().describe('A credibility score between 0 and 100.'),
  factCheckVerdict: z.enum(['True', 'Misleading', 'False', 'Not enough verified data available', 'Speculative', 'Questionable']).describe('The fact-check verdict.'),
  verifiedSummary: z.string().describe('A short, verified summary of the content.'),
  evidenceSources: z.array(z.string()).describe('Links to primary evidence sources.'),
  biasEmotionAnalysis: z.string().describe('Analysis of bias and emotional manipulation techniques in the content.'),
  // Structured emotion and bias detection
  emotionBiasProfile: z.object({
    sentenceLevelAnalysis: z.array(z.object({
      sentence: z.string().describe('The analyzed sentence.'),
      emotion: z.enum(['anger', 'fear', 'neutral', 'joy']).describe('Detected emotion in the sentence.'),
      biasType: z.enum(['cherry-picking', 'sensationalism', 'exaggeration', 'loaded-language', 'none']).describe('Detected bias type in the sentence.'),
    })).describe('Array of sentence-level emotion and bias analysis.'),
    articleLevelSummary: z.object({
      dominantEmotion: z.enum(['anger', 'fear', 'neutral', 'joy']).describe('Most prevalent emotion across the article.'),
      emotionDistribution: z.object({
        anger: z.number().min(0).max(100).describe('Percentage of sentences with anger emotion.'),
        fear: z.number().min(0).max(100).describe('Percentage of sentences with fear emotion.'),
        neutral: z.number().min(0).max(100).describe('Percentage of sentences with neutral emotion.'),
        joy: z.number().min(0).max(100).describe('Percentage of sentences with joy emotion.'),
      }).describe('Distribution of emotions across all sentences.'),
      dominantBiasType: z.enum(['cherry-picking', 'sensationalism', 'exaggeration', 'loaded-language', 'none']).describe('Most prevalent bias type across the article.'),
      biasDistribution: z.object({
        cherryPicking: z.number().min(0).max(100).describe('Percentage of sentences with cherry-picking bias.'),
        sensationalism: z.number().min(0).max(100).describe('Percentage of sentences with sensationalism bias.'),
        exaggeration: z.number().min(0).max(100).describe('Percentage of sentences with exaggeration bias.'),
        loadedLanguage: z.number().min(0).max(100).describe('Percentage of sentences with loaded-language bias.'),
        none: z.number().min(0).max(100).describe('Percentage of sentences with no bias.'),
      }).describe('Distribution of bias types across all sentences.'),
      overallBiasScore: z.number().min(0).max(100).describe('Overall bias intensity score (0=neutral, 100=highly biased).'),
      overallEmotionScore: z.number().min(0).max(100).describe('Overall emotional intensity score (0=neutral, 100=highly emotional).'),
    }).describe('Aggregated article-level emotion and bias profile.'),
  }).describe('Structured emotion and bias detection with sentence-level and article-level analysis.'),
  // AI-generation detection
  aiGenerated: z.boolean().describe('Whether the content appears to be AI-generated (true/false).'),
  aiGenerationConfidence: z.number().min(0).max(100).describe('Confidence (0-100) that the content is AI-generated.'),
  aiGenerationIndicators: z.array(z.string()).describe('Short reasons or indicators that led to the AI-generation conclusion.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContentAndProvideVerdict(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return analyzeContentAndProvideVerdictFlow(input);
}

const analyzeContentPrompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: z.object({ 
    content: z.string(),
    researchSources: z.array(z.object({
      url: z.string(),
      title: z.string(),
      snippet: z.string(),
    })).optional(),
    language: z.string().optional(),
    languageName: z.string().optional(),
    hasImage: z.boolean().optional()
  }) },
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `You are an expert fact-checker analyzing content using evidence from multiple verified web sources.

Content to Analyze:
{{{content}}}

{{#if hasImage}}
NOTE: An image has been provided for visual analysis. Consider both the visual content of the image AND the extracted text when forming your verdict. Analyze visual elements like:
- Visual misinformation (e.g., doctored images, misleading captions)
- Context of the image (does it match the claim?)
- Authenticity of visual elements
{{/if}}

{{#if researchSources}}
Research Evidence from Web Sources:
{{#each researchSources}}
Source {{@index}}: {{title}}
URL: {{url}}
Excerpt: {{snippet}}
---
{{/each}}
{{/if}}

Your task:
1. Analyze the content claim carefully{{#if hasImage}} including visual analysis of the image{{/if}}
2. Review all provided research sources and their evidence
3. Determine the factual accuracy based on the evidence
4. Provide a credibility score (0-100) and verdict

Guidelines:
- If the content discusses a future/hypothetical event, set factCheckVerdict to "Speculative"
- If multiple credible sources confirm the claim, mark as "True" (score 70-100)
- If multiple credible sources contradict the claim, mark as "False" (score 0-30)
- If sources show partial truth or context is missing, mark as "Misleading" (score 30-70)
- If insufficient evidence from sources, mark as "Not enough verified data available" (score 40-60)
- For video URLs, analyze metadata and channel credibility
{{#if hasImage}}
- For image-based claims, consider if the image is manipulated, out of context, or authentic
{{/if}}

AI-Generated Content Detection:
- Determine if content appears to be AI-generated
- Provide aiGenerated (boolean), aiGenerationConfidence (0-100), and aiGenerationIndicators (array of reasons)

Emotion and Bias Detection (Sentence-Level Analysis):
For EACH sentence in the content:
1. Detect emotion: "anger", "fear", "neutral", or "joy"
   - anger: hostile, aggressive, antagonistic language
   - fear: threatening, alarming, anxiety-inducing language
   - neutral: objective, factual, balanced language
   - joy: positive, uplifting, optimistic language

2. Detect bias type: "cherry-picking", "sensationalism", "exaggeration", "loaded-language", or "none"
   - cherry-picking: selective evidence, ignoring contradictory data
   - sensationalism: shocking, dramatic, attention-grabbing language
   - exaggeration: overstatement, hyperbole, extreme claims
   - loaded-language: emotionally charged words, value-laden terms
   - none: neutral, objective language

Then provide article-level aggregation:
- dominantEmotion: most prevalent emotion
- emotionDistribution: percentage breakdown (anger, fear, neutral, joy)
- dominantBiasType: most prevalent bias type
- biasDistribution: percentage breakdown (cherryPicking, sensationalism, exaggeration, loadedLanguage, none)
- overallBiasScore: 0-100 (intensity of bias)
- overallEmotionScore: 0-100 (intensity of emotion)

{{#if languageName}}
IMPORTANT: Respond ENTIRELY in {{languageName}} language. All text fields must be written in {{languageName}}.
{{/if}}

Return JSON with:
1. credibilityScore (0-100)
2. factCheckVerdict ("True"/"Misleading"/"False"/"Not enough verified data available"/"Speculative")
3. verifiedSummary (objective summary{{#if languageName}} in {{languageName}}{{/if}})
4. evidenceSources (array of source URLs that support your conclusion)
5. biasEmotionAnalysis (analysis of bias/manipulation{{#if languageName}} in {{languageName}}{{/if}})
6. emotionBiasProfile (object):
   - sentenceLevelAnalysis (array of objects):
     - sentence (string)
     - emotion ("anger"/"fear"/"neutral"/"joy")
     - biasType ("cherry-picking"/"sensationalism"/"exaggeration"/"loaded-language"/"none")
   - articleLevelSummary (object):
     - dominantEmotion ("anger"/"fear"/"neutral"/"joy")
     - emotionDistribution (object): {anger: %, fear: %, neutral: %, joy: %}
     - dominantBiasType ("cherry-picking"/"sensationalism"/"exaggeration"/"loaded-language"/"none")
     - biasDistribution (object): {cherryPicking: %, sensationalism: %, exaggeration: %, loadedLanguage: %, none: %}
     - overallBiasScore (0-100)
     - overallEmotionScore (0-100)
7. aiGenerated (boolean)
8. aiGenerationConfidence (0-100)
9. aiGenerationIndicators (array of strings)
`,
});

const isUrl = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch (e) {
    return false;
  }
};

const isNonArticleUrl = (url: string): boolean => {
    const nonArticleDomains = ['youtube.com', 'youtu.be', 'vimeo.com'];
    try {
        const urlObject = new URL(url);
        return nonArticleDomains.some(domain => urlObject.hostname.includes(domain));
    } catch {
        return false;
    }
};


async function fetchUrlContent(url: string): Promise<string | null> {
    try {
        // Validate URL format
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            console.error(`Invalid URL scheme: ${url}`);
            return null;
        }
        
        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }});
        if (!response.ok) {
            console.error(`Failed to fetch URL: ${url}, status: ${response.status}`);
            return null;
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        
        $('script, style, noscript, iframe, img, svg, header, footer, nav').remove();
        
        const mainContent = $('main, article, #main, #content, .post, .article-body').first().text();
        
        let bodyText;
        if (mainContent && mainContent.trim().length > 100) {
            bodyText = mainContent;
        } else {
            bodyText = $('body').text();
        }

        const cleanedText = bodyText.replace(/\s\s+/g, ' ').trim();
        
        return cleanedText.length > 50 ? cleanedText : null;

    } catch (error) {
        console.error(`Error fetching or parsing URL content for ${url}:`, error);
        return null;
    }
}

async function fetchVideoMetadata(url: string): Promise<string> {
    try {
        // Validate URL format
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            console.error(`Invalid URL scheme: ${url}`);
            return `Video URL: ${url}`;
        }

        const response = await fetch(url, { 
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            } 
        });
        
        if (!response.ok) {
            console.error(`Failed to fetch video URL: ${url}, status: ${response.status}`);
            return `Video URL: ${url}`;
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extract video metadata
        let metadata = `Video URL: ${url}\n`;

        // YouTube metadata extraction
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const titleMatch = html.match(/"title":"([^"]+)"/);
            const descMatch = html.match(/"description":"([^"]+)"/);
            const viewsMatch = html.match(/"viewCount":"(\d+)"/);
            const channelMatch = html.match(/"channelId":"([^"]+)"/);

            if (titleMatch) metadata += `Title: ${titleMatch[1]}\n`;
            if (descMatch) metadata += `Description: ${descMatch[1].substring(0, 200)}\n`;
            if (viewsMatch) metadata += `Views: ${viewsMatch[1]}\n`;
            if (channelMatch) metadata += `Channel ID: ${channelMatch[1]}\n`;

            // Extract meta description
            const metaDesc = $('meta[name="description"]').attr('content');
            if (metaDesc) metadata += `Meta Description: ${metaDesc}\n`;
        } else {
            // Generic video platform metadata extraction
            const metaTitle = $('meta[property="og:title"]').attr('content') || $('title').text();
            const metaDesc = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
            const metaDuration = $('meta[itemprop="duration"]').attr('content');

            if (metaTitle) metadata += `Title: ${metaTitle}\n`;
            if (metaDesc) metadata += `Description: ${metaDesc}\n`;
            if (metaDuration) metadata += `Duration: ${metaDuration}\n`;
        }

        return metadata.length > 50 ? metadata : `Video URL: ${url}`;

    } catch (error) {
        console.error(`Error fetching video metadata for ${url}:`, error);
        return `Video URL: ${url}`;
    }
}


// Fetch article title/heading to use as a concise fact-check query
async function fetchArticleTitle(url: string): Promise<string | null> {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return null;
    }

    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }});
    if (!response.ok) return null;
    const html = await response.text();
    const $ = cheerio.load(html);

    const ogTitle = $('meta[property="og:title"]').attr('content');
    const twitterTitle = $('meta[name="twitter:title"]').attr('content');
    const titleTag = $('title').text();
    const h1 = $('h1').first().text();

    const candidates = [ogTitle, twitterTitle, titleTag, h1].filter(Boolean) as string[];
    if (candidates.length === 0) return null;

    const title = candidates[0].replace(/\s\s+/g, ' ').trim();
    // keep it concise
    return title.length > 8 ? title.substring(0, 300) : null;
  } catch (error) {
    console.error(`Error extracting article title for ${url}:`, error);
    return null;
  }
}


const analyzeContentAndProvideVerdictFlow = ai.defineFlow(
  {
    name: 'analyzeContentAndProvideVerdictFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async (input) => {
    let contentToAnalyze = input.content;
    let claimToResearch = '';

    console.log(`[Analysis Flow] Input: ${input.content.substring(0, 100)}...`);
    console.log(`[Analysis Flow] Is URL: ${isUrl(input.content)}`);

    // Extract or prepare content for analysis
    if (isUrl(input.content)) {
      console.log(`[Analysis Flow] Detected as URL`);
      
      if (isNonArticleUrl(input.content)) {
        console.log(`[Analysis Flow] Non-article URL (video)`);
        const videoMetadata = await fetchVideoMetadata(input.content);
        contentToAnalyze = videoMetadata;
        claimToResearch = videoMetadata.substring(0, 300);
      } else {
        console.log(`[Analysis Flow] Article URL - fetching content`);
        const fetchedContent = await fetchUrlContent(input.content);
        if (fetchedContent) {
          contentToAnalyze = fetchedContent;
          console.log(`[Analysis Flow] Fetched content: ${fetchedContent.substring(0, 100)}...`);
          claimToResearch = fetchedContent.split(' ').slice(0, 50).join(' ');
        } else {
          contentToAnalyze = `Could not retrieve content from URL: ${input.content}. Please analyze the URL itself.`;
          claimToResearch = input.content;
          console.log(`[Analysis Flow] Failed to fetch content`);
        }

        // Try to extract article title for better research query
        try {
          const articleTitle = await fetchArticleTitle(input.content);
          if (articleTitle) {
            claimToResearch = articleTitle;
          }
        } catch (e) {
          console.error('[Analysis Flow] Error extracting title:', e);
        }
      }
    } else {
      console.log(`[Analysis Flow] Plain text input`);
      claimToResearch = input.content.split(' ').slice(0, 50).join(' ');
    }

    if (!contentToAnalyze || contentToAnalyze.trim().length === 0) {
       throw new Error("Input content is empty or could not be processed.");
    }

    // Research Agent: Gather evidence from web sources using Tavily
    console.log(`[Analysis Flow] Starting Research Agent for claim: "${claimToResearch.substring(0, 100)}..."`);
    let researchResult: ResearchResult;
    
    try {
      researchResult = await researchClaimWithTavily(claimToResearch);
      console.log(`[Analysis Flow] Research complete: ${researchResult.sources.length} sources found`);
    } catch (error) {
      console.error('[Analysis Flow] Research Agent error:', error);
      // If research fails, proceed without sources
      researchResult = {
        sources: [],
        totalSourcesFound: 0,
        searchQueries: [],
      };
    }

    // Prepare research sources for Gemini prompt
    const researchSources = researchResult.sources.map(source => ({
      url: source.url,
      title: source.title,
      snippet: source.snippet,
    }));

    // Use Gemini Vision API if image is provided, otherwise use standard prompt
    let output: AnalyzeContentOutput;
    
    if (input.imageBase64 && input.mimeType) {
      console.log(`[Analysis Flow] Using Gemini Vision API for multimodal analysis`);
      output = await retryWithExponentialBackoff(() =>
        analyzeWithVisionAPI(
          contentToAnalyze,
          input.imageBase64!,
          input.mimeType!,
          researchSources,
          input.language,
          input.languageName
        )
      );
    } else {
      console.log(`[Analysis Flow] Using standard text analysis with ${researchSources.length} research sources`);
      const result = await retryWithExponentialBackoff(() =>
        analyzeContentPrompt({ 
          content: contentToAnalyze,
          researchSources: researchSources.length > 0 ? researchSources : undefined,
          language: input.language,
          languageName: input.languageName,
          hasImage: false
        })
      );
      
      if (!result.output) {
        throw new Error("AI model failed to generate a valid analysis.");
      }
      
      output = result.output;
    }

    // Ensure evidence sources from research are included
    if (researchResult.sources.length > 0 && (!output.evidenceSources || output.evidenceSources.length === 0)) {
      output.evidenceSources = researchResult.sources.slice(0, 5).map(s => s.url);
    }

    return output;
  }
);
