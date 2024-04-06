'use client';

import {
  Image,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalL),
  },
  headline: {
    display: 'flex',
    flexDirection: 'column',
    '@media screen and (max-width: 444px)': {
      justifyContent: 'center',
      alignItems: 'center',
    },
    justifyContent: 'start',
    alignItems: 'start',
    ...shorthands.padding(tokens.spacingVerticalS),
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    ...shorthands.margin(tokens.spacingVerticalS, tokens.spacingHorizontalNone),
  },
  tagline: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground2,
  },
});

const Header = () => {
  const styles = useStyles();

  return (
    <header id='header' className={styles.header}>
      <Image
        src='/images/headstone.svg'
        alt='a headstone icon of Microsoft Graveyard'
        height={72}
        width={72}
      />

      <div className={styles.headline}>
        <Text as='h1' weight='bold' className={styles.title}>
          Microsoft Graveyard
        </Text>
        <Text as='em' className={styles.tagline}>
          In remembrance of those killed by Microsoft
        </Text>
      </div>
    </header>
  );
};

export default Header;
