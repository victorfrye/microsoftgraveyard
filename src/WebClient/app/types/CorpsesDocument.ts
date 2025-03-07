import { CorpseRecord } from '@microsoftgraveyard/types/CorpseRecord';

interface CorpsesDocument {
  $schema: string;
  corpses: CorpseRecord[];
}

export type { CorpsesDocument };
