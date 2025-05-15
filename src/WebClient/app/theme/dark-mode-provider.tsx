'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useMediaQuery } from 'react-responsive';

interface DarkModeContextProps {
  isDark: boolean;
  onDarkModeToggled: (isDark: boolean) => void;
}

export const DarkModeContext = createContext<DarkModeContextProps>({
  isDark: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onDarkModeToggled: (_isDark: boolean) => {},
});

export default function DarkModeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isDark, setIsDark] = useState(true);

  const systemPrefersLight = useMediaQuery(
    {
      query: '(prefers-color-scheme: light)',
    },
    undefined,
    (isSystemLight) => setIsDark(!isSystemLight)
  );

  const onDarkModeToggled = useCallback((isDark: boolean) => {
    setIsDark(isDark);
  }, []);

  const darkMode = useMemo(
    () => ({
      isDark,
      onDarkModeToggled,
    }),
    [isDark, onDarkModeToggled]
  );

  useEffect(() => {
    if (systemPrefersLight) {
      setIsDark(false);
    }
  }, [systemPrefersLight]);

  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
}
