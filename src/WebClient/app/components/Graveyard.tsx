import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Image,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { News16Regular } from '@fluentui/react-icons';
import corpsesDocument from '@microsoftgraveyard/data/corpses.json';
import {
  Corpse,
  getExpectedDeathDate,
  getFullName,
  getLifeDates,
  getObituary,
  isDead,
} from '@microsoftgraveyard/types';
import GraveyardHeader from '@microsoftgraveyard/components/GraveyardHeader';
import GraveyardFooter from '@microsoftgraveyard/components/GraveyardFooter';

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

interface ICorpse {
  name: string;
  qualifier: string | undefined;
  birthDate: string | undefined;
  deathDate: string;
  description: string;
  link: string;
}

interface ICorpsesDocument {
  $schema: string;
  corpses: ICorpse[];
}

const Graveyard = () => {
  const [corpses, setCorpses] = useState<Corpse[]>([]);
  const today: Date = new Date();
  const styles = useStyles();

  const fetchCorpses = useCallback(() => {
    const data: ICorpsesDocument = corpsesDocument as ICorpsesDocument;

    setCorpses(
      data.corpses
        ?.map((corpse: ICorpse) => {
          return new Corpse(
            corpse.name,
            corpse.qualifier,
            corpse.birthDate ? new Date(corpse.birthDate) : undefined,
            new Date(corpse.deathDate),
            corpse.description,
            corpse.link
          );
        })
        .sort(
          (a, b) =>
            b.deathDate[Symbol.toPrimitive]('number') -
            a.deathDate[Symbol.toPrimitive]('number')
        )
    );
  }, []);

  const renderGraves = (): JSX.Element[] => {
    return corpses.map((corpse, index) => (
      <li className={styles.container} key={index}>
        <Card appearance="filled-alternative" key={index}>
          <CardHeader
            image={
              <Image
                src={
                  isDead(corpse, today)
                    ? '/images/headstone.svg'
                    : '/images/coffin.svg'
                }
                alt="a headstone for that which is dead"
                height={72}
                width={72}
              />
            }
            header={
              <Text as="h2" weight="bold" block className={styles.title}>
                {getFullName(corpse)}
              </Text>
            }
            description={
              <Text as="p" className={styles.lifeDates}>
                {isDead(corpse, today)
                  ? getLifeDates(corpse)
                  : getExpectedDeathDate(corpse)}
              </Text>
            }
            action={
              <Button
                as="a"
                icon={<News16Regular />}
                appearance="subtle"
                href={corpse.link}
                target="_blank"
                rel="noreferrer noopener"
              />
            }
          />
          <Text as="p">{getObituary(corpse, today)}</Text>
        </Card>
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
        <ul className={styles.list}>{renderGraves()}</ul>
      </section>
      <GraveyardFooter />
    </main>
  );
};

export default Graveyard;
