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

export type { Corpse, CorpseRecord, CorpsesDocument };
