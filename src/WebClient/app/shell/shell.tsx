'use client';

import { ReactNode } from 'react';

import { makeStyles, tokens } from '@fluentui/react-components';

import { CookieBanner } from '@microsoftgraveyard/privacy';
import Footer from '@microsoftgraveyard/shell/footer';
import Header from '@microsoftgraveyard/shell/header';
import ScrollFab from '@microsoftgraveyard/shell/scroll-fab';

const useStyles = makeStyles({
  shell: {
    display: 'flex',
    minHeight: 'calc(100vh - (var(--spacingVerticalXXXL) * 2))',
    '@media screen and (max-width: 576px)': {
      minHeight: '100vh',
      padding: tokens.spacingVerticalNone,
    },
    padding: tokens.spacingVerticalXXXL,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    rowGap: tokens.spacingVerticalM,
  },
});

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  const styles = useStyles();

  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <Header />
        {children}
        <Footer />
      </div>

      <ScrollFab />

      <CookieBanner />
    </div>
  );
}
