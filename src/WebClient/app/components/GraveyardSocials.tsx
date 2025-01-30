import { Button, Image, makeStyles, tokens } from '@fluentui/react-components';
import useDarkMode from '@microsoftgraveyard/hooks/useDarkMode';
import { JSX } from 'react';

interface ISocial {
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

const Socials = () => {
  const styles = useStyles();
  const { isDark } = useDarkMode();

  const socialDetails: ISocial[] = [
    {
      href: 'https://threads.net/@microsoftgraveyard',
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
    return socialDetails.map((social, index) => (
      <Button
        icon={social.image}
        as="a"
        appearance="subtle"
        shape="circular"
        size="large"
        href={social.href}
        target="_blank"
        rel="noreferrer noopener"
        key={index}
      />
    ));
  };

  return <div className={styles.container}>{renderButtons()}</div>;
};

export default Socials;
