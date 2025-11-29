import { useEffect, useState } from 'react';

interface Translations {
  [key: string]: any;
}

export function useLanguage() {
  const [language, setLanguage] = useState<string>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get language from localStorage
    const storedLang = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(storedLang);

    // Load translations
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${storedLang}/common.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
        }
      } catch (error) {
        console.error('Error loading translations:', error);
      }
      setIsLoaded(true);
    };

    loadTranslations();
  }, []);

  // Watch for storage changes from other tabs/language switcher
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferredLanguage' && e.newValue && e.newValue !== language) {
        setLanguage(e.newValue);
        loadNewLanguage(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [language]);

  const loadNewLanguage = async (lang: string) => {
    try {
      const response = await fetch(`/locales/${lang}/common.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  };

  const t = (key: string, defaultValue: string = ''): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof value === 'string' ? value : defaultValue || key;
  };

  return { language, translations, t, isLoaded };
}
