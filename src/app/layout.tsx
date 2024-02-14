import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://microsoftgraveyard.com'),
  title: "Microsoft Graveyard",
  description: "Microsoft Graveyard is the virtual graveyard for all products killed by Microsoft; a free and open source collection of dead Microsoft products built by a passionate and nostalgic community.",
  keywords: ["microsoft graveyard", "killed by microsoft", "microsoft cemetery", "microsoft", "dead products"],
  icons: ["images/headstone.svg"],
  authors: {
    name: "Victor Frye",
    url: "https://victorfrye.com/",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Microsoft Graveyard",
    description: "The virtual graveyard for all products killed by Microsoft.",
    siteName: "Microsoft Graveyard",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
