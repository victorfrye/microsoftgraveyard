import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { Footer, Header } from '@microsoftgraveyard/components/layout';
import {
  DarkModeProvider,
  ThemeProvider,
} from '@microsoftgraveyard/components/theme';
import '@microsoftgraveyard/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://microsoftgraveyard.com'),
  title: 'Microsoft Graveyard | In remembrance of those killed by Microsoft',
  description:
    'Microsoft Graveyard is the virtual graveyard for remembering all products killed by Microsoft; a free and open source collection of dead Microsoft products built by a passionate and nostalgic community.',
  keywords: [
    'microsoft graveyard',
    'killed by microsoft',
    'microsoft cemetery',
    'microsoft',
    'xbox graveyard',
    'windows graveyard',
    'virtual graveyard',
    'dead products',
  ],
  icons: ['images/headstone.svg'],
  authors: {
    name: 'Victor Frye',
    url: 'https://victorfrye.com/',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Microsoft Graveyard',
    description:
      'The virtual graveyard for remembering all products killed by Microsoft.',
    siteName: 'Microsoft Graveyard',
  },
};

export const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <DarkModeProvider>
            <ThemeProvider>
              <Header />
              {children}
              <Footer />
            </ThemeProvider>
          </DarkModeProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
