import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import Shell from './shell';

jest.mock('@/shell/header', () => ({
  __esModule: true,
  default: () => <div data-testid="header" />,
}));

jest.mock('@/shell/footer', () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

jest.mock('@/shell/scroll-fab', () => ({
  __esModule: true,
  default: () => <div data-testid="scroll-fab" />,
}));

jest.mock('@/privacy', () => ({
  CookieBanner: () => <div data-testid="cookie-banner" />,
}));

describe('Shell', () => {
  it('renders children content', () => {
    renderWithProviders(
      <Shell>
        <div data-testid="test-child">Test Content</div>
      </Shell>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders header', () => {
    renderWithProviders(<Shell>Content</Shell>);

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderWithProviders(<Shell>Content</Shell>);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders scroll-fab', () => {
    renderWithProviders(<Shell>Content</Shell>);

    expect(screen.getByTestId('scroll-fab')).toBeInTheDocument();
  });

  it('renders cookie-banner', () => {
    renderWithProviders(<Shell>Content</Shell>);

    expect(screen.getByTestId('cookie-banner')).toBeInTheDocument();
  });
});
