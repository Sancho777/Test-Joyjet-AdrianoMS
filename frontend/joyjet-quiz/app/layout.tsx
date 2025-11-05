import './globals.css'; // your Tailwind CSS
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import { Providers } from '@/providers';

export const metadata = {
  title: 'Joyjet Quiz',
  description: 'Create and play quizzes',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-var(--background) text-var(--text-color)">
        <Providers>
          <Navbar />
          {/* Remove padding here; let pages control spacing */}
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
