import type { GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { Bakery } from "@/models/Bakery";
import BakeriesDirectory from "@/components/bakeries-directory/bakeries-directory";

type HomePageProps = {
  bakeries: Bakery[];
};

export default function HomePage({ bakeries }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
      </Head>

      <Box>
        <BakeriesDirectory bakeries={bakeries} />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const res = await axios({ method: "GET", url: `${process.env.API_URL}/bakeries` });
  const bakeries: Bakery[] = res.data.data.bakeries;

  return {
    props: {
      bakeries,
    },
    revalidate: 1 * 24 * 60 * 60, // 1d
  };
};
