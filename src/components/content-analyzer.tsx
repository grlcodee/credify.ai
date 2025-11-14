"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { getAnalysis } from '@/app/actions';
import type { AnalyzeContentOutput } from '@/ai/flows/analyze-content-and-provide-verdict';
import ResultsDisplay from './results-display';
import LoadingSkeleton from './loading-skeleton';

const FormSchema = z.object({
  content: z.string()
    .min(10, { message: "Please enter at least 10 characters for a meaningful analysis." })
    .max(5000, { message: "Content must not be longer than 5000 characters." }),
});

export default function ContentAnalyzer() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeContentOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await getAnalysis(data.content);
      setAnalysisResult(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-glass rounded-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Content to analyze</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste a news link, social media post, or messaging app forward..."
                      className="resize-none h-40 text-base bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 font-bold" size="lg" disabled={isLoading}>
              {isLoading ? (
                  <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                  </>
              ) : (
                  <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Check Credibility
                  </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {isLoading && <LoadingSkeleton />}
      {analysisResult && !isLoading && <ResultsDisplay result={analysisResult} />}
    </div>
  );
}
