'use client';

import { JSX, useCallback } from 'react';

import {
  Button,
  Tooltip,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import GitHubSvg from '@microsoftgraveyard/assets/github.svg';
import ThreadsSvg from '@microsoftgraveyard/assets/threads.svg';
import ShellText from '@microsoftgraveyard/shell/text';

const useStyles = makeStyles({
  svg: {
    color: tokens.colorNeutralForeground1,
    fill: tokens.colorNeutralForeground1,
    width: '20px',
    height: 'auto',
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
        image: (
          <GitHubSvg
            className={styles.svg}
            aria-label={ShellText.footer.socials.github}
          />
        ),
      },
      {
        text: ShellText.footer.socials.threads,
        link: 'https://www.threads.net/@microsoftgraveyard',
        image: (
          <ThreadsSvg
            className={styles.svg}
            aria-label={ShellText.footer.socials.github}
          />
        ),
      },
    ];
  }, []);

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
