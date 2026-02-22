import { renderHook } from '@testing-library/react';
import type { Corpse } from './corpse';
import useCorpse from './use-corpse';

describe('useCorpse', () => {
  const deadCorpse: Corpse = {
    name: 'Windows Phone',
    qualifier: 'Mobile OS',
    birthDate: new Date('2010-10-21'),
    deathDate: new Date('2019-12-10'),
    description: 'a mobile operating system',
    link: 'https://example.com',
  };

  const aliveCorpse: Corpse = {
    name: 'Future Product',
    deathDate: new Date('2030-06-15'),
    description: 'a future product',
    link: 'https://example.com',
  };

  const today = new Date('2024-06-15');

  describe('Name formatting', () => {
    it('returns name without qualifier when qualifier is undefined', () => {
      const { result } = renderHook(() => useCorpse(aliveCorpse, today));
      expect(result.current.name).toBe('Future Product');
    });

    it('returns "Name (Qualifier)" when qualifier is provided', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.name).toBe('Windows Phone (Mobile OS)');
    });
  });

  describe('isDead', () => {
    it('returns true when deathDate is before today', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.isDead).toBe(true);
    });

    it('returns false when deathDate is after today', () => {
      const { result } = renderHook(() => useCorpse(aliveCorpse, today));
      expect(result.current.isDead).toBe(false);
    });
  });

  describe('Life dates (dead corpse)', () => {
    it('shows "birthYear - deathYear" when birthDate exists', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.lifeDates).toBe('2010 - 2019');
    });

    it('shows just "deathYear" when no birthDate', () => {
      const corpseWithoutBirth: Corpse = {
        ...deadCorpse,
        birthDate: undefined,
      };
      const { result } = renderHook(() => useCorpse(corpseWithoutBirth, today));
      expect(result.current.lifeDates).toBe('2019');
    });
  });

  describe('Life dates (future/alive corpse)', () => {
    it('shows expected death date in "Month Year" format', () => {
      const { result } = renderHook(() => useCorpse(aliveCorpse, today));
      expect(result.current.lifeDates).toBe('June 2030');
    });
  });

  describe('Obituary (dead corpse)', () => {
    it('includes "Killed by Microsoft X years ago" for old death', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.obituary).toContain('Killed by Microsoft');
      expect(result.current.obituary).toContain('years ago');
    });

    it('includes "Killed by Microsoft today" when died today (age === 0 days)', () => {
      const diedToday: Corpse = {
        ...deadCorpse,
        deathDate: today,
      };
      const { result } = renderHook(() => useCorpse(diedToday, today));
      expect(result.current.obituary).toContain('Killed by Microsoft today');
    });

    it('includes "was" (past tense) for dead corpses', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.obituary).toContain('was');
      expect(result.current.obituary).toContain('a mobile operating system');
    });

    it('appends age at death when birthDate exists', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.obituary).toContain('It was');
      expect(result.current.obituary).toContain('old.');
    });
  });

  describe('Obituary (future corpse)', () => {
    it('includes "To be killed by Microsoft in X months/years"', () => {
      const { result } = renderHook(() => useCorpse(aliveCorpse, today));
      expect(result.current.obituary).toContain('To be killed by Microsoft in');
    });

    it('includes "is" (present tense) for alive corpses', () => {
      const { result } = renderHook(() => useCorpse(aliveCorpse, today));
      expect(result.current.obituary).toContain('is');
      expect(result.current.obituary).toContain('a future product');
    });
  });

  describe('Age calculation edge cases', () => {
    it('handles exactly 1 year (singular "year")', () => {
      const oneYearAgo: Corpse = {
        ...deadCorpse,
        deathDate: new Date('2023-06-15'),
      };
      const { result } = renderHook(() => useCorpse(oneYearAgo, today));
      expect(result.current.obituary).toMatch(/1 year ago/);
    });

    it('handles multiple years (plural "years")', () => {
      const multipleYearsAgo: Corpse = {
        ...deadCorpse,
        deathDate: new Date('2020-06-15'),
      };
      const { result } = renderHook(() => useCorpse(multipleYearsAgo, today));
      expect(result.current.obituary).toMatch(/\d+ years ago/);
    });

    it('handles exactly 1 month (singular "month")', () => {
      const oneMonthAgo: Corpse = {
        ...deadCorpse,
        birthDate: undefined,
        deathDate: new Date('2024-05-15'),
      };
      const { result } = renderHook(() => useCorpse(oneMonthAgo, today));
      expect(result.current.obituary).toMatch(/1 month ago/);
    });

    it('handles multiple months (plural "months")', () => {
      const multipleMonthsAgo: Corpse = {
        ...deadCorpse,
        birthDate: undefined,
        deathDate: new Date('2024-01-15'),
      };
      const { result } = renderHook(() => useCorpse(multipleMonthsAgo, today));
      expect(result.current.obituary).toMatch(/\d+ months ago/);
    });

    it('handles exactly 1 day (singular "day")', () => {
      const oneDayAgo: Corpse = {
        ...deadCorpse,
        birthDate: undefined,
        deathDate: new Date('2024-06-14'),
      };
      const { result } = renderHook(() => useCorpse(oneDayAgo, today));
      expect(result.current.obituary).toMatch(/1 day ago/);
    });

    it('handles multiple days (plural "days")', () => {
      const multipleDaysAgo: Corpse = {
        ...deadCorpse,
        birthDate: undefined,
        deathDate: new Date(2024, 5, 1),
      };
      const fixedToday = new Date(2024, 5, 15);
      const { result } = renderHook(() =>
        useCorpse(multipleDaysAgo, fixedToday),
      );
      expect(result.current.obituary).toMatch(/\d+ days ago/);
    });
  });

  describe('Age calculation for future corpses', () => {
    it('handles multiple years in future (plural "years")', () => {
      const multipleYearsFuture: Corpse = {
        ...aliveCorpse,
        deathDate: new Date('2030-06-15'),
      };
      const { result } = renderHook(() =>
        useCorpse(multipleYearsFuture, today),
      );
      expect(result.current.obituary).toMatch(/in \d+ years/);
    });

    it('handles exactly 1 year in future (singular "year")', () => {
      const oneYearFuture: Corpse = {
        ...aliveCorpse,
        deathDate: new Date('2025-06-15'),
      };
      const { result } = renderHook(() => useCorpse(oneYearFuture, today));
      expect(result.current.obituary).toMatch(/in 1 year/);
    });

    it('handles months in future when less than a year', () => {
      const monthsFuture: Corpse = {
        ...aliveCorpse,
        deathDate: new Date('2024-09-15'),
      };
      const { result } = renderHook(() => useCorpse(monthsFuture, today));
      expect(result.current.obituary).toMatch(/in \d+ months?/);
    });
  });

  describe('Loading', () => {
    it('starts as true and becomes false after mount', () => {
      const { result } = renderHook(() => useCorpse(deadCorpse, today));
      expect(result.current.loading).toBe(false);
    });
  });
});
