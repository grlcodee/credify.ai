// Initialize context menu on install
chrome.runtime.onInstalled.addListener(() => {
  // Create context menu for text selection
  chrome.contextMenus.create({
    id: 'analyze-selection',
    title: 'Analyze with Credify AI',
    contexts: ['selection', 'link', 'page'],
  });
});

// Keep a fallback in-memory storage for the service worker
let _lastSelectedContent = null;

// Safe helper to set storage (works if chrome.storage exists)
const safeSetSelectedContent = (value) => {
  try {
    if (chrome && chrome.storage && chrome.storage.local && typeof chrome.storage.local.set === 'function') {
      return new Promise((resolve) => chrome.storage.local.set({ selectedContent: value }, resolve));
    }
  } catch (e) {
    // ignore
  }
  return Promise.resolve();
};

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'analyze-selection') {
    let contentToAnalyze = '';

    if (info.selectionText) {
      // User selected text
      contentToAnalyze = info.selectionText;
    } else if (info.linkUrl) {
      // User right-clicked a link
      contentToAnalyze = info.linkUrl;
    } else if (info.pageUrl) {
      // User right-clicked the page
      contentToAnalyze = info.pageUrl;
    }

    if (contentToAnalyze) {
      // Store content in memory for popup to access as a fallback
      _lastSelectedContent = contentToAnalyze;

      // Try to store in chrome.storage (if available)
      await safeSetSelectedContent(contentToAnalyze);

      // Open popup
      try {
        chrome.action.openPopup();
      } catch (e) {
        // Older Chromium builds or some browsers may not support openPopup reliably
        // As a fallback, we can send a message to the active tab to open the popup UI or notify the user.
        // For now, silently ignore — popup can be opened manually from toolbar.
      }
    }
  }
});

// Listen for extension messages (future use)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyze') {
    _lastSelectedContent = request.content;
    safeSetSelectedContent(request.content).then(() => {
      try { chrome.action.openPopup(); } catch (e) {}
      sendResponse({ status: 'popup_opened' });
    });
    // Indicate we'll respond asynchronously
    return true;
  }

  if (request.action === 'getLastContent') {
    // Prefer to return the value from chrome.storage if available
    try {
      if (chrome && chrome.storage && chrome.storage.local && typeof chrome.storage.local.get === 'function') {
        chrome.storage.local.get('selectedContent', (data) => {
          if (data && data.selectedContent) sendResponse({ selectedContent: data.selectedContent });
          else sendResponse({ selectedContent: _lastSelectedContent });
        });
        return true; // will respond asynchronously
      }
    } catch (e) {
      // ignore
    }

    sendResponse({ selectedContent: _lastSelectedContent });
    return false;
  }
});
