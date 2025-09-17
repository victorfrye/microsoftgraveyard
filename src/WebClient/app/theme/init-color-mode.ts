import { readValue } from '@microsoftgraveyard/storage';
import ThemePreferences from '@microsoftgraveyard/theme/theme-preferences';

export default function initColorMode() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const userPrefersDark = readValue<ThemePreferences>('theme');

  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return userPrefersDark?.colorMode ?? (systemPrefersDark ? 'dark' : 'light');
}
