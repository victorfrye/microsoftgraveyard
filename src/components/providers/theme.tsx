'use client';

import {
  BrandVariants,
  FluentProvider,
  Theme,
  createDarkTheme,
  createLightTheme,
  makeStaticStyles,
  tokens,
} from '@fluentui/react-components';
import { useDarkMode } from '@microsoft-graveyard/components/providers/darkMode';

const platinumTheme: BrandVariants = {
  10: '#030303',
  20: '#161819',
  30: '#242829',
  40: '#2E3436',
  50: '#394043',
  60: '#444D50',
  70: '#4F5A5E',
  80: '#5B686C',
  90: '#6A7679',
  100: '#788387',
  110: '#879194',
  120: '#979FA2',
  130: '#A6AEB0',
  140: '#B6BCBE',
  150: '#C7CBCD',
  160: '#D7DADB',
};

const lightTheme: Theme = {
  ...createLightTheme(platinumTheme),
};

const darkTheme: Theme = {
  ...createDarkTheme(platinumTheme),
};

darkTheme.colorBrandForeground1 = platinumTheme[110];
darkTheme.colorBrandForeground2 = platinumTheme[120];

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
  ul: {
    listStyleType: 'none',
    marginBlockStart: tokens.spacingVerticalXS,
    marginBlockEnd: tokens.spacingVerticalXS,
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingInlineStart: 0,
  },
});

const ThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  useStaticStyles();
  const { isDark } = useDarkMode();

  return (
    <FluentProvider theme={isDark ? darkTheme : lightTheme}>
      {children}
    </FluentProvider>
  );
};

export default ThemeProvider;

export { ThemeProvider };
