import {
  Button,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { ArrowDown32Regular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
  fab: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: tokens.spacingVerticalL,
    zIndex: 1000,
    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
  },
  hidden: {
    opacity: 0,
    visibility: 'hidden',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
});

export default function ScrollFab() {
  const styles = useStyles();
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const checkIfAtBottom = () => {
      const threshold = 100;
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsAtBottom(scrollPosition >= documentHeight - threshold);
    };

    checkIfAtBottom();

    window.addEventListener('scroll', checkIfAtBottom);

    return () => window.removeEventListener('scroll', checkIfAtBottom);
  }, []);

  const handleFabClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <Button
      icon={<ArrowDown32Regular />}
      shape="circular"
      appearance="secondary"
      size="large"
      className={mergeClasses(
        styles.fab,
        isAtBottom ? styles.hidden : styles.visible,
      )}
      onClick={handleFabClick}
    />
  );
}
