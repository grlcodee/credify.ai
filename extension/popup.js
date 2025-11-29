// Language codes and names
const LANGUAGES = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  bn: 'বাংলা',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
  pa: 'ਪੰਜਾਬੀ',
};

// Helper to get stored language
const getStoredLanguage = async () => {
  return new Promise((resolve) => {
    try {
      chrome.storage.local.get('selectedLanguage', (data) => {
        resolve(data?.selectedLanguage || 'en');
      });
    } catch (e) {
      resolve('en');
    }
  });
};

// Load extension translations from backend public/locales
let EXT_TRANSLATIONS = {};
async function loadExtensionTranslations(backendUrl, lang = 'en') {
  try {
    const resp = await fetch(`${backendUrl.replace(/\/$/, '')}/locales/${lang}/extension.json`);
    if (resp.ok) {
      const data = await resp.json();
      // Flatten popup keys to top-level for convenience
      const popup = data.popup || {};
      const verdicts = data.verdict || {};
      const ai = data.ai || {};
      EXT_TRANSLATIONS = {
        loading: popup.loading,
        title: popup.title,
        scoreLabel: popup.credibilityScore,
        verdictHeading: popup.verdict,
        summaryHeading: popup.summary,
        sourcesHeading: popup.sources,
        biasHeading: popup.bias,
        copyBtn: popup.copy,
        shareBtn: popup.share,
        retryBtn: popup.retry,
        errorTitle: popup.error,
        noContent: popup.noContent,
        noSummary: popup.noSummary,
        noSources: popup.noSources,
        noBias: popup.noBias,
        copied: popup.copied,
        shareCopied: popup.shareCopied,
        verdicts: {
          'True': verdicts.true || 'True',
          'False': verdicts.false || 'False',
          'Misleading': verdicts.misleading || 'Misleading',
          'Speculative': verdicts.speculative || 'Speculative',
          'Not enough verified data available': verdicts.notEnough || verdicts.notEnough || 'Not Enough Data',
        }
        ,
        // AI related labels
        aiGeneratedYes: ai.aiGeneratedYes,
        aiGeneratedNo: ai.aiGeneratedNo,
        confidenceLabel: ai.confidenceLabel,
        noSummary: popup.noSummary,
        noSources: popup.noSources,
        noBias: popup.noBias,
        copied: ai.copied || popup.copied,
        shareCopied: ai.shareCopied || popup.shareCopied,
      };
    }
  } catch (e) {
    EXT_TRANSLATIONS = {};
  }
}

