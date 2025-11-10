'use server';

/**
 * @fileOverview Analyzes content and provides a credibility score, fact-check verdict, verified summary, evidence sources, and bias/emotion analysis.
 *
 * - analyzeContentAndProvideVerdict - A function that handles the content analysis process.
 * - AnalyzeContentInput - The input type for the analyzeContentAndProvideVerdict function.
 * - AnalyzeContentOutput - The return type for the analyzeContentAndProvideVerdict function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const factCheck = ai.defineTool(
  {
    name: 'factCheck',
    description: 'Searches for fact checks on a given query. Returns a list of claims and their ratings.',
    inputSchema: z.object({
      query: z.string().describe('The claim to search for fact checks on.'),
    }),
    outputSchema: z.any().describe('The search results from the Fact Check API, including claims and their ratings.'),
  },
  async (input) => {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
      console.error('Google Fact Check API key is missing.');
      return { error: 'The server is missing an API key for the fact-checking service.' };
    }

    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(input.query)}&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Fact Check API request failed with status ${response.status}: ${errorBody}`);
        return { error: `Fact Check API request failed: ${errorBody}` };
      }
      return await response.json();
    } catch (error) {
      console.error('Error calling Fact Check API:', error);
      return { error: `Failed to fetch fact-check data. Reason: ${error instanceof Error ? error.message : 'Unknown'}` };
    }
  }
);

const AnalyzeContentInputSchema = z.object({
  content: z.string().describe('The text content or URL to analyze.'),
});
export type AnalyzeContentInput = z.infer<typeof AnalyzeContentInputSchema>;

const AnalyzeContentOutputSchema = z.object({
  credibilityScore: z.number().describe('A credibility score between 0 and 100.'),
  factCheckVerdict: z.enum(['True', 'Misleading', 'False', 'Not enough verified data available']).describe('The fact-check verdict.'),
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
  input: {schema: AnalyzeContentInputSchema},
  output: {schema: AnalyzeContentOutputSchema},
  tools: [factCheck],
  prompt: `Analyze the following content and provide a credibility score, fact-check verdict, verified summary, evidence sources, and bias/emotion analysis. Use the factCheck tool if necessary to verify claims.

Content: {{{content}}}

Format your output as a JSON object conforming to the AnalyzeContentOutputSchema schema.

Specifically:
1.  credibilityScore:  A number between 0 and 100 (inclusive).
2.  factCheckVerdict:  One of "True", "Misleading", "False", or "Not enough verified data available".
3.  verifiedSummary:  A short, objective summary of the content.
4.  evidenceSources:  An array of URLs for primary sources that support the summary.
5.  biasEmotionAnalysis:  A brief analysis of any bias or emotional manipulation present in the content.
`,
});

const analyzeContentAndProvideVerdictFlow = ai.defineFlow(
  {
    name: 'analyzeContentAndProvideVerdictFlow',
    inputSchema: AnalyzeContentInputSchema,
    outputSchema: AnalyzeContentOutputSchema,
  },
  async input => {
    const {output} = await analyzeContentPrompt(input);
    return output!;
  }
);
