/**
 * Google Translate Setup Verification Script
 * Run this in the browser console to verify Google Translate integration
 */

(function verifyGoogleTranslateSetup() {
  console.log('🌐 Google Translate Setup Verification\n');
  console.log('=====================================\n');

  // Check 1: Google Translate Script
  const scriptLoaded = !!window.google?.translate;
  console.log(`1. Google Translate Script: ${scriptLoaded ? '✅ Loaded' : '❌ Not Loaded'}`);

  // Check 2: Translation Element
  const translateElement = document.getElementById('google_translate_element');
  console.log(`2. Translation Element: ${translateElement ? '✅ Found' : '❌ Missing'}`);

  // Check 3: Language Dropdown
  const dropdown = document.querySelector('.goog-te-combo');
  console.log(`3. Language Dropdown: ${dropdown ? '✅ Found' : '❌ Missing'}`);

  // Check 4: Current Language
  const currentLang = localStorage.getItem('preferredLanguage') || 'en';
  console.log(`4. Stored Language: ${currentLang}`);

  // Check 5: Available Languages
  if (dropdown) {
    const options = Array.from(dropdown.options).map(opt => opt.value).filter(v => v);
    console.log(`5. Available Languages: ${options.length} languages`);
    console.log(`   Languages: ${options.join(', ')}`);
  }

  // Check 6: Google Translate Banner (should be hidden)
  const banner = document.querySelector('.goog-te-banner-frame');
  const bannerHidden = !banner || window.getComputedStyle(banner).display === 'none';
  console.log(`6. Google Banner Hidden: ${bannerHidden ? '✅ Yes' : '❌ No (should be hidden)'}`);

  // Check 7: Body Margin (should not be altered)
  const bodyMarginTop = window.getComputedStyle(document.body).marginTop;
  const bodyOk = bodyMarginTop === '0px';
  console.log(`7. Body Margin: ${bodyOk ? '✅ Normal (0px)' : `⚠️ ${bodyMarginTop}`}`);

  // Test Function
  console.log('\n📝 Test Functions Available:\n');
  console.log('- testLanguageChange("hi")  // Switch to Hindi');
  console.log('- testLanguageChange("ta")  // Switch to Tamil');
  console.log('- testLanguageChange("en")  // Back to English');
  console.log('- getCurrentTranslationInfo()  // Get current state');
  console.log('- resetTranslation()  // Reset to original');

  // Summary
  console.log('\n📊 Summary:\n');
  const checks = [scriptLoaded, translateElement, dropdown, bannerHidden, bodyOk];
  const passed = checks.filter(Boolean).length;
  const total = checks.length;
  
  if (passed === total) {
    console.log(`✅ All checks passed (${passed}/${total})`);
    console.log('🎉 Google Translate is properly configured!');
  } else {
    console.log(`⚠️ ${passed}/${total} checks passed`);
    console.log('Please ensure the page has fully loaded and Google Translate script is initialized.');
  }

  console.log('\n=====================================\n');
})();

// Helper function to test language changes
window.testLanguageChange = function(lang) {
  const dropdown = document.querySelector('.goog-te-combo');
  if (dropdown) {
    dropdown.value = lang;
    dropdown.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`✅ Language changed to: ${lang}`);
  } else {
    console.error('❌ Language dropdown not found');
  }
};

// Helper function to get current translation info
window.getCurrentTranslationInfo = function() {
  const dropdown = document.querySelector('.goog-te-combo');
  return {
    scriptLoaded: !!window.google?.translate,
    currentLanguage: dropdown?.value || 'none',
    storedLanguage: localStorage.getItem('preferredLanguage') || 'none',
    availableLanguages: dropdown ? Array.from(dropdown.options).map(o => o.value).filter(v => v) : []
  };
};

// Helper function to reset translation
window.resetTranslation = function() {
  const dropdown = document.querySelector('.goog-te-combo');
  if (dropdown) {
    dropdown.value = '';
    dropdown.dispatchEvent(new Event('change', { bubbles: true }));
    localStorage.removeItem('preferredLanguage');
    console.log('✅ Translation reset to original language');
  }
};

console.log('📌 Tip: Run verifyGoogleTranslateSetup() to check setup again');
