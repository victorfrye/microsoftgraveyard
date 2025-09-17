'use client';

import { JSX, useCallback } from 'react';

import { Button, Image, Tooltip } from '@fluentui/react-components';

import ShellText from '@microsoftgraveyard/shell/text';
import { useColorMode } from '@microsoftgraveyard/theme';

interface Social {
  text: string;
  link: string;
  image: JSX.Element;
}

export default function SocialButtons() {
  const { isDark } = useColorMode();

  const getSocials = useCallback((): Social[] => {
    return [
      {
        text: ShellText.footer.socials.github,
        link: 'https://github.com/victorfrye/microsoftgraveyard',
        image: (
          <Image
            src={isDark ? '/assets/github.svg' : '/assets/github_dark.svg'}
            alt={ShellText.footer.socials.github}
            height={20}
            width={20}
          />
        ),
      },
      {
        text: ShellText.footer.socials.threads,
        link: 'https://www.threads.net/@microsoftgraveyard',
        image: (
          <Image
            src={isDark ? '/assets/threads.svg' : '/assets/threads_dark.svg'}
            alt={ShellText.footer.socials.threads}
            height={20}
            width={20}
          />
        ),
      },
    ];
  }, [isDark]);

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
