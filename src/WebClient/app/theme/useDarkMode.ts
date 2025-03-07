import { useContext } from 'react';

import { DarkModeContext } from '@microsoftgraveyard/theme/DarkMode';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
