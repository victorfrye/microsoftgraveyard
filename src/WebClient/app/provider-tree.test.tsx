import { render, screen } from '@testing-library/react';
import ProviderTree from './provider-tree';

jest.mock('@/privacy', () => ({
  ConsentProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="consent-provider">{children}</div>
  ),
}));

jest.mock('@/theme', () => ({
  ColorModeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="color-mode-provider">{children}</div>
  ),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe('ProviderTree', () => {
  it('renders children', () => {
    render(
      <ProviderTree>
        <div data-testid="child">Test Content</div>
      </ProviderTree>,
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('nests providers in correct order: Consent > ColorMode > Theme', () => {
    render(
      <ProviderTree>
        <span>Content</span>
      </ProviderTree>,
    );

    const consent = screen.getByTestId('consent-provider');
    const colorMode = screen.getByTestId('color-mode-provider');
    const theme = screen.getByTestId('theme-provider');

    expect(consent).toContainElement(colorMode);
    expect(colorMode).toContainElement(theme);
    expect(theme).toHaveTextContent('Content');
  });
});
