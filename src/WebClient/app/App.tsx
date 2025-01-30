import DarkModeProvider from '@microsoftgraveyard/providers/DarkMode';
import ThemeProvider from '@microsoftgraveyard/providers/Theme';
import Graveyard from '@microsoftgraveyard/components/Graveyard';

const App = () => {
  return (
    <DarkModeProvider>
      <ThemeProvider>
        <Graveyard />
      </ThemeProvider>
    </DarkModeProvider>
  );
};

export default App;
