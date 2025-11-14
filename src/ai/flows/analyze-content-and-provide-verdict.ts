'use server';

/**
 * @fileOverview Analyzes content and provides a credibility score, fact-check verdict, verified summary, evidence sources, and bias/emotion analysis.
 *
 * - analyzeContentAndProvideVerdict - A function that handles the content analysis process.
 * - AnalyzeContentInput - The input type for the analyzeContentAndprovideVerdict function.
 * - AnalyzeContentOutput - The return type for the analyzeContentAndprovideVerdict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as cheerio from 'cheerio';

const AnalyzeContentInputSchema = z.object({
  content: z.string().describe('The text content or URL to analyze.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  credibilityScore: z.number().describe('A credibility score between 0 and 100.'),
  factCheckVerdict: z.enum(['True', 'Misleading', 'False', 'Not enough verified data available', 'Speculative']).describe('The fact-check verdict.'),
  verifiedSummary: z.string().describe('A short, verified summary of the content.'),
  evidenceSources: z.array(z.string()).describe('Links to primary evidence sources.'),
  biasEmotionAnalysis: z.string().describe('Analysis of bias and emotional manipulation techniques in the content.'),
});
export type AnalyzeContentOutput = z.infer<typeof AnalyzeContentOutputSchema>;

export async function analyzeContentAndProvideVerdict(input: AnalyzeContentInput): Promise<AnalyzeContentOutput> {
  return analyzeContentAndProvideVerdictFlow(input);
}

const analyzeContentPrompt = ai.definePrompt({
  name: 'analyzeContentPrompt',
  input: {schema: z.object({ content: z.string() }) },
  output: {schema: AnalyzeContentOutputSchema},
  prompt: `Analyze the following content. Provide a credibility score, fact-check verdict, verified summary, evidence sources, and bias/emotion analysis.

Content: {{{content}}}

- If the content is a URL for a non-article (like a YouTube video), state that you cannot analyze video or non-text content in the summary and set the factCheckVerdict to "Not enough verified data available".
- If the content discusses a future or hypothetical event, you must set the factCheckVerdict to "Speculative" and explain in the summary that the event has not yet occurred. 
- For all other content, determine the most appropriate verdict.

Format your output as a JSON object conforming to the AnalyzeContentOutputSchema schema.

Specifically:
1.  credibilityScore:  A number between 0 and 100 (inclusive).
2.  factCheckVerdict:  One of "True", "Misleading", "False", "Not enough verified data available", or "Speculative".
3.  verifiedSummary:  A short, objective summary of the content.
4.  evidenceSources:  An array of URLs for primary sources that support the summary. If you cannot find any, return an empty array.
5.  biasEmotionAnalysis:  A brief analysis of any bias or emotional manipulation present in the content.
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


const analyzeContentAndProvideVerdictFlow = ai.defineFlow(
  {
    name: 'analyzeContentAndProvideVerdictFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async (input) => {
    let contentToAnalyze = input.content;

    if (isUrl(input.content)) {
      if (isNonArticleUrl(input.content)) {
        // It's a non-article URL, let the prompt handle it directly.
        contentToAnalyze = input.content;
      } else {
        // It's an article URL, try to fetch it.
        const fetchedContent = await fetchUrlContent(input.content);
        if (fetchedContent) {
          contentToAnalyze = fetchedContent;
        } else {
          // If fetch fails or content is insufficient, we proceed but the prompt will handle it.
          // This gives the model context that fetching failed.
          contentToAnalyze = `Could not retrieve content from URL: ${input.content}. Please analyze the URL itself.`;
        }
      }
    }
    
    if (!contentToAnalyze || contentToAnalyze.trim().length === 0) {
       throw new Error("Input content is empty or could not be processed.");
    }

    const {output} = await analyzeContentPrompt({ content: contentToAnalyze });
    if (!output) {
      throw new Error("AI model failed to generate a valid analysis.");
    }
    return output;
  }
);
