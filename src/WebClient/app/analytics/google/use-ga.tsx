'use client';

interface ConsentChangeData {
  analytics: boolean;
  advertising: boolean;
}

export default function useGA() {
  const handleConsentChange = (consent: ConsentChangeData) => {
    if (typeof window.gtag !== 'function') {
      console.error('Google Analytics gtag function is not available.');
      return;
    }

    window.gtag('consent', 'update', {
      ad_storage: consent.advertising ? 'granted' : 'denied',
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_user_data: consent.advertising ? 'granted' : 'denied',
      ad_personalization: consent.advertising ? 'granted' : 'denied',
    });
  };

  return { handleConsentChange };
}
