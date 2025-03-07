import { useCallback, useEffect, useState } from 'react';

import corpsesDocument from '@microsoftgraveyard/graveyard/corpses.json';
import { Corpse } from '@microsoftgraveyard/types';

interface CorpseRecord {
  name: string;
  qualifier?: string;
  birthDate?: string;
  deathDate: string;
  description: string;
  link: string;
}

interface CorpsesDocument {
  $schema: string;
  corpses: CorpseRecord[];
}

const useCorpsesDocument = () => {
  const [corpses, setCorpses] = useState<Corpse[]>([]);

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

  useEffect(() => {
    fetchCorpses();
  }, [fetchCorpses]);

  return corpses;
};

export default useCorpsesDocument;
