'use client';

import {
  FluentProvider,
  makeStaticStyles,
  makeStyles,
  tokens,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import { type ReactNode, useEffect, useMemo, useState } from 'react';

import useColorMode from '@/theme/use-color-mode';

const useStyles = makeStyles({
  hidden: {
    visibility: 'hidden',
    height: '100vh',
    width: '100vw',
  },
});

const useStaticStyles = makeStaticStyles({
  html: {
    lineHeight: '1.15',
    '-webkit-text-size-adjust': '100%',
  },
  main: {
    display: 'block',
  },
  h1: {
    fontSize: '2em',
    margin: '0.67em 0',
  },
  p: {
    marginBlockStart: tokens.spacingVerticalXS,
    marginBlockEnd: tokens.spacingVerticalXS,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  },
  b: {
    fontWeight: 'bolder',
  },
  strong: {
    fontWeight: 'bolder',
  },
  small: {
    fontSize: '80%',
  },
  pre: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  code: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  kbd: {
    fontFamily: tokens.fontFamilyMonospace,
  },
  samp: {
    fontFamily: tokens.fontFamilyMonospace,
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: Readonly<ThemeProviderProps>) {
  const styles = useStyles();
  useStaticStyles();
  const { isDark } = useColorMode();
  const theme = useMemo(
    () => (isDark ? webDarkTheme : webLightTheme),
    [isDark],
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={styles.hidden}>
        <FluentProvider theme={webLightTheme}>{children}</FluentProvider>
      </div>
    );
  }

  return <FluentProvider theme={theme}>{children}</FluentProvider>;
}
