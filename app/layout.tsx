import type { Metadata, Viewport } from 'next';
import './globals.css';
import PwaRegister from './components/pwa-register';

export const metadata: Metadata = {
  title: 'RunLog — Your training, clearly logged',
  description: 'A focused weekly running log powered by Garmin snapshots.',
  applicationName: 'RunLog',
  generator: 'Next.js',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f3f4ec',
  colorScheme: 'light',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <PwaRegister />
      </body>
    </html>
  );
}
