'use client';

import { useEffect, useState, useRef } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { getAnalysis } from '@/app/actions';
import ResultsDisplay from '@/components/results-display';
import LoadingSkeleton from '@/components/loading-skeleton';
import { useToast } from '@/hooks/use-toast';
import { Twitter, Linkedin, Github, Mail, Camera, Loader2, ImageIcon } from 'lucide-react';
import { extractTextFromImage, imageToBase64, getMimeType } from '@/lib/ocr-service';

export default function Home() {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isOCRLoading, setIsOCRLoading] = useState(false);
  const [currentImageData, setCurrentImageData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleAnalysis = async () => {
    if (!content || content.trim().length < 10) {
      toast({ title: 'Enter more text', description: 'Please enter at least 10 characters to analyze.', variant: 'default' });
      return;
    }
    setShowResults(true);
    setIsLoadingAnalysis(true);
    setAnalysisResult(null);
    try {
      const res = await getAnalysis(content, 'en', currentImageData?.base64, currentImageData?.mimeType);
      setAnalysisResult(res as any);
    } catch (err: any) {
      const message = err?.message ?? 'Analysis failed';
      toast({ title: 'Analysis Failed', description: message, variant: 'destructive' });
    } finally {
      setIsLoadingAnalysis(false);
      setCurrentImageData(null);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsOCRLoading(true);
      setShowResults(true);
      setAnalysisResult(null);
      
      const base64 = await imageToBase64(file);
      const mimeType = getMimeType(file);
      setCurrentImageData({ base64, mimeType });
      
      // Create image preview URL
      const previewUrl = `data:${mimeType};base64,${base64}`;
      setImagePreview(previewUrl);

      const ocrResult = await extractTextFromImage(base64, mimeType);
      
      if (ocrResult.error) {
        toast({
          title: 'OCR Failed',
          description: ocrResult.error,
          variant: 'destructive',
        });
        setCurrentImageData(null);
        setImagePreview(null);
        setIsOCRLoading(false);
        return;
      }

      const extractedText = ocrResult.text.trim() || 'Image analysis: Visual content verification requested';
      
      setIsOCRLoading(false);
      setIsLoadingAnalysis(true);
      
      // Analyze without showing text in textarea
      const res = await getAnalysis(extractedText, 'en', base64, mimeType);
      setAnalysisResult(res as any);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      toast({
        title: 'Upload Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setCurrentImageData(null);
      setImagePreview(null);
    } finally {
      setIsOCRLoading(false);
      setIsLoadingAnalysis(false);
      if (galleryInputRef.current) {
        galleryInputRef.current.value = '';
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setCameraStream(stream);
      setIsCameraActive(true);
      
      // Use setTimeout to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err: Error) => {
            console.error('Video play error:', err);
          });
        }
      }, 100);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to access camera';
      toast({
        title: 'Camera Access Denied',
        description: errorMessage,
        variant: 'destructive',
      });
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      setIsOCRLoading(true);
      setShowResults(true);
      setAnalysisResult(null);
      
      const context = canvasRef.current.getContext('2d');
      if (!context) throw new Error('Canvas context not available');

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      const base64 = canvasRef.current.toDataURL('image/jpeg').split(',')[1];
      const mimeType = 'image/jpeg';
      setCurrentImageData({ base64, mimeType });
      
      // Create image preview URL
      const previewUrl = `data:${mimeType};base64,${base64}`;
      setImagePreview(previewUrl);

      stopCamera();

      const ocrResult = await extractTextFromImage(base64, mimeType);
      
      if (ocrResult.error) {
        toast({
          title: 'OCR Failed',
          description: ocrResult.error,
          variant: 'destructive',
        });
        setCurrentImageData(null);
        setImagePreview(null);
        setIsOCRLoading(false);
        return;
      }

      const extractedText = ocrResult.text.trim() || 'Image analysis: Visual content verification requested';

      setIsOCRLoading(false);
      setIsLoadingAnalysis(true);
      
      // Analyze without showing text in textarea
      const res = await getAnalysis(extractedText, 'en', base64, mimeType);
      setAnalysisResult(res as any);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to capture photo';
      toast({
        title: 'Capture Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setCurrentImageData(null);
      setImagePreview(null);
    } finally {
      setIsOCRLoading(false);
      setIsLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  useEffect(() => {
    if (cameraStream && videoRef.current && isCameraActive) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch((err: Error) => {
        console.error('Video play error:', err);
      });
    }
  }, [cameraStream, isCameraActive]);

  return (
    <div className="flex flex-col min-h-screen bg-[#EDF7F6]">
      <Header />

      {/* Spacer */}
      <div className="h-14"></div>

      {/* HERO */}
      <main className="flex-grow w-full px-12 py-16 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="pt-6">
            <div className="inline-flex items-center rounded-full bg-white/60 px-4 py-1.5 text-sm font-medium text-gray-700 mb-6">
              <span className="mr-2">✅</span>
              <span data-i18n="hero.badge">AI-Powered Fact-Checking</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6" data-i18n="hero.title">
              Combat Misinformation in Real Time
            </h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed" data-i18n="hero.subtitle">
              Analyze news, articles, and claims instantly with AI-powered credibility checks
            </p>

            <div className="flex items-center gap-8 mt-6">
              <div>
                <div className="text-2xl font-bold text-gray-900">10M+</div>
                <div className="text-sm text-gray-600" data-i18n="hero.stats.verifications">Verifications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600" data-i18n="hero.stats.languages">Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99.7%</div>
                <div className="text-sm text-gray-600" data-i18n="hero.stats.accuracy">Accuracy</div>
              </div>
            </div>
          </div>

          {/* Verification Card */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 mt-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-3" data-i18n="credibilityCard.title">Check Credibility</h3>

              {isCameraActive ? (
                <div className="space-y-4 mb-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg bg-black max-h-64 object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="flex gap-3">
                    <Button
                      onClick={capturePhoto}
                      disabled={isOCRLoading}
                      className="flex-1 bg-gray-800 hover:bg-gray-900"
                    >
                      {isOCRLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Extracting...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Capture & Analyze
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={stopCamera}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {imagePreview ? (
                    <div className="mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Uploaded for verification" 
                        className="w-full rounded-md border border-gray-200 max-h-96 object-contain"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setImagePreview(null);
                          setCurrentImageData(null);
                        }}
                      >
                        Clear Image
                      </Button>
                    </div>
                  ) : (
                    <textarea
                      rows={6}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full border border-gray-200 rounded-md p-3 mb-4 text-gray-800 placeholder-gray-400"
                      placeholder="Paste a URL, claim, or text to verify..."
                      data-i18n-placeholder="credibilityCard.placeholder"
                    />
                  )}

                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    disabled={isOCRLoading || isLoadingAnalysis}
                    className="hidden"
                  />

                  <div className="flex gap-3 mb-4">
                    <Button
                      size="lg"
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white"
                      onClick={handleAnalysis}
                      disabled={isLoadingAnalysis || isOCRLoading || imagePreview !== null}
                      data-i18n="credibilityCard.button"
              >
                Verify Credibility
              </Button>                    <Button
                      size="lg"
                      variant="outline"
                      className="px-4"
                      onClick={() => galleryInputRef.current?.click()}
                      disabled={isLoadingAnalysis || isOCRLoading}
                      title="Upload Image"
                    >
                      {isOCRLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <ImageIcon className="h-5 w-5" />
                      )}
                    </Button>
                    
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-4"
                      onClick={startCamera}
                      disabled={isLoadingAnalysis || isOCRLoading}
                      title="Open Camera"
                    >
                      <Camera className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              )}

              <p className="text-sm text-gray-500 mt-3" data-i18n="credibilityCard.features">Instant verification • Verified sources • Bias detection</p>
            </div>
          </div>
        </div>

        {/* Verification Results - dynamic: loading, result, or placeholder UI */}
        {showResults && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-3" data-i18n="results.title">Verification Results</h2>
            <p className="text-gray-600 mb-6" data-i18n="results.subtitle">Complete analysis with credibility score, bias detection, and verified sources</p>

            {isLoadingAnalysis ? (
              <LoadingSkeleton />
            ) : analysisResult ? (
              <ResultsDisplay result={analysisResult} />
            ) : (
              <div className="text-gray-600">No results yet. Please try again or check your input.</div>
            )}
          </section>
        )}

        {/* Browser Plugin Download Section */}
        <section className="mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-teal-100 rounded-full p-3 flex-shrink-0">
                <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-teal-50 rounded-full px-3 py-1 mb-3">
                  <span className="h-2 w-2 bg-teal-500 rounded-full"></span>
                  <span className="text-sm font-medium text-teal-700">Browser Plugin</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Verify Before You Believe.</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Install the Credify Plugin to get instant credibility scores across the internet — Twitter, YouTube, News Sites & more.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 items-end flex-shrink-0">
              <a
                href="/downloads/credify-ai-extension.zip"
                download="credify-ai-extension.zip"
                className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Download Plugin
              </a>
              <button 
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm font-medium"
                onClick={() => window.open('/how-it-works', '_blank')}
              >
                How it works
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Real-Time Misinformation Detection Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-3" data-i18n="misinformationSection.title">Real-Time Misinformation Detection</h2>
          <p className="text-gray-600 mb-8" data-i18n="misinformationSection.subtitle">Automated verification across social media, news, and messaging platforms with instant credibility analysis</p>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="relative rounded-xl overflow-hidden shadow bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="w-full h-64 flex items-center justify-center">
                <span className="text-8xl">💬</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="inline-flex items-center gap-3 bg-white/10 rounded-full p-2 w-max mb-3">
                  <span className="text-white">💬</span>
                </div>
                <h3 className="text-2xl text-white font-semibold" data-i18n="misinformationSection.socialMedia.title">Social Media Verification</h3>
                <p className="text-white/80 mt-2" data-i18n="misinformationSection.socialMedia.description">Instantly verify viral tweets, posts, and trending claims with credibility scores</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow bg-gradient-to-br from-green-500 to-teal-600">
              <div className="w-full h-64 flex items-center justify-center">
                <span className="text-8xl">📈</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
                <div className="inline-flex items-center gap-3 bg-white/10 rounded-full p-2 w-max mb-3">
                  <span className="text-white">📈</span>
                </div>
                <h3 className="text-2xl text-white font-semibold" data-i18n="misinformationSection.newsAnalysis.title">News Article Analysis</h3>
                <p className="text-white/80 mt-2" data-i18n="misinformationSection.newsAnalysis.description">Detect bias, emotional tone, and verify sources in published content</p>
              </div>
            </div>
          </div>
        </section>

        {/* Removed duplicate Dark CTA Section to keep only footer CTA */}
      </main>

      {/* Dark CTA already inserted above; now render a dark full-width footer matching the screenshot */}
      <footer className="w-full bg-[#0D0D0D] text-gray-300">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4" data-i18n="footer.cta.title">Start Verifying Content in Real Time</h2>
            <p className="text-gray-400 max-w-3xl mx-auto" data-i18n="footer.cta.subtitle">Join newsrooms, corporations, and government agencies using Credify.AI to combat misinformation at scale</p>
            <div className="mt-6">
              <Button size="lg" className="bg-white text-black px-8 py-4 rounded-full" data-i18n="footer.cta.button">Get Started Free</Button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src="/WhatsApp Image 2025-11-07 at 6.10.42 PM.jpeg" alt="Credify.AI" className="h-10 w-auto" />
                </div>
                <p className="text-gray-400" data-i18n="footer.description">Real-time AI verification for news, social media, and messaging platforms. Serving media organizations, corporations, government agencies, and millions of users globally.</p>
                <div className="flex gap-3 mt-6">
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Github className="h-5 w-5" />
                  </a>
                  <a className="p-2 bg-gray-800 rounded flex items-center justify-center text-gray-400 hover:text-white" href="#">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="">
                <h4 className="text-white font-semibold mb-4" data-i18n="footer.product.title">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Features</li>
                  <li>API Documentation</li>
                  <li>Browser Plugin</li>
                  <li>Pricing</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4" data-i18n="footer.company.title">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>About Us</li>
                  <li>Blog</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-500 flex items-center justify-between">
              <div data-i18n="footer.copyright">© 2025 Credify.AI. Enterprise misinformation detection powered by Agentic AI.</div>
              <div className="flex gap-6">
                <a className="hover:underline">Privacy Policy</a>
                <a className="hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

