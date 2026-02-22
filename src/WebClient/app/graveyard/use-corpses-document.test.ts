import { renderHook } from '@testing-library/react';
import useCorpsesDocument from './use-corpses-document';

jest.mock('@/graveyard/corpses.json', () => ({
  $schema: 'test',
  corpses: [
    {
      name: 'Product A',
      deathDate: '2020-01-01',
      description: 'test a',
      link: 'https://a.com',
    },
    {
      name: 'Product C',
      qualifier: 'v2',
      birthDate: '2015-01-01',
      deathDate: '2023-06-01',
      description: 'test c',
      link: 'https://c.com',
    },
    {
      name: 'Product B',
      deathDate: '2021-06-15',
      description: 'test b',
      link: 'https://b.com',
    },
  ],
}));

describe('useCorpsesDocument', () => {
  it('returns corpses sorted by deathDate descending', () => {
    const { result } = renderHook(() => useCorpsesDocument());
    const corpses = result.current;

    expect(corpses).toHaveLength(3);
    expect(corpses[0].name).toBe('Product C');
    expect(corpses[1].name).toBe('Product B');
    expect(corpses[2].name).toBe('Product A');

    // Verify dates are in descending order
    expect(corpses[0].deathDate.getTime()).toBeGreaterThan(
      corpses[1].deathDate.getTime(),
    );
    expect(corpses[1].deathDate.getTime()).toBeGreaterThan(
      corpses[2].deathDate.getTime(),
    );
  });

  it('handles corpses with and without birthDate', () => {
    const { result } = renderHook(() => useCorpsesDocument());
    const corpses = result.current;

    const withBirthDate = corpses.find((c) => c.name === 'Product C');
    const withoutBirthDate = corpses.find((c) => c.name === 'Product A');

    expect(withBirthDate?.birthDate).toBeDefined();
    expect(withBirthDate?.birthDate).toBeInstanceOf(Date);
    expect(withoutBirthDate?.birthDate).toBeUndefined();
  });

  it('handles corpses with and without qualifier', () => {
    const { result } = renderHook(() => useCorpsesDocument());
    const corpses = result.current;

    const withQualifier = corpses.find((c) => c.name === 'Product C');
    const withoutQualifier = corpses.find((c) => c.name === 'Product A');

    expect(withQualifier?.qualifier).toBe('v2');
    expect(withoutQualifier?.qualifier).toBeUndefined();
  });

  it('parses deathDate correctly from JSON string', () => {
    const { result } = renderHook(() => useCorpsesDocument());
    const corpses = result.current;

    corpses.forEach((corpse) => {
      expect(corpse.deathDate).toBeInstanceOf(Date);
      expect(corpse.deathDate.getTime()).not.toBeNaN();
    });
  });

  it('parses birthDate correctly from JSON string when present', () => {
    const { result } = renderHook(() => useCorpsesDocument());
    const corpses = result.current;

    const productC = corpses.find((c) => c.name === 'Product C');
    expect(productC?.birthDate).toBeInstanceOf(Date);
    expect(productC?.birthDate?.toISOString()).toContain('2015-01-01');
  });

  it('preserves all corpse properties', () => {
    const { result } = renderHook(() => useCorpsesDocument());
    const corpses = result.current;

    corpses.forEach((corpse) => {
      expect(corpse.name).toBeDefined();
      expect(corpse.deathDate).toBeDefined();
      expect(corpse.description).toBeDefined();
      expect(corpse.link).toBeDefined();
    });
  });
});
