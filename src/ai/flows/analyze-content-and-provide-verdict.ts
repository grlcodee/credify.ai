
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
  prompt: `Analyze the following content based on your existing knowledge. Provide a credibility score, fact-check verdict, verified summary, evidence sources, and bias/emotion analysis.

Content: {{{content}}}

Format your output as a JSON object conforming to the AnalyzeContentOutputSchema schema.

Specifically:
1.  credibilityScore:  A number between 0 and 100 (inclusive).
2.  factCheckVerdict:  One of "True", "Misleading", "False", or "Not enough verified data available".
3.  verifiedSummary:  A short, objective summary of the content.
4.  evidenceSources:  An array of URLs for primary sources that support the summary. If you cannot find any, return an empty array.
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
    // Check if content is a URL
    let contentToAnalyze = input.content;
    const urlRegex = /^(https?:\/\/[^\s]+)/;
    if (urlRegex.test(input.content)) {
      try {
        const response = await fetch(input.content);
        if (response.ok) {
           // This is a very basic way to extract text. A more robust solution
           // might use a library like Cheerio to parse HTML.
           // For now, we'll assume the URL points to a text-based resource
           // or that the AI can handle HTML content.
          contentToAnalyze = await response.text();
        }
      } catch (e) {
        console.error('Could not fetch URL content', e);
        // Proceed with the URL itself if fetching fails
      }
    }
    
    const {output} = await analyzeContentPrompt({ content: contentToAnalyze });
    return output!;
  }
);
