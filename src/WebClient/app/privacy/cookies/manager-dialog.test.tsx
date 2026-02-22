import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import CookieManagerDialog from './manager-dialog';

describe('CookieManagerDialog', () => {
  const mockOnAccept = jest.fn();
  const mockOnReject = jest.fn();
  const mockOnSave = jest.fn();
  const mockOnAnalyticsToggle = jest.fn();
  const mockOnAdvertisingToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog title when open', () => {
    renderWithProviders(
      <CookieManagerDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onSave={mockOnSave}
        analyticsEnabled={true}
        advertisingEnabled={true}
        onAnalyticsToggle={mockOnAnalyticsToggle}
        onAdvertisingToggle={mockOnAdvertisingToggle}
      />,
    );

    expect(screen.getByText('Manage your cookie settings')).toBeInTheDocument();
  });

  it('renders consent rows for Necessary, Analytics, Advertising', () => {
    renderWithProviders(
      <CookieManagerDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onSave={mockOnSave}
        analyticsEnabled={true}
        advertisingEnabled={true}
        onAnalyticsToggle={mockOnAnalyticsToggle}
        onAdvertisingToggle={mockOnAdvertisingToggle}
      />,
    );

    expect(screen.getByText('Necessary')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Advertising')).toBeInTheDocument();
  });

  it('renders accept, reject, save buttons', () => {
    renderWithProviders(
      <CookieManagerDialog
        open={true}
        onAccept={mockOnAccept}
        onReject={mockOnReject}
        onSave={mockOnSave}
        analyticsEnabled={true}
        advertisingEnabled={true}
        onAnalyticsToggle={mockOnAnalyticsToggle}
        onAdvertisingToggle={mockOnAdvertisingToggle}
      />,
    );

    expect(screen.getByText('Accept all')).toBeInTheDocument();
    expect(screen.getByText('Reject unnecessary')).toBeInTheDocument();
    expect(screen.getByText('Save settings')).toBeInTheDocument();
  });
});
