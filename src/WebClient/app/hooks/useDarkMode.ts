import { useContext } from 'react';

import { DarkModeContext } from '@microsoftgraveyard/providers/DarkMode';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
