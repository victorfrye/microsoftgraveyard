import { JSX } from 'react';

import { makeStyles, tokens } from '@fluentui/react-components';

import Headstone from '@microsoftgraveyard/components/graveyard/Headstone';
import useCorpsesDocument from '@microsoftgraveyard/hooks/useCorpsesDocument';

const useStyles = makeStyles({
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

const Graveyard = () => {
  const styles = useStyles();
  const corpses = useCorpsesDocument();
  const today: Date = new Date();

  const renderHeadstones = (): JSX.Element[] => {
    return corpses.map((corpse, index) => (
      <li className={styles.container} key={index}>
        <Headstone corpse={corpse} today={today} />
      </li>
    ));
  };

  return (
    <section id="graveyard">
      <ul className={styles.list}>{renderHeadstones()}</ul>
    </section>
  );
};

export default Graveyard;
