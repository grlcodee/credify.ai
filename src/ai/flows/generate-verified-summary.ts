'use server';

/**
 * @fileOverview This flow generates a short, verified summary of the content presented in simple, objective language.
 *
 * - generateVerifiedSummary - A function that handles the generation of the verified summary.
 * - GenerateVerifiedSummaryInput - The input type for the generateVerifiedSummary function.
 * - GenerateVerifiedSummaryOutput - The return type for the generateVerifiedSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVerifiedSummaryInputSchema = z.object({
  content: z.string().describe('The content to be summarized and verified.'),
  sources: z.array(z.string()).optional().describe('Optional list of sources to use for verification.'),
});
export type GenerateVerifiedSummaryInput = z.infer<typeof GenerateVerifiedSummaryInputSchema>;

const GenerateVerifiedSummaryOutputSchema = z.object({
  summary: z.string().describe('A short, verified summary of the content.'),
});
export type GenerateVerifiedSummaryOutput = z.infer<typeof GenerateVerifiedSummaryOutputSchema>;

export async function generateVerifiedSummary(input: GenerateVerifiedSummaryInput): Promise<GenerateVerifiedSummaryOutput> {
  return generateVerifiedSummaryFlow(input);
}

const generateVerifiedSummaryPrompt = ai.definePrompt({
  name: 'generateVerifiedSummaryPrompt',
  input: {schema: GenerateVerifiedSummaryInputSchema},
  output: {schema: GenerateVerifiedSummaryOutputSchema},
  prompt: `You are Credify.AI, an Agentic AI misinformation verification engine.
  Your mission: Protect users from false or misleading content by providing a short, verified summary of the content presented in simple, objective language.
  
  Analyze the following content and provide a concise, factual summary.  Use the provided sources when constructing the summary.
  Content: {{{content}}}
  Sources: {{#each sources}}{{{this}}}\n{{/each}}
  
  If there are no verifiable facts, then state 'Not enough verified data available.'
  Otherwise, ensure the summary is based on verifiable facts.
  
  Respond in simple, objective language.
`,
});

const generateVerifiedSummaryFlow = ai.defineFlow(
  {
    name: 'generateVerifiedSummaryFlow',
    inputSchema: GenerateVerifiedSummaryInputSchema,
    outputSchema: GenerateVerifiedSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateVerifiedSummaryPrompt(input);
    return output!;
  }
);
