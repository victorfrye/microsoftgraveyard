'use client';

import Clarity from '@microsoft/clarity';

export default function useClarity() {
  const handleConsentChange = (enabled: boolean) => {
    Clarity.consent(enabled);
  };

  return { handleConsentChange };
}
