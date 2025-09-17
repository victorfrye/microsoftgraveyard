'use client';

import { useCallback, useEffect, useState } from 'react';

export default function useThemeMediaQuery(): boolean {
  const [prefersDark, setPrefersDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const handleMediaQueryChange = useCallback((event: MediaQueryListEvent) => {
    setPrefersDark(event.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [handleMediaQueryChange]);

  return prefersDark;
}
