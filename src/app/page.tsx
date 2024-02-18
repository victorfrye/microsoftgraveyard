'use client';

import { makeStyles } from "@fluentui/react-components";
import Graveyard from "@microsoft-graveyard/components/graveyard/graveyard";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    marginBottom: "auto",
  },
});

const Home = () => {
  const styles = useStyles();

  return (
    <main className={styles.main}>
      <Graveyard />
    </main>
  )
};

export default Home;
