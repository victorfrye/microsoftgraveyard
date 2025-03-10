import { makeStyles } from '@fluentui/react-components';

import { Graveyard } from '@microsoftgraveyard/graveyard';
import { Footer, Header } from '@microsoftgraveyard/layout';
import { DarkModeProvider, ThemeProvider } from '@microsoftgraveyard/theme';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    marginBottom: 'auto',
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <DarkModeProvider>
      <ThemeProvider>
        <Header />

        <main className={styles.main}>
          <Graveyard />
        </main>

        <Footer />
      </ThemeProvider>
    </DarkModeProvider>
  );
};

export default App;
