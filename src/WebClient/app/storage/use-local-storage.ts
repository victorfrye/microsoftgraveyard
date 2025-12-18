'use client';

import { useCallback, useState } from 'react';

import { readValue, writeValue } from '@/storage/local-storage-utils';

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
