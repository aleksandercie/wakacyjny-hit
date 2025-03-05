import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Footer, Navigation } from '@/components';

const nunitoSans = Nunito({
  variable: '--font-nunito-sans',
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
      <body className={`${nunitoSans.variable} antialiased relative bg-white`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
