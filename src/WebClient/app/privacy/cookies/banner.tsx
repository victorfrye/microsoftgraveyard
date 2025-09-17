'use client';

import CookieConsentDialog from '@microsoftgraveyard/privacy/cookies/consent-dialog';
import CookieFab from '@microsoftgraveyard/privacy/cookies/fab';
import CookieManagerDialog from '@microsoftgraveyard/privacy/cookies/manager-dialog';
import useCookieBanner from '@microsoftgraveyard/privacy/cookies/use-cookie-banner';

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
