import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useLocalStorage, { readValue, writeValue } from './local-storage';

describe('local-storage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('readValue', () => {
    it('should return null when key does not exist', () => {
      const result = readValue<string>('nonexistent-key');
      expect(result).toBeNull();
    });

    it('should return parsed JSON when key exists', () => {
      const testData = { name: 'test', value: 123 };
      localStorage.setItem('test-key', JSON.stringify(testData));

      const result = readValue<typeof testData>('test-key');
      expect(result).toEqual(testData);
    });

    it('should return null on JSON parse error', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      localStorage.setItem('invalid-json', '{invalid json}');

      const result = readValue<string>('invalid-json');
      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error reading localStorage key:',
        'invalid-json',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('writeValue', () => {
    it('should set stringified JSON in localStorage', () => {
      const testData = { name: 'test', value: 456 };
      writeValue('test-key', testData);

      const stored = localStorage.getItem('test-key');
      expect(stored).toBe(JSON.stringify(testData));
    });

    it('should log error on localStorage failure', () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const setItemSpy = jest
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new Error('Storage quota exceeded');
        });

      writeValue('test-key', 'test-value');

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error setting localStorage key:',
        'test-key',
        expect.any(Error),
      );

      consoleErrorSpy.mockRestore();
      setItemSpy.mockRestore();
    });
  });

  describe('useLocalStorage', () => {
    it('should return initial value when localStorage is empty', () => {
      const { result } = renderHook(() =>
        useLocalStorage<string>('test-key', 'initial'),
      );

      expect(result.current.value).toBe('initial');
    });

    it('should return stored value when localStorage has data', () => {
      localStorage.setItem('test-key', JSON.stringify('stored-value'));

      const { result } = renderHook(() =>
        useLocalStorage<string>('test-key', 'initial'),
      );

      expect(result.current.value).toBe('stored-value');
    });

    it('should update both state and localStorage on handleValueChange', () => {
      const { result } = renderHook(() =>
        useLocalStorage<string>('test-key', 'initial'),
      );

      act(() => {
        result.current.handleValueChange('new-value');
      });

      expect(result.current.value).toBe('new-value');
      expect(localStorage.getItem('test-key')).toBe(
        JSON.stringify('new-value'),
      );
    });
  });
});
