import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMediaQuery } from 'react-responsive';

const DarkModeContext = createContext({
  isDark: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onDarkModeToggled: (_isDark: boolean) => {},
});
DarkModeContext.displayName = 'DarkModeContext';

const DarkModeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
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
};

export default DarkModeProvider;

export { DarkModeProvider, DarkModeContext };
