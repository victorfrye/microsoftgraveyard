'use client';

import { useCallback, useState } from 'react';

export function readValue<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading localStorage key:', key, error);
    return null;
  }
}

export function writeValue<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage key:', key, error);
  }
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | null = null,
) {
  const [value, setValue] = useState<T | null>(
    readValue<T>(key) ?? initialValue,
  );

  const handleValueChange = useCallback(
    (value: T) => {
      setValue(value);
      writeValue(key, value);
    },
    [key],
  );

  return { value, handleValueChange };
}
