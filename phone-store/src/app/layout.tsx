import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phone Store App',
  description: 'Store App showcase with product filters and searching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}
