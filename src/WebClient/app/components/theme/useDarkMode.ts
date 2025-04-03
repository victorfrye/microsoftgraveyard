import { useContext } from 'react';

import { DarkModeContext } from '@microsoftgraveyard/components/theme/DarkMode';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
