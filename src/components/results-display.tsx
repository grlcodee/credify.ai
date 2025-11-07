"use client";

import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-and-provide-verdict";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Link as LinkIcon,
  Quote,
  Scale,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

type ResultsDisplayProps = {
  result: AnalyzeContentOutput;
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const getVerdictStyling = (verdict: AnalyzeContentOutput['factCheckVerdict']) => {
    switch (verdict) {
      case 'True':
        return { Icon: CheckCircle2, className: 'text-success', label: 'True' };
      case 'Misleading':
        return { Icon: AlertTriangle, className: 'text-warning', label: 'Misleading' };
      case 'False':
        return { Icon: XCircle, className: 'text-destructive', label: 'False' };
      default:
        return { Icon: HelpCircle, className: 'text-muted-foreground', label: 'Not Enough Data' };
    }
  };

  const { Icon: VerdictIcon, className: verdictClassName, label: verdictLabel } = getVerdictStyling(result.factCheckVerdict);

  const score = result.credibilityScore;
  const scoreColorVar = score > 75 ? 'hsl(var(--success))' : score > 40 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))';

  const chartData = [{ name: "score", value: score }];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <Card className="lg:col-span-1 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Credibility Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="90%" data={chartData} startAngle={90} endAngle={-270} barSize={20}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar 
                  background 
                  dataKey='value' 
                  cornerRadius={10} 
                  fill={scoreColorVar}
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-5xl font-bold fill-foreground font-headline">
                  {result.credibilityScore}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fact-Check Verdict</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <VerdictIcon className={`h-12 w-12 flex-shrink-0 ${verdictClassName}`} />
            <span className={`text-4xl font-bold font-headline ${verdictClassName}`}>{verdictLabel}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <Quote className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Verified Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{result.verifiedSummary}</p>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <Scale className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Bias & Emotion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed">{result.biasEmotionAnalysis}</p>
        </CardContent>
      </Card>

      {result.evidenceSources && result.evidenceSources.length > 0 && (
        <Card className="lg:col-span-3 shadow-md">
          <CardHeader className="flex flex-row items-center gap-3">
            <LinkIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Primary Evidence Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.evidenceSources.map((source, index) => (
                <li key={index} className="flex items-start">
                  <LinkIcon className="h-4 w-4 mr-3 mt-1 text-accent flex-shrink-0" />
                  <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all transition-colors duration-200">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
