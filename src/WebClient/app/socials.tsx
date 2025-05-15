import { JSX } from 'react';

import { Button, Image, makeStyles, tokens } from '@fluentui/react-components';

import { useDarkMode } from '@microsoftgraveyard/theme';

interface Social {
  href: string;
  image: JSX.Element;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacingVerticalSNudge,
  },
});

export default function Socials() {
  const styles = useStyles();
  const { isDark } = useDarkMode();

  const socialDetails: Social[] = [
    {
      href: 'https://www.threads.net/@microsoftgraveyard',
      image: (
        <Image
          src={isDark ? '/images/threads.svg' : '/images/threads_dark.svg'}
          alt="Threads"
          height={20}
          width={20}
        />
      ),
    },
    {
      href: 'https://github.com/victorfrye/microsoftgraveyard',
      image: (
        <Image
          src={isDark ? '/images/github.svg' : '/images/github_dark.svg'}
          alt="GitHub"
          height={20}
          width={20}
        />
      ),
    },
  ];

  const renderButtons = (): JSX.Element[] => {
    return socialDetails.map((social) => (
      <Button
        icon={social.image}
        as="a"
        appearance="subtle"
        shape="circular"
        size="large"
        href={social.href}
        target="_blank"
        rel="me noreferrer noopener"
        key={social.href}
      />
    ));
  };

  return <div className={styles.container}>{renderButtons()}</div>;
}
