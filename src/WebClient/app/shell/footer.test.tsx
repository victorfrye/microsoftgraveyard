import { renderWithProviders } from '@test-utils';
import { screen } from '@testing-library/react';

import Footer from './footer';

jest.mock('@/theme', () => ({
  useColorMode: jest.fn(() => ({
    colorMode: 'light',
    isDark: false,
    isLight: true,
    onColorModeToggle: jest.fn(),
    onColorModeChange: jest.fn(),
  })),
}));

jest.mock('@/shell/socials', () => ({
  __esModule: true,
  default: () => <div data-testid="social-buttons" />,
}));

describe('Footer', () => {
  it('renders the byline "Made with 💙 by Victor Frye"', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Made with 💙 by Victor Frye')).toBeInTheDocument();
  });

  it('renders the privacy link', () => {
    renderWithProviders(<Footer />);

    const privacyLink = screen.getByText('Privacy');
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink.closest('a')).toHaveAttribute(
      'href',
      'https://victorfrye.com/privacy',
    );
  });

  it('renders copyright with current year', () => {
    const currentYear = new Date().getFullYear();
    renderWithProviders(<Footer />);

    expect(
      screen.getByText(`© Victor Frye ${currentYear}`),
    ).toBeInTheDocument();
  });

  it('renders color mode toggle button', () => {
    renderWithProviders(<Footer />);

    const button = screen.getByRole('button', { name: /toggle/i });
    expect(button).toBeInTheDocument();
  });
});
