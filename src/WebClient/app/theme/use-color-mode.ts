'use client';

import { useContext } from 'react';

import { ColorModeContext } from '@microsoftgraveyard/theme/color-mode-provider';

export default function useColorMode() {
  return useContext(ColorModeContext);
}
