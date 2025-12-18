'use client';

import { makeStyles, tokens } from '@fluentui/react-components';
import type { JSX } from 'react';

import { type Corpse, Headstone, useCorpsesDocument } from '@/graveyard';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    marginBottom: 'auto',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: tokens.spacingVerticalXL,
    margin: tokens.spacingVerticalNone,
  },
  container: {
    display: 'flex',
    '@media screen and (max-width: 768px)': {
      width: '75%',
    },
    '@media screen and (min-width: 1200px)': {
      width: '25%',
    },
    width: '41.66666667%',
    flex: '0 0 auto',
    margin: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export default function HomePage() {
  const styles = useStyles();
  const corpses = useCorpsesDocument();
  const today: Date = new Date();

  const renderHeadstones = (): JSX.Element[] => {
    return corpses.map((corpse: Corpse) => (
      <div className={styles.container} key={corpse.name + corpse.qualifier}>
        <Headstone corpse={corpse} today={today} />
      </div>
    ));
  };

  return (
    <main id="graveyard" className={styles.main}>
      <div className={styles.list}>{renderHeadstones()}</div>
    </main>
  );
}
