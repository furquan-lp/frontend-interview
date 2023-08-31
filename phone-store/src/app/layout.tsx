import './globals.css';
import type { Metadata } from 'next';
import { Source_Code_Pro } from 'next/font/google';

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

export const metadata: Metadata = {
  title: 'Phone Store App',
  description: 'Store App showcase with product filters and searching',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={sourceCodePro.variable}>
      <body className=''>{children}</body>
    </html>
  );
}
