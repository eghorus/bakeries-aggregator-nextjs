import type { GetServerSideProps } from "next";
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

      <BakeriesDirectory bakeries={bakeries} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const res = await axios({ method: "GET", url: `${process.env.API_URL}/bakeries` });
  const bakeries: Bakery[] = res.data.data.bakeries;

  return {
    props: {
      bakeries,
    },
  };
};
