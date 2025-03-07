import { ChangeEvent } from 'react';

import {
  Button,
  Divider,
  Image,
  Link,
  Switch,
  SwitchOnChangeData,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { ArrowDown32Regular } from '@fluentui/react-icons';

import Socials from '@microsoftgraveyard/layout/Socials';
import { useDarkMode } from '@microsoftgraveyard/theme';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalL}`,
  },
  floatingActionButton: {
    position: 'fixed',
    right: tokens.spacingHorizontalXL,
    bottom: tokens.spacingVerticalXL,
    zIndex: 1000,
  },
  divider: {
    margin: `0 0 ${tokens.spacingVerticalL} 0`,
  },
  headline: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: tokens.spacingVerticalL,
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    margin: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM} ${tokens.spacingVerticalNone}`,
  },
  switch: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalNone} ${tokens.spacingVerticalMNudge}`,
  },
});

const Footer = () => {
  const styles = useStyles();
  const _today: Date = new Date();

  const { isDark, onDarkModeToggled } = useDarkMode();

  const handleDarkModeToggled = (
    _event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData
  ) => {
    onDarkModeToggled(data.checked);
  };

  return (
    <footer id="footer" className={styles.footer}>
      <Button
        icon={<ArrowDown32Regular />}
        as="a"
        href="#footer"
        shape="circular"
        appearance="outline"
        size="large"
        className={styles.floatingActionButton}
      />

      <Divider appearance="strong" inset className={styles.divider} />

      <div className={styles.headline}>
        <Image
          src="/images/headstone.svg"
          alt="a headstone icon of Microsoft Graveyard"
          height={72}
          width={72}
        />
        <Text
          as="h2"
          weight="bold"
          align="center"
          block
          className={styles.title}
        >
          Microsoft Graveyard
        </Text>
      </div>

      <Socials />

      <Switch
        checked={isDark}
        onChange={handleDarkModeToggled}
        label={isDark ? 'Dark Mode' : 'Light Mode'}
        className={styles.switch}
      />

      <Text as="p" align="center">
        Microsoft Graveyard is the virtual graveyard for all products killed by
        Microsoft; a free and open source collection of dead Microsoft products
        built by a passionate and nostalgic community. Our objective as a
        community is to provide factual, historic information for the products
        listed here.
      </Text>

      <Text as="p" align="center">
        If something is missing, inaccurate, or you have a suggestion, visit and
        contribute to the{' '}
        <Link
          href="https://github.com/victorfrye/microsoftgraveyard"
          target="_blank"
          rel="noreferrer noopener"
        >
          project on GitHub
        </Link>
        . Created by{' '}
        <Link
          href="https://victorfrye.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Victor Frye
        </Link>
        .
      </Text>

      <Text as="p" align="center" weight="bold">
        This site is NOT affiliated with Microsoft in any way.
      </Text>

      <Text as="p" align="center">
        The Microsoft Graveyard project was inspired by the{' '}
        <Link
          href="https://killedbygoogle.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Killed by Google
        </Link>{' '}
        project
      </Text>

      <Text as="p" align="center" block>
        © Victor Frye {_today.getFullYear()}
      </Text>
    </footer>
  );
};

export default Footer;
