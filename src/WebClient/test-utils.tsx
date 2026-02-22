import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

function TestProviders({ children }: Readonly<{ children: ReactNode }>) {
  return <FluentProvider theme={webLightTheme}>{children}</FluentProvider>;
}

function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, { wrapper: TestProviders, ...options });
}

export { renderWithProviders, TestProviders };
