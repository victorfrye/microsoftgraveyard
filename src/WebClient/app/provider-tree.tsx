import type { ReactNode } from 'react';

import { ConsentProvider } from '@/privacy';
import { ColorModeProvider, ThemeProvider } from '@/theme';

interface ProviderTreeProps {
  children: ReactNode;
}

export default function ProviderTree({
  children,
}: Readonly<ProviderTreeProps>) {
  return (
    <ConsentProvider>
      <ColorModeProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ColorModeProvider>
    </ConsentProvider>
  );
}
