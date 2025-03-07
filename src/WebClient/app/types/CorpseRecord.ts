interface CorpseRecord {
  name: string;
  qualifier: string | null;
  birthDate: string | null;
  deathDate: string;
  description: string;
  link: string;
}

export type { CorpseRecord };
