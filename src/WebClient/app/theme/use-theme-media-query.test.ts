import { renderHook } from '@testing-library/react';
import useThemeMediaQuery from './use-theme-media-query';

describe('useThemeMediaQuery', () => {
  let mockMediaQuery: {
    matches: boolean;
    media: string;
    onchange: null;
    addListener: jest.Mock;
    removeListener: jest.Mock;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
    dispatchEvent: jest.Mock;
  };

  beforeEach(() => {
    mockMediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        ...mockMediaQuery,
        media: query,
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns false when system prefers light', () => {
    mockMediaQuery.matches = false;

    const { result } = renderHook(() => useThemeMediaQuery());

    expect(result.current).toBe(false);
  });

  it('returns true when system prefers dark', () => {
    mockMediaQuery.matches = true;

    const { result } = renderHook(() => useThemeMediaQuery());

    expect(result.current).toBe(true);
  });

  it('adds event listener on mount', () => {
    renderHook(() => useThemeMediaQuery());

    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('removes event listener on unmount', () => {
    const { unmount } = renderHook(() => useThemeMediaQuery());

    unmount();

    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });
});
