import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RunLog — Running Coach',
  description: 'Your weekly running plan and training log.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
