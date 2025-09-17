'use client';

import Script from 'next/script';

interface GtagProps {
  tagId: string;
}

export default function Gtag({ tagId }: Readonly<GtagProps>) {
  return (
    <>
      <Script
        id="gtag"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
      />
      <Script id="gtag-init">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${tagId}');
      `}
      </Script>
    </>
  );
}
