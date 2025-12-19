'use client';

import {
  makeStyles,
  Subtitle2,
  Switch,
  type SwitchOnChangeData,
  tokens,
} from '@fluentui/react-components';
import type { ChangeEvent } from 'react';

const useStyles = makeStyles({
  row: {
    marginBlock: tokens.spacingVerticalXS,
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

interface CookieConsentRowProps {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    data: SwitchOnChangeData,
  ) => void;
  disabled?: boolean;
}

export default function CookieConsentRow({
  title,
  description,
  checked,
  onChange,
  disabled,
}: Readonly<CookieConsentRowProps>) {
  const styles = useStyles();

  return (
    <div className={styles.row}>
      <div className={styles.title}>
        <Subtitle2>{title}</Subtitle2>
        <Switch checked={checked} disabled={disabled} onChange={onChange} />
      </div>
      {description}
    </div>
  );
}
