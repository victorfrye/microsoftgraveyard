import { render, screen } from '@testing-library/react';

// Mock useColorMode before importing ThemeProvider
jest.mock('./use-color-mode', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isDark: false,
    isLight: true,
    colorMode: 'light',
    onColorModeToggle: jest.fn(),
    onColorModeChange: jest.fn(),
  })),
}));

import ThemeProvider from './theme-provider';
import useColorMode from './use-color-mode';

describe('ThemeProvider', () => {
  const mockUseColorMode = useColorMode as jest.MockedFunction<
    typeof useColorMode
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when mounted', () => {
    mockUseColorMode.mockReturnValue({
      isDark: false,
      isLight: true,
      colorMode: 'light',
      onColorModeToggle: jest.fn(),
      onColorModeChange: jest.fn(),
    });

    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>,
    );

    // Wait for mount effect
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with FluentProvider for light theme', () => {
    mockUseColorMode.mockReturnValue({
      isDark: false,
      isLight: true,
      colorMode: 'light',
      onColorModeToggle: jest.fn(),
      onColorModeChange: jest.fn(),
    });

    const { container } = render(
      <ThemeProvider>
        <div>Light Theme Content</div>
      </ThemeProvider>,
    );

    expect(container.querySelector('.fui-FluentProvider')).toBeInTheDocument();
    expect(screen.getByText('Light Theme Content')).toBeInTheDocument();
  });

  it('renders with FluentProvider for dark theme', () => {
    mockUseColorMode.mockReturnValue({
      isDark: true,
      isLight: false,
      colorMode: 'dark',
      onColorModeToggle: jest.fn(),
      onColorModeChange: jest.fn(),
    });

    const { container } = render(
      <ThemeProvider>
        <div>Dark Theme Content</div>
      </ThemeProvider>,
    );

    expect(container.querySelector('.fui-FluentProvider')).toBeInTheDocument();
    expect(screen.getByText('Dark Theme Content')).toBeInTheDocument();
  });
});
