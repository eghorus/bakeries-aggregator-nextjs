import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import { AuthContextProvider } from "@/store/auth-context";
import { CurrentUserContextProvider } from "@/store/current-user-context";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
        <meta name="description" content="An online aggregator to discover and order products from bakery shops." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthContextProvider>
        <CurrentUserContextProvider>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </CurrentUserContextProvider>
      </AuthContextProvider>
    </>
  );
}
