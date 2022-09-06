import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';
import NavBar from '../components/NavBar';

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
        <NavBar>
          <Component {...pageProps} />
        </NavBar>
      </MantineProvider>
    </SessionProvider>
  );
};

export default MyApp;
