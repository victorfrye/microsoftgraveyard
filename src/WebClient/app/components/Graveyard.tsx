import { useCallback, useEffect, useState, JSX } from 'react';
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

interface Corpse {
  name: string;
  qualifier: string | null;
  birthDate: Date | null;
  deathDate: Date;
  description: string;
  link: string;
}

interface CorpseRecord {
  name: string;
  qualifier: string | null;
  birthDate: string | null;
  deathDate: string;
  description: string;
  link: string;
}

interface CorpsesDocument {
  $schema: string;
  corpses: CorpseRecord[];
}

const getAge = (start: Date, end: Date): { age: number; period: string } => {
  let years = end.getFullYear() - start.getFullYear();
  if (
    end.getMonth() < start.getMonth() ||
    (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())
  ) {
    years--;
  }

  if (years >= 1) {
    return { age: years, period: years === 1 ? 'year' : 'years' };
  }

  const months =
    end.getMonth() -
    start.getMonth() +
    12 * (end.getFullYear() - start.getFullYear());
  if (months >= 1) {
    return { age: months, period: months === 1 ? 'month' : 'months' };
  }

  const days = end.getDate() - start.getDate();
  return { age: days, period: days === 1 ? 'day' : 'days' };
};

const getExpectedDeathDate = (corpse: Corpse): string =>
  corpse.deathDate.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

const getFullName = (corpse: Corpse): string =>
  corpse.qualifier ? `${corpse.name} (${corpse.qualifier})` : corpse.name;

const getLifeDates = (corpse: Corpse): string =>
  corpse.birthDate
    ? `${corpse.birthDate.getFullYear()} - ${corpse.deathDate.getFullYear()}`
    : `${corpse.deathDate.getFullYear()}`;

const getObituary = (corpse: Corpse, today: Date): string => {
  let obituary = '';

  const dead = isDead(corpse, today);
  if (dead) {
    const { age, period } = getAge(corpse.deathDate, today);
    const message = age === 0 ? 'today' : `${age} ${period} ago`;
    obituary += `Killed by Microsoft ${message}, `;
  } else {
    const { age, period } = getAge(today, corpse.deathDate);
    obituary += `To be killed by Microsoft in ${age} ${period}, `;
  }

  obituary += `${corpse.name} ${dead ? 'was' : 'is'} ${corpse.description}.`;

  if (dead && corpse.birthDate) {
    const { age, period } = getAge(corpse.birthDate, corpse.deathDate);
    obituary += ` It was ${age} ${period} old.`;
  }

  return obituary;
};

const isDead = (corpse: Corpse, today: Date): boolean =>
  corpse.deathDate <= today;

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
