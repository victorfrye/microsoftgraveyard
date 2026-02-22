import { act, render, screen } from '@testing-library/react';

// Mock dependencies before importing the component
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

import { useLocalStorage } from '@/storage';
import ColorModeProvider from './color-mode-provider';
import useColorMode from './use-color-mode';

describe('ColorModeProvider', () => {
  const mockUseLocalStorage = useLocalStorage as jest.MockedFunction<
    typeof useLocalStorage
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children', () => {
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'light' },
      handleValueChange: jest.fn(),
    });

    render(
      <ColorModeProvider>
        <div>Test Content</div>
      </ColorModeProvider>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('provides default color mode', () => {
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'light' },
      handleValueChange: jest.fn(),
    });

    function TestConsumer() {
      const { colorMode, isLight, isDark } = useColorMode();
      return (
        <div>
          <span data-testid="color-mode">{colorMode}</span>
          <span data-testid="is-light">{isLight.toString()}</span>
          <span data-testid="is-dark">{isDark.toString()}</span>
        </div>
      );
    }

    render(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('light');
    expect(screen.getByTestId('is-light')).toHaveTextContent('true');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
  });

  it('toggles color mode on onColorModeToggle', () => {
    const mockHandleValueChange = jest.fn();
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'light' },
      handleValueChange: mockHandleValueChange,
    });

    function TestConsumer() {
      const { colorMode, onColorModeToggle } = useColorMode();
      return (
        <div>
          <span data-testid="color-mode">{colorMode}</span>
          <button type="button" onClick={onColorModeToggle}>
            Toggle
          </button>
        </div>
      );
    }

    render(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    const toggleButton = screen.getByRole('button', { name: 'Toggle' });

    act(() => {
      toggleButton.click();
    });

    expect(mockHandleValueChange).toHaveBeenCalledWith({
      colorMode: 'dark',
    });
  });

  it('provides dark color mode when stored preference is dark', () => {
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'dark' },
      handleValueChange: jest.fn(),
    });

    function TestConsumer() {
      const { colorMode, isLight, isDark } = useColorMode();
      return (
        <div>
          <span data-testid="color-mode">{colorMode}</span>
          <span data-testid="is-light">{isLight.toString()}</span>
          <span data-testid="is-dark">{isDark.toString()}</span>
        </div>
      );
    }

    render(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-light')).toHaveTextContent('false');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
  });

  it('falls back to system preference when no stored colorMode', () => {
    const useThemeMediaQuery = require('./use-theme-media-query').default;
    useThemeMediaQuery.mockReturnValue(true);

    mockUseLocalStorage.mockReturnValue({
      value: null,
      handleValueChange: jest.fn(),
    });

    function TestConsumer() {
      const { colorMode } = useColorMode();
      return <span data-testid="color-mode">{colorMode}</span>;
    }

    render(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    expect(screen.getByTestId('color-mode')).toHaveTextContent('dark');
  });

  it('toggles from dark to light', () => {
    const mockHandleValueChange = jest.fn();
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'dark' },
      handleValueChange: mockHandleValueChange,
    });

    function TestConsumer() {
      const { colorMode, onColorModeToggle } = useColorMode();
      return (
        <div>
          <span data-testid="color-mode">{colorMode}</span>
          <button type="button" onClick={onColorModeToggle}>
            Toggle
          </button>
        </div>
      );
    }

    render(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    act(() => {
      screen.getByRole('button', { name: 'Toggle' }).click();
    });

    expect(mockHandleValueChange).toHaveBeenCalledWith({
      colorMode: 'light',
    });
  });

  it('changes color mode on onColorModeChange', () => {
    const mockHandleValueChange = jest.fn();
    mockUseLocalStorage.mockReturnValue({
      value: { colorMode: 'light' },
      handleValueChange: mockHandleValueChange,
    });

    function TestConsumer() {
      const { onColorModeChange } = useColorMode();
      return (
        <button type="button" onClick={() => onColorModeChange('dark')}>
          Set Dark
        </button>
      );
    }

    render(
      <ColorModeProvider>
        <TestConsumer />
      </ColorModeProvider>,
    );

    const setDarkButton = screen.getByRole('button', { name: 'Set Dark' });

    act(() => {
      setDarkButton.click();
    });

    expect(mockHandleValueChange).toHaveBeenCalledWith({
      colorMode: 'dark',
    });
  });
});
