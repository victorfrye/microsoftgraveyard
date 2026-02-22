import { renderHook } from '@testing-library/react';
import useGA from './use-ga';

describe('useGA', () => {
  let mockGtag: jest.Mock;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockGtag = jest.fn();
    Object.defineProperty(window, 'gtag', {
      writable: true,
      value: mockGtag,
    });

    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('calls gtag with correct consent params when gtag is available', () => {
    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({
      analytics: true,
      advertising: true,
    });

    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  });

  it('calls gtag with denied params when consent is false', () => {
    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({
      analytics: false,
      advertising: false,
    });

    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('calls gtag with mixed consent params', () => {
    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({
      analytics: true,
      advertising: false,
    });

    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      ad_storage: 'denied',
      analytics_storage: 'granted',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('logs error when gtag is not available', () => {
    Object.defineProperty(window, 'gtag', {
      writable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({
      analytics: true,
      advertising: true,
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Google Analytics gtag function is not available.',
    );
  });

  it('does not call gtag when gtag is not available', () => {
    Object.defineProperty(window, 'gtag', {
      writable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useGA());

    result.current.handleConsentChange({
      analytics: true,
      advertising: true,
    });

    expect(mockGtag).not.toHaveBeenCalled();
  });
});
