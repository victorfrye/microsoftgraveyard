interface Corpse {
  name: string;
  qualifier?: string;
  birthDate?: Date;
  deathDate: Date;
  description: string;
  link: string;
}

export type { Corpse };
