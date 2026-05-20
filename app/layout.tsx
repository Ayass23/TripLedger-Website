import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'TripLedger - Split Bill',
  description: 'View shared split bill details from TripLedger iOS app',
  openGraph: {
    title: 'TripLedger',
    description: 'Split bill management made easy',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        <main className="min-h-screen bg-surface-base">
          {children}
        </main>
      </body>
    </html>
  );
}
