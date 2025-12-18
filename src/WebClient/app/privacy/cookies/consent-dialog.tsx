'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

import CookieText from '@/privacy/cookies/text';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    right: tokens.spacingHorizontalL,
    bottom: tokens.spacingVerticalL,
    zIndex: 1000,
  },
  banner: {
    position: 'fixed',
    left: 'auto',
    top: 'auto',
    right: tokens.spacingHorizontalXL,
    bottom: tokens.spacingVerticalXL,
    '@media screen and (max-width: 576px)': {
      left: tokens.spacingHorizontalXL,
    },
    zIndex: 1001,
  },
  section: {
    marginBlock: tokens.spacingVerticalXS,
  },
  consent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

interface CookieConsentDialogProps {
  open: boolean;
  onAccept: () => void;
  onReject: () => void;
  onManage: () => void;
}

export default function CookieConsentDialog({
  open,
  onAccept,
  onReject,
  onManage,
}: Readonly<CookieConsentDialogProps>) {
  const styles = useStyles();

  return (
    <div>
      <Dialog open={open} modalType="non-modal">
        <DialogSurface className={styles.banner}>
          <DialogBody>
            <DialogTitle action={null}>
              {CookieText.consentDialog.title}
            </DialogTitle>
            <DialogContent>{CookieText.consentDialog.body}</DialogContent>
            <DialogActions fluid>
              <Button appearance="primary" onClick={onAccept}>
                {CookieText.buttons.accept}
              </Button>
              <Button appearance="primary" onClick={onReject}>
                {CookieText.buttons.reject}
              </Button>
              <Button onClick={onManage}>{CookieText.buttons.manage}</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}
