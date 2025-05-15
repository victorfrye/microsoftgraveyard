import { useContext } from 'react';

import { DarkModeContext } from '@microsoftgraveyard/theme/dark-mode-provider';

export default function useDarkMode() {
  return useContext(DarkModeContext);
}
