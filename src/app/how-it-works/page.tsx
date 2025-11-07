import { Header } from '@/components/header';
import { Check, Languages, Lock, Puzzle, Search, Share, ShieldQuestion, StepForward, Terminal, Type, AlertTriangle, X, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Type className="h-6 w-6" /></div>,
    title: 'Step 1 — Paste, Type, or Select',
    description: 'Credify.AI lets you verify any piece of online content in seconds. You can paste a link, type text, or use our Chrome plugin to highlight content.',
    details: [
      'Paste a link, tweet, or WhatsApp forward into the web app.',
      'Type or paste any text you want to fact-check.',
      'Simply highlight text on any webpage using the Credify.AI Chrome Plugin and click “Check Credibility.”'
    ]
  },
  {
    icon: <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Search className="h-6 w-6" /></div>,
    title: 'Step 2 — AI-Powered Fact Verification',
    description: 'Once you submit the content, our Agentic AI goes to work, scanning the web, cross-verifying facts, and detecting misinformation patterns in real time.',
    details: [
      'Scans the web for related claims and official reports using live semantic search.',
      'Cross-verifies facts with trusted databases like Google Fact Check Tools, Press Information Bureau, and certified news outlets.',
      'Detects patterns of misinformation, emotional manipulation, and bias in the text.'
    ]
  },
  {
    icon: <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><ShieldQuestion className="h-6 w-6" /></div>,
    title: 'Step 3 — Credibility Report',
    description: 'You instantly get a clear, visual result with a credibility score, a simple summary, links to sources, and a bias breakdown.',
    details: [],
    table: {
      headers: ['Indicator', 'What It Means'],
      rows: [
        { icon: <CheckCircle className="h-5 w-5 text-success" />, label: 'True', text: 'Verified by multiple credible sources.' },
        { icon: <AlertTriangle className="h-5 w-5 text-warning" />, label: 'Misleading', text: 'Contains partial truths or emotional manipulation.' },
        { icon: <X className="h-5 w-5 text-destructive" />, label: 'False', text: 'Contradicted by verified fact-check databases.' },
        { icon: <ShieldQuestion className="h-5 w-5 text-muted-foreground" />, label: 'Unverified', text: 'Not enough evidence available yet.' },
      ]
    },
    extraContent: 'Each result includes a Credibility Score (0–100), a short summary, links to verified sources, and a bias/emotion breakdown.'
  },
  {
    icon: <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Share className="h-6 w-6" /></div>,
    title: 'Step 4 — Learn and Share',
    description: 'Use the report to make informed decisions and help others do the same by sharing the verified summary or citing the sources.',
    details: [
      'Share the verified summary on social media.',
      'Copy the source links to cite in your content.',
      'Explore related updates through our “Contextual News” feed powered by real-time AI.'
    ]
  }
];

const otherFeatures = [
    {
      icon: <Puzzle className="h-6 w-6 text-primary" />,
      title: 'Using the Credify.AI Plugin',
      description: 'Install the Chrome Plugin to check credibility without leaving the page. Highlight any text, right-click, and see your result instantly. It uses the same powerful engine as the web app.'
    },
    {
      icon: <Languages className="h-6 w-6 text-primary" />,
      title: 'Multilingual Support',
      description: 'Credify.AI understands and verifies claims in English, Hindi, Marathi, Bengali, Tamil, Telugu, and more languages coming soon.'
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: 'Privacy First',
      description: 'Your queries are not stored or shared. Credify.AI only analyzes the text you provide and returns a factual response — no tracking, no ads, no profiling.'
    },
]

const comingSoonFeatures = [
    {
        title: 'Credify.AI for WhatsApp',
        description: 'Verify forwards right inside your chats.'
    },
    {
        title: 'Developer API',
        description: 'Integrate our verification engine into your own app or newsroom workflow.'
    },
    {
        title: 'Crisis Mode Dashboard',
        description: 'Real-time misinformation tracking during national events.'
    }
]

export default function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1A237E] via-[#151E60] to-[#0D123B] text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span role="img" aria-label="brain">🧠</span> How It Works
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              A step-by-step guide to verifying content with Credify.AI.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-glass p-8 rounded-lg">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">{step.icon}</div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    {step.details.length > 0 && (
                       <ul className="space-y-2">
                          {step.details.map((detail, i) => (
                              <li key={i} className="flex items-start">
                                  <Check className="h-5 w-5 text-success mr-3 mt-1 flex-shrink-0" />
                                  <span>{detail}</span>
                              </li>
                          ))}
                      </ul>
                    )}
                    {step.table && (
                       <div className="my-6 bg-glass rounded-lg overflow-hidden border border-white/10">
                          <table className="w-full text-left">
                              <thead>
                                  <tr className='border-b border-white/10'>
                                      {step.table.headers.map(header => <th key={header} className="p-4 font-semibold">{header}</th>)}
                                  </tr>
                              </thead>
                              <tbody>
                                  {step.table.rows.map((row, i) => (
                                      <tr key={i} className={`${i < step.table.rows.length - 1 ? 'border-b border-white/10' : ''}`}>
                                          <td className="p-4 flex items-center gap-2 font-semibold">
                                              {row.icon}
                                              {row.label}
                                          </td>
                                          <td className="p-4 text-gray-300">{row.text}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                    )}
                     {step.extraContent && (
                      <p className="text-gray-300 mt-4">{step.extraContent}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-20 border-t border-white/20"></div>

          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            {otherFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col items-center md:items-start">
                    {feature.icon}
                    <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                </div>
            ))}
          </div>

          <div className="my-20">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3"><StepForward /> Coming Soon</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">We're constantly working to expand our capabilities to fight misinformation. Here's what's next:</p>
            </div>
            <div className="mt-8 grid md:grid-cols-3 gap-8">
                {comingSoonFeatures.map((feature, index) => (
                    <div key={index} className="bg-glass p-6 rounded-lg border border-white/10">
                        <h4 className="font-bold text-lg text-primary">{feature.title}</h4>
                        <p className="text-gray-300 mt-2 text-sm">{feature.description}</p>
                    </div>
                ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
