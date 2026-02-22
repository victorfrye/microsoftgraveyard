import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import CookieBanner from './banner';

const mockUseCookieBanner = {
  showFab: false,
  consentDialogOpen: false,
  managerDialogOpen: false,
  analyticsEnabled: true,
  advertisingEnabled: true,
  handleAcceptClick: jest.fn(),
  handleRejectClick: jest.fn(),
  handleManageClick: jest.fn(),
  handleSaveClick: jest.fn(),
  handleAnalyticsToggle: jest.fn(),
  handleAdvertisingToggle: jest.fn(),
  handleFabClick: jest.fn(),
};

jest.mock('@/privacy/cookies/use-cookie-banner', () => ({
  __esModule: true,
  default: jest.fn(() => mockUseCookieBanner),
}));

jest.mock('@/privacy/cookies/fab', () => ({
  __esModule: true,
  default: () => <div data-testid="cookie-fab" />,
}));

jest.mock('@/privacy/cookies/consent-dialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="consent-dialog" /> : null,
}));

jest.mock('@/privacy/cookies/manager-dialog', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean }) =>
    open ? <div data-testid="manager-dialog" /> : null,
}));

describe('CookieBanner', () => {
  it('renders fab when showFab is true', () => {
    mockUseCookieBanner.showFab = true;

    renderWithProviders(<CookieBanner />);

    expect(screen.getByTestId('cookie-fab')).toBeInTheDocument();
  });

  it('renders consent dialog when consentDialogOpen is true', () => {
    mockUseCookieBanner.consentDialogOpen = true;

    renderWithProviders(<CookieBanner />);

    expect(screen.getByTestId('consent-dialog')).toBeInTheDocument();
  });

  it('renders manager dialog when managerDialogOpen is true', () => {
    mockUseCookieBanner.managerDialogOpen = true;

    renderWithProviders(<CookieBanner />);

    expect(screen.getByTestId('manager-dialog')).toBeInTheDocument();
  });
});
