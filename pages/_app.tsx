import Head from "next/head";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Bakeries Aggregator</title>
        <meta name="description" content="An online aggregator to discover and order products from bakery shops." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}
