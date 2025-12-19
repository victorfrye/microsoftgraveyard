'use client';

import {
  Button,
  Caption1,
  Divider,
  Link,
  makeStyles,
  Tooltip,
  tokens,
} from '@fluentui/react-components';
import { WeatherMoonFilled, WeatherSunnyFilled } from '@fluentui/react-icons';
import { useCallback } from 'react';

import FooterButtons from '@/shell/socials';
import ShellText from '@/shell/text';
import { useColorMode } from '@/theme';

const useStyles = makeStyles({
  footer: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      flexDirection: 'column',
      rowGap: tokens.spacingVerticalS,
    },
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXL} ${tokens.spacingVerticalXL}`,
  },
  divider: {
    flex: '0 1 auto',
    margin: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalXXL}`,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: tokens.spacingVerticalM,
    '@media screen and (max-width: 576px)': {
      justifyContent: 'center',
      gap: tokens.spacingVerticalXXS,
    },
  },
  icon: {
    color: tokens.colorNeutralForeground1,
  },
  byline: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto 0',
    '@media screen and (max-width: 576px)': {
      padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
    },
    flexWrap: 'wrap',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
  legal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 'auto 0',
    columnGap: tokens.spacingVerticalL,
    '@media screen and (max-width: 576px)': {
      gap: tokens.spacingVerticalMNudge,
      justifyContent: 'center',
      padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalNone}`,
    },
    flexWrap: 'wrap',
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalL}`,
  },
  copyright: {
    color: tokens.colorNeutralForeground2,
  },
});

export default function Footer() {
  const styles = useStyles();
  const today: Date = new Date();

  const { colorMode, isDark, onColorModeToggle } = useColorMode();

  const handleColorModeClick = useCallback(() => {
    onColorModeToggle();
  }, [onColorModeToggle]);

  return (
    <>
      <Divider appearance="subtle" inset className={styles.divider} />

      <footer className={styles.footer}>
        <div className={styles.container}>
          <FooterButtons />
          <Tooltip
            withArrow
            content={ShellText.footer.toggleColor(
              colorMode === 'light' ? 'dark' : 'light',
            )}
            relationship="label"
          >
            <Button
              icon={
                isDark ? (
                  <WeatherSunnyFilled className={styles.icon} />
                ) : (
                  <WeatherMoonFilled className={styles.icon} />
                )
              }
              as="button"
              appearance="subtle"
              shape="circular"
              size="large"
              onClick={handleColorModeClick}
            />
          </Tooltip>
        </div>

        <div className={styles.byline}>
          <Link href="https://victorfrye.com" appearance="subtle">
            <Caption1 as="span" align="start" block>
              {ShellText.footer.byline}
            </Caption1>
          </Link>
        </div>

        <div className={styles.legal}>
          <Link href={'https://victorfrye.com/privacy'} appearance="subtle">
            <Caption1 as="span" align="end" block>
              {ShellText.footer.privacy}
            </Caption1>
          </Link>

          <Caption1 as="span" align="end" block className={styles.copyright}>
            {ShellText.footer.copyright(today.getFullYear())}
          </Caption1>
        </div>
      </footer>
    </>
  );
}
