import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import ConsentProvider from './consent-provider';
import useConsent from './use-consent';

jest.mock('@/analytics', () => ({
  useGA: jest.fn(() => ({
    handleConsentChange: jest.fn(),
  })),
  useClarity: jest.fn(() => ({
    handleConsentChange: jest.fn(),
  })),
}));

jest.mock('@/storage', () => ({
  readValue: jest.fn(() => null),
  useLocalStorage: jest.fn(() => ({
    value: null,
    handleValueChange: jest.fn(),
  })),
}));

function Wrapper({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <FluentProvider theme={webLightTheme}>
      <ConsentProvider>{children}</ConsentProvider>
    </FluentProvider>
  );
}

describe('useConsent', () => {
  it('returns context defaults', () => {
    const { result } = renderHook(() => useConsent(), { wrapper: Wrapper });

    expect(result.current).toHaveProperty('consent');
    expect(result.current).toHaveProperty('onConsentChange');
    expect(typeof result.current.onConsentChange).toBe('function');
  });
});