// Helper to save language
const saveLanguage = async (lang) => {
  return new Promise((resolve) => {
    try {
      chrome.storage.local.set({ selectedLanguage: lang }, resolve);
    } catch (e) {
      resolve();
    }
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  const loadingEl = document.getElementById('loading');
  const resultsEl = document.getElementById('results');
  const errorEl = document.getElementById('error');

  try {
    // Get the content from storage (set by background.js)
    // Helper to use chrome.storage with Promises for compatibility
    const getStorage = (key) => new Promise((resolve) => {
      try {
        chrome.storage.local.get(key, resolve);
      } catch (e) {
        resolve({});
      }
    });

    const data = await getStorage('selectedContent');
    let content = data && data.selectedContent ? data.selectedContent : null;

    // If storage didn't have the content, ask the service worker for the last selected content
    if (!content) {
      try {
        const resp = await new Promise((resolve) => {
          try {
            chrome.runtime.sendMessage({ action: 'getLastContent' }, resolve);
          } catch (e) {
            resolve(null);
          }
        });

        if (resp && resp.selectedContent) content = resp.selectedContent;
        else if (typeof resp === 'string' && resp.length) content = resp;
      } catch (e) {
        // ignore and fall through to error message
      }
    }

    if (!content) {
      showError('No content selected. Please right-click and select "Analyze with Credify AI"');
      return;
    }

    // Call the backend API
    const result = await analyzeContent(content, 'en');
    
    // Hide loading, show results
    loadingEl.style.display = 'none';
    displayResults(result);
    resultsEl.style.display = 'block';

  } catch (err) {
    loadingEl.style.display = 'none';
    showError(err.message || 'Failed to analyze content');
  }
});

async function analyzeContent(content, language = 'en') {
  // Get the backend URL from extension settings or use default
  const dataUrl = await (typeof getStorage === 'function' ? getStorage('backendUrl') : new Promise((r) => chrome.storage.local.get('backendUrl', r)));
  const url = dataUrl && dataUrl.backendUrl ? dataUrl.backendUrl : 'http://localhost:9002';

  // Retry logic for network failures
  const maxRetries = 3;
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(`${url}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, language }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Retry on 429 (rate limit) or 503 (service unavailable)
        if ((response.status === 429 || response.status === 503) && attempt < maxRetries - 1) {
          const delayMs = 1000 * Math.pow(2, attempt) + Math.random() * 1000;
          console.warn(`Attempt ${attempt + 1}/${maxRetries} failed with ${response.status}. Retrying in ${Math.round(delayMs)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
        
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      
      // Retry on network errors
      if (attempt < maxRetries - 1) {
        const delayMs = 1000 * Math.pow(2, attempt) + Math.random() * 1000;
        console.warn(`Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${Math.round(delayMs)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
        continue;
      }
    }
  }

  throw lastError || new Error('Failed after multiple retries');
}

function displayResults(result) {
  const {
    credibilityScore = 0,
    factCheckVerdict = 'Not enough verified data available',
    verifiedSummary = '',
    evidenceSources = [],
    biasEmotionAnalysis = '',
  } = result;

  // Set score
  document.getElementById('scoreValue').textContent = Math.round(credibilityScore);
  const scoreCircle = document.getElementById('scoreCircle');
  scoreCircle.classList.remove('high', 'medium', 'low');
  if (credibilityScore >= 70) scoreCircle.classList.add('high');
  else if (credibilityScore >= 40) scoreCircle.classList.add('medium');
  else scoreCircle.classList.add('low');

  // Set verdict
  const verdictEl = document.getElementById('verdict');
  // If translations provide verdict mapping, use that
  const verdictMap = (EXT_TRANSLATIONS && EXT_TRANSLATIONS.verdicts) || {};
  verdictEl.textContent = verdictMap[factCheckVerdict] || factCheckVerdict;
  verdictEl.classList.remove('true', 'false', 'misleading', 'speculative', 'not-enough');
  const verdictClass = factCheckVerdict.toLowerCase().replace(/\s+/g, '-');
  verdictEl.classList.add(verdictClass);

  // Set summary
  document.getElementById('summary').textContent = verifiedSummary || ((EXT_TRANSLATIONS && EXT_TRANSLATIONS['noSummary']) || 'No summary available');

  // Set sources with icons
  const sourcesList = document.getElementById('sources');
  sourcesList.innerHTML = '';
  if (evidenceSources && evidenceSources.length > 0) {
    evidenceSources.slice(0, 5).forEach((url, index) => {
      const sourceItem = document.createElement('a');
      sourceItem.className = 'source-item';
      sourceItem.href = url;
      sourceItem.target = '_blank';
      
      const sourceContent = document.createElement('div');
      sourceContent.className = 'source-content';
      
      const sourceIcon = document.createElement('div');
      sourceIcon.className = 'source-icon';
      
      // Set icon based on source type
      let hostname = '';
      try {
        hostname = new URL(url).hostname.replace('www.', '');
      } catch (e) {
        hostname = 'source';
      }
      
      if (hostname.includes('nasa')) sourceIcon.textContent = '🌐';
      else if (hostname.includes('science') || hostname.includes('journal')) sourceIcon.textContent = '📰';
      else if (hostname.includes('factcheck') || hostname.includes('fact-check')) sourceIcon.textContent = '✓';
      else if (hostname.includes('reuters') || hostname.includes('news')) sourceIcon.textContent = '🗞️';
      else sourceIcon.textContent = '🔗';
      
      const sourceName = document.createElement('span');
      sourceName.className = 'source-name';
      
      // Get nice source name
      if (hostname.includes('nasa')) sourceName.textContent = 'NASA Official Statement';
      else if (hostname.includes('science') || hostname.includes('journal')) sourceName.textContent = 'Science Journal';
      else if (hostname.includes('factcheck')) sourceName.textContent = 'Fact Check Org';
      else if (hostname.includes('reuters')) sourceName.textContent = 'Reuters News';
      else sourceName.textContent = hostname;
      
      sourceContent.appendChild(sourceIcon);
      sourceContent.appendChild(sourceName);
      
      const externalIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      externalIcon.setAttribute('class', 'source-external');
      externalIcon.setAttribute('fill', 'none');
      externalIcon.setAttribute('viewBox', '0 0 24 24');
      externalIcon.setAttribute('stroke', 'currentColor');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('d', 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14');
      externalIcon.appendChild(path);
      
      sourceItem.appendChild(sourceContent);
      sourceItem.appendChild(externalIcon);
      sourcesList.appendChild(sourceItem);
    });
  } else {
    const noSourcesDiv = document.createElement('div');
    noSourcesDiv.style.color = '#9ca3af';
    noSourcesDiv.style.fontSize = '13px';
    noSourcesDiv.style.textAlign = 'center';
    noSourcesDiv.style.padding = '12px';
    noSourcesDiv.textContent = (EXT_TRANSLATIONS && EXT_TRANSLATIONS['noSources']) || 'No sources available';
    sourcesList.appendChild(noSourcesDiv);
  }

  // Set bias analysis
  document.getElementById('bias').textContent = biasEmotionAnalysis || ((EXT_TRANSLATIONS && EXT_TRANSLATIONS['noBias']) || 'No bias analysis available');

  // Set emotion indicator based on bias analysis content
  const emotionOptions = document.querySelectorAll('.emotion-option');
  let activeEmotion = 'neutral';
  let manipulationScore = 12;
  
  if (biasEmotionAnalysis) {
    const lowerBias = biasEmotionAnalysis.toLowerCase();
    if (lowerBias.includes('manipulat') || lowerBias.includes('highly biased')) {
      activeEmotion = 'manipulative';
      manipulationScore = 75;
    } else if (lowerBias.includes('emotion') || lowerBias.includes('bias')) {
      activeEmotion = 'emotional';
      manipulationScore = 45;
    }
  }
  
  emotionOptions.forEach(option => {
    option.classList.remove('active');
    if (option.dataset.emotion === activeEmotion) {
      option.classList.add('active');
    }
  });
  
  document.getElementById('emotionLabel').textContent = activeEmotion.charAt(0).toUpperCase() + activeEmotion.slice(1);
  document.getElementById('manipulationScore').textContent = `Manipulation Score: ${manipulationScore}%`;

  // Copy button
  document.getElementById('copyBtn').addEventListener('click', () => {
    const text = `
Credify AI Analysis Results
==========================
Credibility Score: ${Math.round(credibilityScore)}
Verdict: ${factCheckVerdict}

Summary:
${verifiedSummary}

Bias & Emotion Analysis:
${biasEmotionAnalysis}

Sources:
${evidenceSources.slice(0, 5).join('\n')}
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
      alert((EXT_TRANSLATIONS && EXT_TRANSLATIONS['copied'] ) || 'Results copied to clipboard!');
    });
  });

  // Share button
  document.getElementById('shareBtn').addEventListener('click', () => {
    const shareText = `I analyzed this with Credify AI - Credibility Score: ${Math.round(credibilityScore)}/100, Verdict: ${factCheckVerdict}`;
    if (navigator.share) {
      navigator.share({ title: 'Credify AI Analysis', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert((EXT_TRANSLATIONS && EXT_TRANSLATIONS['shareCopied']) || 'Share text copied to clipboard!');
      });
    }
  });
}

function showError(message) {
  const errorEl = document.getElementById('error');
  const loadingEl = document.getElementById('loading');
  const resultsEl = document.getElementById('results');

  loadingEl.style.display = 'none';
  resultsEl.style.display = 'none';
  errorEl.style.display = 'block';
  
  document.getElementById('errorMessage').textContent = message;

  document.getElementById('retryBtn').addEventListener('click', () => {
    location.reload();
  });
}

function applyPopupTranslations() {
  try {
    if (!EXT_TRANSLATIONS) return;
    // Loading text
    const loadingP = document.querySelector('#loading p');
    if (loadingP && EXT_TRANSLATIONS['loading']) loadingP.textContent = EXT_TRANSLATIONS['loading'];

    // Results headings
    const heading = document.querySelector('#results h1');
    if (heading && EXT_TRANSLATIONS['title']) heading.textContent = EXT_TRANSLATIONS['title'];

    // Score label is set in HTML, no translation needed

    const verdictH = document.querySelector('.verdict-section h3');
    if (verdictH && EXT_TRANSLATIONS['verdictHeading']) verdictH.textContent = EXT_TRANSLATIONS['verdictHeading'];

    const summaryH = document.querySelector('.summary-section h3');
    if (summaryH && EXT_TRANSLATIONS['summaryHeading']) summaryH.textContent = EXT_TRANSLATIONS['summaryHeading'];

    const sourcesH = document.querySelector('.sources-section h3');
    if (sourcesH && EXT_TRANSLATIONS['sourcesHeading']) sourcesH.textContent = EXT_TRANSLATIONS['sourcesHeading'];

    const biasH = document.querySelector('.bias-section h3');
    if (biasH && EXT_TRANSLATIONS['biasHeading']) biasH.textContent = EXT_TRANSLATIONS['biasHeading'];

    // AI section
    const aiHeading = document.getElementById('aiHeading');
    if (aiHeading) aiHeading.textContent = EXT_TRANSLATIONS['aiHeading'] || 'AI-Generated?';
    const aiEl = document.getElementById('aiGenerated');
    if (aiEl) aiEl.textContent = EXT_TRANSLATIONS['aiGeneratedNo'] || 'No strong signs of AI generation';
    const aiConfEl = document.getElementById('aiConfidence');
    if (aiConfEl) aiConfEl.textContent = `${EXT_TRANSLATIONS['confidenceLabel'] || 'Confidence'}: 0%`;

    // Buttons
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn && EXT_TRANSLATIONS['copyBtn']) copyBtn.textContent = EXT_TRANSLATIONS['copyBtn'];
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn && EXT_TRANSLATIONS['shareBtn']) shareBtn.textContent = EXT_TRANSLATIONS['shareBtn'];

    // Error UI
    const errHeading = document.querySelector('#error h2');
    if (errHeading && EXT_TRANSLATIONS['errorTitle']) errHeading.textContent = EXT_TRANSLATIONS['errorTitle'];
    const retryBtn = document.getElementById('retryBtn');
    if (retryBtn && EXT_TRANSLATIONS['retryBtn']) retryBtn.textContent = EXT_TRANSLATIONS['retryBtn'];
  } catch (e) {
    // swallow
  }
}
