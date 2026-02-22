import { renderHook } from '@testing-library/react';

// Mock the Clarity module
jest.mock('@microsoft/clarity', () => ({
  __esModule: true,
  default: {
    consent: jest.fn(),
  },
}));

import Clarity from '@microsoft/clarity';
import useClarity from './use-clarity';

describe('useClarity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls Clarity.consent with true', () => {
    const { result } = renderHook(() => useClarity());

    result.current.handleConsentChange(true);

    expect(Clarity.consent).toHaveBeenCalledWith(true);
  });

  it('calls Clarity.consent with false', () => {
    const { result } = renderHook(() => useClarity());

    result.current.handleConsentChange(false);

    expect(Clarity.consent).toHaveBeenCalledWith(false);
  });

  it('returns handleConsentChange function', () => {
    const { result } = renderHook(() => useClarity());

    expect(typeof result.current.handleConsentChange).toBe('function');
  });
});
