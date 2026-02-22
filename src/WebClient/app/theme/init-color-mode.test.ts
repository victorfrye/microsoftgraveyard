import { readValue } from '@/storage';
import type ThemePreferences from '@/theme/theme-preferences';
import initColorMode from './init-color-mode';

jest.mock('@/storage');

describe('initColorMode', () => {
  const mockReadValue = readValue as jest.MockedFunction<typeof readValue>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns stored colorMode when theme preferences exist in localStorage', () => {
    const mockThemePreferences: ThemePreferences = { colorMode: 'dark' };
    mockReadValue.mockReturnValue(mockThemePreferences);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const result = initColorMode();

    expect(result).toBe('dark');
    expect(mockReadValue).toHaveBeenCalledWith('theme');
  });

  it("returns 'dark' when system prefers dark and no stored preference", () => {
    mockReadValue.mockReturnValue(null);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const result = initColorMode();

    expect(result).toBe('dark');
  });

  it("returns 'light' when system prefers light and no stored preference", () => {
    mockReadValue.mockReturnValue(null);

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const result = initColorMode();

    expect(result).toBe('light');
  });
});
