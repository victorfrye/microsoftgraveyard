'use client';

import type { SwitchOnChangeData } from '@fluentui/react-components';
import { type ChangeEvent, useEffect, useState } from 'react';

import type ConsentSettings from '@/privacy/consent-settings';
import useConsent from '@/privacy/use-consent';

export default function useCookieBanner() {
  const { consent: settings, onConsentChange } = useConsent();

  const [showFab, setShowFab] = useState(true);
  const [consentDialogOpen, setConsentDialogOpen] = useState(false);
  const [managerDialogOpen, setManagerDialogOpen] = useState(false);

  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    settings?.analytics ?? true,
  );
  const [advertisingEnabled, setAdvertisingEnabled] = useState(
    settings?.advertising ?? true,
  );

  useEffect(() => {
    if (!settings) {
      setShowFab(false);
      setConsentDialogOpen(true);
    }
  }, [settings]);

  const handleConsentChange = (cookies: ConsentSettings) => {
    setAnalyticsEnabled(cookies.analytics);
    setAdvertisingEnabled(cookies.advertising);

    onConsentChange(cookies);
  };

  const handleAcceptClick = () => {
    handleConsentChange({
      analytics: true,
      advertising: true,
    });

    setConsentDialogOpen(false);
    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleRejectClick = () => {
    handleConsentChange({
      analytics: false,
      advertising: false,
    });

    setConsentDialogOpen(false);
    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleManageClick = () => {
    setConsentDialogOpen(false);
    setManagerDialogOpen(true);
  };

  const handleSaveClick = () => {
    handleConsentChange({
      analytics: analyticsEnabled,
      advertising: advertisingEnabled,
    });

    setManagerDialogOpen(false);

    setShowFab(true);
  };

  const handleAnalyticsToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData,
  ) => {
    setAnalyticsEnabled(data.checked);
  };

  const handleAdvertisingToggle = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData,
  ) => {
    setAdvertisingEnabled(data.checked);
  };

  const handleFabClick = () => {
    setShowFab(false);

    setManagerDialogOpen(true);
  };

  return {
    showFab,
    consentDialogOpen,
    managerDialogOpen,
    analyticsEnabled,
    advertisingEnabled,
    handleAcceptClick,
    handleRejectClick,
    handleManageClick,
    handleSaveClick,
    handleAnalyticsToggle,
    handleAdvertisingToggle,
    handleFabClick,
  };
}
