import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';
import { IBM_Plex_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

const IBMPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
});

export const metadata: Metadata = {
  title: 'Mariachify',
  description: 'Party essentials',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      variables: {colorPrimary: '#624cf5'}
    }}>
      <html lang="en">
        <body className={cn('font-IBMPlex antialiased', IBMPlex.variable)}>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}

