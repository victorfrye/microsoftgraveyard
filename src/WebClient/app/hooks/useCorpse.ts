import { Corpse } from '@microsoftgraveyard/types/corpse';
import { useCallback, useEffect, useState } from 'react';

const useCorpse = (corpse: Corpse, today: Date) => {
  const name = corpse.qualifier
    ? `${corpse.name} (${corpse.qualifier})`
    : corpse.name;

  const [lifeDates, setLifeDates] = useState<string>('');
  const [obituary, setObituary] = useState<string>('');

  const isDead: boolean = corpse.deathDate <= today;

  const [loading, setLoading] = useState<boolean>(true);

  const getLifeDates = useCallback(
    (): string =>
      corpse.birthDate
        ? `${corpse.birthDate.getFullYear()} - ${corpse.deathDate.getFullYear()}`
        : `${corpse.deathDate.getFullYear()}`,
    [corpse]
  );

  const getExpectedDeathDate = useCallback(
    (): string =>
      corpse.deathDate.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      }),
    [corpse]
  );

  const getAge = useCallback(
    (start: Date, end: Date): { age: number; period: string } => {
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
    },
    []
  );

  const buildLifeDates = useCallback(
    () => setLifeDates(isDead ? getLifeDates() : getExpectedDeathDate()),
    [getExpectedDeathDate, getLifeDates, isDead]
  );

  const buildObituary = useCallback(() => {
    let content = '';

    const dead = isDead;
    if (dead) {
      const { age, period } = getAge(corpse.deathDate, today);
      const message = age === 0 ? 'today' : `${age} ${period} ago`;
      content += `Killed by Microsoft ${message}, `;
    } else {
      const { age, period } = getAge(today, corpse.deathDate);
      content += `To be killed by Microsoft in ${age} ${period}, `;
    }

    content += `${corpse.name} ${dead ? 'was' : 'is'} ${corpse.description}.`;

    if (dead && corpse.birthDate) {
      const { age, period } = getAge(corpse.birthDate, corpse.deathDate);
      content += ` It was ${age} ${period} old.`;
    }

    setObituary(content);
  }, [corpse, getAge, isDead, today]);

  useEffect(() => {
    buildLifeDates();
    buildObituary();
    setLoading(false);
  }, [buildLifeDates, buildObituary]);

  return { name, lifeDates, obituary, isDead, loading };
};

export default useCorpse;
