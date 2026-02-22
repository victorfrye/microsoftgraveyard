import { renderHook } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';

// Mock dependencies before importing
jest.mock('@/storage', () => ({
  useLocalStorage: jest.fn(() => ({
    value: { colorMode: 'light' },
    handleValueChange: jest.fn(),
  })),
}));

jest.mock('./use-theme-media-query', () => ({
  __esModule: true,
  default: jest.fn(() => false),
}));

jest.mock('./init-color-mode', () => ({
  __esModule: true,
  default: jest.fn(() => 'light'),
}));

import ColorModeProvider from './color-mode-provider';
import useColorMode from './use-color-mode';

describe('useColorMode', () => {
  it('returns context values when wrapped in provider', () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ColorModeProvider, null, children);

    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current).toHaveProperty('colorMode');
    expect(result.current).toHaveProperty('isLight');
    expect(result.current).toHaveProperty('isDark');
    expect(result.current).toHaveProperty('onColorModeToggle');
    expect(result.current).toHaveProperty('onColorModeChange');
  });

  it('returns correct values for light mode', () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ColorModeProvider, null, children);

    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.colorMode).toBe('light');
    expect(result.current.isLight).toBe(true);
    expect(result.current.isDark).toBe(false);
  });

  it('provides toggle and change functions', () => {
    const wrapper = ({ children }: { children: ReactNode }) =>
      createElement(ColorModeProvider, null, children);

    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(typeof result.current.onColorModeToggle).toBe('function');
    expect(typeof result.current.onColorModeChange).toBe('function');
  });
});
