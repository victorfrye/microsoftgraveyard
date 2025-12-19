'use client';

import { Button, makeStyles, Tooltip } from '@fluentui/react-components';
import { type JSX, useCallback } from 'react';
import { GitHubIcon, ThreadsIcon } from '@/assets';
import ShellText from '@/shell/text';

const useStyles = makeStyles({
  svg: {
    width: '20px',
    height: '20px',
  },
});

interface Social {
  text: string;
  link: string;
  image: JSX.Element;
}

export default function SocialButtons() {
  const styles = useStyles();

  const getSocials = useCallback((): Social[] => {
    return [
      {
        text: ShellText.footer.socials.github,
        link: 'https://github.com/victorfrye/microsoftgraveyard',
        image: <GitHubIcon className={styles.svg} />,
      },
      {
        text: ShellText.footer.socials.threads,
        link: 'https://www.threads.net/@microsoftgraveyard',
        image: <ThreadsIcon className={styles.svg} />,
      },
    ];
  }, [styles]);

  const renderButtons = (): JSX.Element[] => {
    return getSocials().map((social) => (
      <Tooltip
        withArrow
        content={social.text}
        relationship="label"
        key={social.text}
      >
        <Button
          icon={social.image}
          as="a"
          appearance="subtle"
          shape="circular"
          size="large"
          href={social.link}
          target="_blank"
          rel="me noreferrer noopener"
        />
      </Tooltip>
    ));
  };

  return renderButtons();
}
