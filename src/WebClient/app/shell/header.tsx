'use client';

import {
  Image,
  makeStyles,
  Subtitle2,
  Title1,
  tokens,
} from '@fluentui/react-components';

import ShellText from '@/shell/text';

const useStyles = makeStyles({
  header: {
    display: 'grid',
    gridAutoColumns: 'min-content lfr min-content',
    justifyContent: 'center',
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalM}`,
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      rowGap: tokens.spacingVerticalM,
    },
  },
  image: {
    display: 'flex',
    gridColumnStart: 1,
    gridRowStart: 'span 2',
    marginRight: tokens.spacingHorizontalM,
    '@media screen and (max-width: 576px)': {
      marginRight: tokens.spacingHorizontalNone,
    },
  },
  title: {
    display: 'flex',
    gridColumnStart: 2,
    gridRowStart: 1,
  },
  tagline: {
    display: 'flex',
    gridColumnStart: 2,
    gridRowStart: 2,
    color: tokens.colorNeutralForeground2,
  },
});

export default function Header() {
  const styles = useStyles();

  return (
    <div id="header" className={styles.header}>
      <div className={styles.image}>
        <Image
          as="img"
          src="/assets/headstone.svg"
          alt="a headstone icon of Microsoft Graveyard"
          height={72}
          width={72}
        />
      </div>

      <Title1 as="span" wrap={false} className={styles.title}>
        {ShellText.header.title}
      </Title1>
      <Subtitle2 as="em" className={styles.tagline}>
        {ShellText.header.tagline}
      </Subtitle2>
    </div>
  );
}
