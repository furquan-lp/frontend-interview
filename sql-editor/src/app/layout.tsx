import './globals.css';
import type { Metadata } from 'next';
import { Patua_One, Source_Code_Pro } from 'next/font/google';
import Script from 'next/script';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro'
});

const patua = Patua_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-patua'
});

export const metadata: Metadata = {
  title: 'SQL Editor',
  description: 'Backendless SQL Editor Web App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${patua.variable} ${sourceCodePro.variable}`}>
      <head>
        <Script type="module" strategy='beforeInteractive' src="/sql-loader.js" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined"
          rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
};
