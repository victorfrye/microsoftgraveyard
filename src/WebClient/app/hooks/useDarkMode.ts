import { DarkModeContext } from '@microsoftgraveyard/providers/DarkMode';
import { useContext } from 'react';

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
