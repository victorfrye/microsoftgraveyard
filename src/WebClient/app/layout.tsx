import { ReactNode } from 'react';

import type { Metadata } from 'next';

import { ClarityTag, Gtag } from '@microsoftgraveyard/analytics';
import '@microsoftgraveyard/globals.css';
import ProviderTree from '@microsoftgraveyard/provider-tree';
import { Shell } from '@microsoftgraveyard/shell';

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
  icons: ['assets/headstone.svg'],
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

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <Gtag tagId="G-0X07054Z3N" />
      <ClarityTag projectId="tcaogrreyn" />

      <body>
        <div id="root">
          <ProviderTree>
            <Shell>{children}</Shell>
          </ProviderTree>
        </div>
      </body>
    </html>
  );
}
