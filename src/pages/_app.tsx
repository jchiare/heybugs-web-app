import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>heybugs</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <NavBar>
            <Component {...pageProps} />
          </NavBar>
        </QueryClientProvider>
      </MantineProvider>
    </SessionProvider>
  );
};

export default MyApp;
