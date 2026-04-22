import AppShell from '@/components/layout/Appshell'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={poppins.className}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </div>
    </SessionProvider>
  )

}
