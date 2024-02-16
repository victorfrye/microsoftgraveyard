class Corpse {
  public name: string;
  public qualifier: string | undefined;
  public birthDate: Date | undefined;
  public deathDate: Date;
  public description: string;
  public link: string;

  public constructor(name: string, qualifier: string | undefined, birthDate: Date | undefined, deathDate: Date, description: string, link: string) {
    this.name = name;
    this.qualifier = qualifier;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.description = description;
    this.link = link;
  }

  public isDead = (today: Date): boolean => this.deathDate <= today;

  public getExpectedDeathDate = (): string => this.deathDate.toDateString();

  public getLifeDates = (): string => this.birthDate ? `${this.birthDate.toDateString()} - ${this.deathDate.toDateString()}` : `${this.deathDate.toDateString()}`;

  public getFullName = (): string => this.qualifier ? `${this.name} (${this.qualifier})` : this.name;

  private getAge = (start: Date, end: Date): { age: number; period: string } => {
    let years = end.getFullYear() - start.getFullYear();
    if (end.getMonth() < start.getMonth() || (end.getMonth() === start.getMonth() && end.getDate() < start.getDate())) {
      years--;
    }

    if (years >= 1) {
      return { age: years, period: years === 1 ? "year" : "years" };
    }

    let months = end.getMonth() - start.getMonth() + (12 * (end.getFullYear() - start.getFullYear()));
    if (months >= 1) {
      return { age: months, period: months === 1 ? "month" : "months" };
    }

    let days = end.getDate() - start.getDate();
    return { age: days, period: days === 1 ? "day" : "days" };
  }

  public getObituary(today: Date): string {
    let obituary = '';

    const isDead = this.isDead(today);
    if (isDead) {
      const { age, period } = this.getAge(this.deathDate, today);
      const message = age === 0 ? "today" : `${age} ${period} ago`;
      obituary += `Killed by Microsoft ${message}, `;
    } else {
      const { age, period } = this.getAge(today, this.deathDate);
      obituary += `To be killed by Microsoft in ${age} ${period}, `;
    }

    obituary += `${this.name} ${isDead ? "was" : "is"} ${this.description}.`;

    if (isDead && this.birthDate) {
      const { age, period } = this.getAge(this.birthDate, this.deathDate);
      obituary += ` It was ${age} ${period} old.`;
    }

    return obituary;
  }
}
