import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components';

const montserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: ['Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'Wakacyjny hit',
  description: 'Wakacyjny hit'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${montserratSans.variable} antialiased relative bg-white`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
