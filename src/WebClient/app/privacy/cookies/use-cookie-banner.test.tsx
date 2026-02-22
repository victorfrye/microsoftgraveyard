import type { SwitchOnChangeData } from '@fluentui/react-components';
import { act, renderHook } from '@testing-library/react';
import type { ChangeEvent } from 'react';

import useCookieBanner from './use-cookie-banner';

const mockOnConsentChange = jest.fn();
const mockUseConsent = jest.fn(() => ({
  consent: { analytics: true, advertising: true },
  onConsentChange: mockOnConsentChange,
}));

jest.mock('@/privacy/use-consent', () => ({
  __esModule: true,
  default: (...args: unknown[]) => mockUseConsent(...args),
}));

describe('useCookieBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initial state: showFab true, consentDialogOpen false when consent exists', () => {
    const { result } = renderHook(() => useCookieBanner());

    expect(result.current.showFab).toBe(true);
    expect(result.current.consentDialogOpen).toBe(false);
  });

  it('handleAcceptClick sets analytics and advertising to true, closes dialogs', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAcceptClick();
    });

    expect(mockOnConsentChange).toHaveBeenCalledWith({
      analytics: true,
      advertising: true,
    });
    expect(result.current.consentDialogOpen).toBe(false);
    expect(result.current.managerDialogOpen).toBe(false);
    expect(result.current.showFab).toBe(true);
  });

  it('handleRejectClick sets analytics and advertising to false, closes dialogs', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleRejectClick();
    });

    expect(mockOnConsentChange).toHaveBeenCalledWith({
      analytics: false,
      advertising: false,
    });
    expect(result.current.consentDialogOpen).toBe(false);
    expect(result.current.managerDialogOpen).toBe(false);
    expect(result.current.showFab).toBe(true);
  });

  it('handleManageClick opens manager dialog, closes consent dialog', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleManageClick();
    });

    expect(result.current.consentDialogOpen).toBe(false);
    expect(result.current.managerDialogOpen).toBe(true);
  });

  it('handleSaveClick saves current toggle states', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleSaveClick();
    });

    expect(mockOnConsentChange).toHaveBeenCalled();
    expect(result.current.managerDialogOpen).toBe(false);
    expect(result.current.showFab).toBe(true);
  });

  it('handleFabClick opens manager dialog, hides fab', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleFabClick();
    });

    expect(result.current.showFab).toBe(false);
    expect(result.current.managerDialogOpen).toBe(true);
  });

  it('opens consent dialog when no saved consent settings', () => {
    mockUseConsent.mockReturnValue({
      consent: null,
      onConsentChange: mockOnConsentChange,
    });

    const { result } = renderHook(() => useCookieBanner());

    expect(result.current.showFab).toBe(false);
    expect(result.current.consentDialogOpen).toBe(true);
  });

  it('handleAnalyticsToggle updates analytics state', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAnalyticsToggle(
        {} as ChangeEvent<HTMLInputElement>,
        { checked: false } as SwitchOnChangeData,
      );
    });

    expect(result.current.analyticsEnabled).toBe(false);
  });

  it('handleAdvertisingToggle updates advertising state', () => {
    const { result } = renderHook(() => useCookieBanner());

    act(() => {
      result.current.handleAdvertisingToggle(
        {} as ChangeEvent<HTMLInputElement>,
        { checked: false } as SwitchOnChangeData,
      );
    });

    expect(result.current.advertisingEnabled).toBe(false);
  });
});
