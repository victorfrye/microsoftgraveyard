'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  Image,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { News16Regular } from '@fluentui/react-icons';
import {
  Corpse,
  getExpectedDeathDate,
  getFullName,
  getLifeDates,
  getObituary,
  isDead,
} from '@microsoft-graveyard/models/corpse';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    ...shorthands.gap(tokens.spacingVerticalXL),
    ...shorthands.margin(tokens.spacingVerticalNone),
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
    ...shorthands.flex(0, 0, 'auto'),
    ...shorthands.margin(tokens.spacingVerticalL, tokens.spacingHorizontalXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  title: {
    fontSize: tokens.lineHeightBase400,
    lineHeight: tokens.lineHeightBase500,
    ...shorthands.margin(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalNone,
    ),
  },
  lifeDates: {
    color: tokens.colorBrandForeground2,
    lineHeight: tokens.lineHeightBase200,
    ...shorthands.margin(
      tokens.spacingVerticalXS,
      tokens.spacingHorizontalNone,
    ),
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

interface ICorpsesData {
  corpses: ICorpse[];
}

const Graveyard = (): JSX.Element => {
  let [corpses, setCorpses] = useState<Corpse[]>([]);
  const today: Date = new Date();
  const styles = useStyles();

  useEffect(() => {
    fetchCorpses();
  }, []);

  const fetchCorpses = async () => {
    const response = await fetch('./data/corpses.json');
    const data: ICorpsesData = await response.json();

    setCorpses(
      data.corpses
        ?.map((corpse: ICorpse) => {
          return new Corpse(
            corpse.name,
            corpse.qualifier,
            corpse.birthDate ? new Date(corpse.birthDate) : undefined,
            new Date(corpse.deathDate),
            corpse.description,
            corpse.link,
          );
        })
        .sort(
          (a, b) =>
            b.deathDate[Symbol.toPrimitive]('number') -
            a.deathDate[Symbol.toPrimitive]('number'),
        ),
    );
  };

  const renderGraves = (): JSX.Element[] => {
    return corpses.map((corpse, index) => (
      <li className={styles.container} key={index}>
        <Card appearance='filled-alternative' key={index}>
          <CardHeader
            image={
              <Image
                src={
                  isDead(corpse, today)
                    ? '/images/headstone.svg'
                    : '/images/coffin.svg'
                }
                alt='a headstone for that which is dead'
                height={72}
                width={72}
              />
            }
            header={
              <Text as='h2' weight='bold' block className={styles.title}>
                {getFullName(corpse)}
              </Text>
            }
            description={
              <Text as='p' className={styles.lifeDates}>
                {isDead(corpse, today)
                  ? getLifeDates(corpse)
                  : getExpectedDeathDate(corpse)}
              </Text>
            }
            action={
              <Button
                as='a'
                icon={<News16Regular />}
                appearance='subtle'
                href={corpse.link}
                target='_blank'
                rel='noreferrer noopener'
              />
            }
          />
          <Text as='p'>{getObituary(corpse, today)}</Text>
        </Card>
      </li>
    ));
  };

  return (
    <section id='graveyard'>
      <ul className={styles.list}>{renderGraves()}</ul>
    </section>
  );
};

export default Graveyard;
