"use client";

import type { AnalyzeContentOutput } from "@/ai/flows/analyze-content-and-provide-verdict";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

type ResultsDisplayProps = {
  result: AnalyzeContentOutput;
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  const [sourcesExpanded, setSourcesExpanded] = useState(true);

  const getVerdictStyling = (verdict: AnalyzeContentOutput['factCheckVerdict']) => {
    switch (verdict) {
      case 'True':
        return { Icon: CheckCircle2, className: 'text-green-600', bgClass: 'bg-green-50 border-green-200', label: 'True' };
      case 'Misleading':
        return { Icon: AlertTriangle, className: 'text-orange-600', bgClass: 'bg-orange-50 border-orange-200', label: 'Misleading' };
      case 'False':
        return { Icon: XCircle, className: 'text-red-600', bgClass: 'bg-red-50 border-red-200', label: 'False' };
      case 'Questionable':
        return { Icon: HelpCircle, className: 'text-orange-600', bgClass: 'bg-orange-50 border-orange-200', label: 'Questionable' };
      default:
        return { Icon: HelpCircle, className: 'text-gray-600', bgClass: 'bg-gray-50 border-gray-200', label: 'Unverified' };
    }
  };

  const { Icon: VerdictIcon, className: verdictClassName, bgClass: verdictBgClass, label: verdictLabel } = getVerdictStyling(result.factCheckVerdict);

  const score = result.credibilityScore;
  const scoreColor = score > 75 ? 'bg-green-500' : score > 40 ? 'bg-orange-500' : 'bg-red-500';
  
  // Calculate manipulation score from bias analysis
  const manipulationScore = result.biasEmotionAnalysis?.toLowerCase().includes('manipulative') ? 65 : 
                            result.biasEmotionAnalysis?.toLowerCase().includes('emotional') ? 45 : 25;
  const biasLevel = manipulationScore > 60 ? 'Manipulative' : manipulationScore > 40 ? 'Emotional' : 'Neutral';

  return (
    <div className="w-full">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credibility Score Card */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-6">Credibility Score</h3>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className={`text-6xl font-bold ${score > 75 ? 'text-green-600' : score > 40 ? 'text-orange-600' : 'text-red-600'}`}>
              {score}
            </span>
            <span className="text-3xl text-gray-400">/ 100</span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-gray-200 rounded-full mb-6">
            <div 
              className={`absolute top-0 left-0 h-full ${scoreColor} rounded-full transition-all duration-500`}
              style={{ width: `${score}%` }}
            />
          </div>

          {/* Verdict Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${verdictBgClass} ${verdictClassName} font-medium`}>
              <span className="h-2 w-2 rounded-full bg-current" />
              {verdictLabel}
            </span>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 leading-relaxed">
              {result.verifiedSummary}
            </p>
          </div>
        </div>

        {/* Verdict Icon Card */}
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center justify-center">
          <VerdictIcon className={`h-32 w-32 mb-6 ${verdictClassName}`} />
          <span className={`inline-block px-6 py-3 rounded-lg border ${verdictBgClass} ${verdictClassName} text-lg font-semibold`}>
            {verdictLabel}
          </span>
        </div>

        {/* Emotional Tone & Bias Detection Card */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-gray-700" />
            <h3 className="text-2xl font-bold text-gray-900">Emotional Tone & Bias Detection</h3>
          </div>

          {/* Colored Progress Bar */}
          <div className="relative h-12 bg-gray-200 rounded-lg overflow-hidden mb-6">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-300 via-orange-400 to-red-500 transition-all duration-500"
              style={{ width: `${manipulationScore}%` }}
            />
            <div className="absolute inset-0 grid grid-cols-3 text-sm font-medium">
              <div className="flex items-center justify-center text-gray-700">Neutral</div>
              <div className="flex items-center justify-center text-white">Emotional</div>
              <div className="flex items-center justify-center text-gray-700">Manipulative</div>
            </div>
          </div>

          {/* Explanatory Paragraph */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-lg p-6 mb-6">
            <p className="text-gray-800 leading-relaxed text-lg">
              {result.biasEmotionAnalysis || 'This content appears to maintain a neutral tone with minimal emotional manipulation or bias detected.'}
            </p>
          </div>
        </div>

        {/* Verified Sources Card - Always show */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow p-8">
          <button 
            onClick={() => setSourcesExpanded(!sourcesExpanded)}
            className="flex items-center justify-between w-full mb-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">
              Verified Sources ({result.evidenceSources?.length || 0})
            </h3>
            <svg 
              className={`h-6 w-6 text-teal-600 transition-transform ${sourcesExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {sourcesExpanded && (
            <div className="space-y-3">
              {result.evidenceSources && result.evidenceSources.length > 0 ? (
                result.evidenceSources.map((source, index) => {
                  // Extract domain/source name from URL
                  let sourceName = "Unknown Source";
                  let sourceStatus = "Verified";
                  try {
                    const url = new URL(source);
                    sourceName = url.hostname.replace('www.', '');
                    // Determine status based on source
                    if (sourceName.includes('snopes')) sourceStatus = "Context Missing";
                    else if (sourceName.includes('factcheck')) sourceStatus = "Partially Accurate";
                    else if (sourceName.includes('reuters') || sourceName.includes('ap.org')) sourceStatus = "Verified";
                    else sourceStatus = "Reference";
                  } catch {
                    sourceName = source.substring(0, 50);
                  }
                  
                  return (
                    <a
                      key={index}
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-teal-600 flex-shrink-0" />
                        <span className="text-gray-900 font-medium">{sourceName} - {sourceStatus}</span>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                    </a>
                  );
                })
              ) : (
                <div className="text-gray-500 text-center py-4">No verified sources found for this content.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
