import { makeStyles, tokens } from '@fluentui/react-components';

import { Graveyard } from '@microsoftgraveyard/components/graveyard';
import { Footer, Header } from '@microsoftgraveyard/components/layout';
import { DarkModeProvider, ThemeProvider } from '@microsoftgraveyard/providers';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    marginBottom: 'auto',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: tokens.spacingVerticalXL,
    margin: tokens.spacingVerticalNone,
  },
  container: {
    display: 'flex',
    '@media screen and (max-width: 768px)': {
      width: '75%',
    },
    '@media screen and (min-width: 1200px)': {
      width: '25%',
    },
    width: '41.66666667%',
    flex: '0 0 auto',
    margin: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderRadius: tokens.borderRadiusMedium,
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
