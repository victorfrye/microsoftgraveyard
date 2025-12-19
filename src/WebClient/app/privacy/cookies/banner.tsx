'use client';

import CookieConsentDialog from '@/privacy/cookies/consent-dialog';
import CookieFab from '@/privacy/cookies/fab';
import CookieManagerDialog from '@/privacy/cookies/manager-dialog';
import useCookieBanner from '@/privacy/cookies/use-cookie-banner';

export default function CookieBanner() {
  const {
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
  } = useCookieBanner();

  return (
    <div>
      {showFab && <CookieFab onClick={handleFabClick} />}

      <div>
        <CookieConsentDialog
          open={consentDialogOpen}
          onAccept={handleAcceptClick}
          onReject={handleRejectClick}
          onManage={handleManageClick}
        />
      </div>

      <div>
        <CookieManagerDialog
          open={managerDialogOpen}
          onAccept={handleAcceptClick}
          onReject={handleRejectClick}
          onSave={handleSaveClick}
          advertisingEnabled={advertisingEnabled}
          analyticsEnabled={analyticsEnabled}
          onAdvertisingToggle={handleAdvertisingToggle}
          onAnalyticsToggle={handleAnalyticsToggle}
        />
      </div>
    </div>
  );
}
