'use client';

import { JSX } from 'react';

import { makeStyles, tokens } from '@fluentui/react-components';

import {
  Headstone,
  useCorpsesDocument,
} from '@microsoftgraveyard/components/graveyard';
import { Corpse } from '@microsoftgraveyard/types';

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

const HomePage = () => {
  const styles = useStyles();
  const corpses = useCorpsesDocument();
  const today: Date = new Date();

  const renderHeadstones = (): JSX.Element[] => {
    return corpses.map((corpse: Corpse) => (
      <li className={styles.container} key={corpse.name + corpse.qualifier}>
        <Headstone corpse={corpse} today={today} />
      </li>
    ));
  };

  return (
    <main id="graveyard" className={styles.main}>
      <ul className={styles.list}>{renderHeadstones()}</ul>
    </main>
  );
};

export default HomePage;
