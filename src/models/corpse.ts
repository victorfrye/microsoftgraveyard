class Corpse {
  name: string;
  qualifier: string | undefined;
  birthDate: Date | undefined;
  deathDate: Date;
  description: string;
  link: string;

  public constructor(
    name: string,
    qualifier: string | undefined,
    birthDate: Date | undefined,
    deathDate: Date,
    description: string,
    link: string,
  ) {
    this.name = name;
    this.qualifier = qualifier;
    this.birthDate = birthDate && new Date(birthDate);
    this.deathDate = new Date(deathDate);
    this.description = description;
    this.link = link;
  }
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

  let months =
    end.getMonth() -
    start.getMonth() +
    12 * (end.getFullYear() - start.getFullYear());
  if (months >= 1) {
    return { age: months, period: months === 1 ? 'month' : 'months' };
  }

  let days = end.getDate() - start.getDate();
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

export {
  Corpse,
  getExpectedDeathDate,
  getFullName,
  getLifeDates,
  getObituary,
  isDead,
};
