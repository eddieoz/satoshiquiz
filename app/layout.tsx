import './globals.css';
import React from 'react';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Test your knowledge about Bitcoin with ChatGPT',
  description: 'Answer questions about Bitcoin and learn more about it with ChatGPT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
