interface Corpse {
  name: string;
  qualifier: string | null;
  birthDate: Date | null;
  deathDate: Date;
  description: string;
  link: string;
}

export type { Corpse };
