import { useCallback, useEffect, useState, JSX } from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import corpsesDocument from '@microsoftgraveyard/data/corpses.json';
import GraveyardHeader from '@microsoftgraveyard/components/GraveyardHeader';
import GraveyardFooter from '@microsoftgraveyard/components/GraveyardFooter';
import {
  Corpse,
  CorpseRecord,
  CorpsesDocument,
} from '@microsoftgraveyard/types/corpse';
import Headstone from '@microsoftgraveyard/components/Headstone';

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
  title: {
    fontSize: tokens.lineHeightBase400,
    lineHeight: tokens.lineHeightBase500,
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone}`,
  },
  lifeDates: {
    color: tokens.colorBrandForeground2,
    lineHeight: tokens.lineHeightBase200,
    margin: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone}`,
  },
});

const Graveyard = () => {
  const [corpses, setCorpses] = useState<Corpse[]>([]);
  const today: Date = new Date();
  const styles = useStyles();

  const fetchCorpses = useCallback(() => {
    const data: CorpsesDocument = corpsesDocument as CorpsesDocument;

    setCorpses(
      data.corpses
        ?.map((corpse: CorpseRecord) => {
          return {
            name: corpse.name,
            qualifier: corpse.qualifier,
            birthDate: corpse.birthDate && new Date(corpse.birthDate),
            deathDate: new Date(corpse.deathDate),
            description: corpse.description,
            link: corpse.link,
          } as Corpse;
        })
        .sort(
          (a, b) =>
            b.deathDate[Symbol.toPrimitive]('number') -
            a.deathDate[Symbol.toPrimitive]('number')
        )
    );
  }, []);

  const renderHeadstones = (): JSX.Element[] => {
    return corpses.map((corpse, index) => (
      <li className={styles.container} key={index}>
        <Headstone corpse={corpse} today={today} />
      </li>
    ));
  };

  useEffect(() => {
    fetchCorpses();
  }, [fetchCorpses]);

  return (
    <main className={styles.main}>
      <GraveyardHeader />
      <section id="graveyard">
        <ul className={styles.list}>{renderHeadstones()}</ul>
      </section>
      <GraveyardFooter />
    </main>
  );
};

export default Graveyard;
