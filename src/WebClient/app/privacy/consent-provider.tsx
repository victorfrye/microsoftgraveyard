'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { useClarity, useGA } from '@/analytics';
import type ConsentSettings from '@/privacy/consent-settings';
import { readValue, useLocalStorage } from '@/storage';

let initialized = false;

interface ConsentContextProps {
  consent: ConsentSettings | null;
  onConsentChange: (settings: ConsentSettings) => void;
}

export const ConsentContext = createContext<ConsentContextProps>({
  consent: readValue<ConsentSettings>('consent'),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onConsentChange: (_settings: ConsentSettings) => {},
});

interface ConsentProviderProps {
  children: ReactNode;
}

export default function ConsentProvider({ children }: ConsentProviderProps) {
  const {
    value: consentSettings,
    handleValueChange: handleCookieSettingsChange,
  } = useLocalStorage<ConsentSettings>('consent');

  const { handleConsentChange: handleGAConsentChange } = useGA();
  const { handleConsentChange: handleClarityConsentChange } = useClarity();

  const handleConsentChange = useCallback(
    (consent: ConsentSettings) => {
      handleCookieSettingsChange(consent);

      handleGAConsentChange({
        analytics: consent.analytics,
        advertising: consent.advertising,
      });
      handleClarityConsentChange(consent.analytics);
    },
    [
      handleClarityConsentChange,
      handleCookieSettingsChange,
      handleGAConsentChange,
    ],
  );

  useEffect(() => {
    if (initialized || typeof window === 'undefined') {
      return;
    }

    if (consentSettings) {
      handleGAConsentChange({
        analytics: consentSettings.analytics,
        advertising: consentSettings.advertising,
      });
      handleClarityConsentChange(consentSettings.analytics);
    }

    initialized = true;
  }, [consentSettings, handleClarityConsentChange, handleGAConsentChange]);

  const consent = useMemo(
    () => ({
      consent: consentSettings,
      onConsentChange: handleConsentChange,
    }),
    [consentSettings, handleConsentChange],
  );

  return (
    <ConsentContext.Provider value={consent}>
      {children}
    </ConsentContext.Provider>
  );
}
