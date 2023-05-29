import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import { Box, chakra, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { Bakery } from "@/models/Bakery";
import { Product } from "@/models/Product";
import Header from "@/components/bakery-view/header";

type BakeryPageProps = {
  bakery: Bakery;
};

export default function BakeryPage({ bakery }: BakeryPageProps) {
  const { id, images, products, ratingAvg, ratingQty, title } = bakery;

  const productsCategorized: { [key: string]: Product[] } = {};
  products.forEach((p) => {
    if (!productsCategorized[p.category]) productsCategorized[p.category] = [];
    productsCategorized[p.category].push(p);
  });

  return (
    <>
      <Head>
        <title>{`${title} | Bakeries Aggregator`}</title>
      </Head>

      <Flex gap="6">
        <Box maxW="64" w="full">
          Side
        </Box>

        <chakra.section w="full">
          <Header categories={Object.keys(productsCategorized)} images={images} title={title} />
        </chakra.section>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps<BakeryPageProps> = async ({ params }) => {
  const res = await axios.get(`${process.env.API_URL}/bakeries/${params?.bakeryId}`);
  const bakery: Bakery = res.data.data.bakery;

  if (!bakery) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      bakery,
    },
    revalidate: 7 * 24 * 60 * 60, // 7d
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.API_URL}/bakeries`);
  const bakeries: Bakery[] = res.data.data.bakeries;
  const paths = bakeries.map((b) => ({ params: { bakeryId: b.id } }));

  return {
    paths,
    fallback: true,
  };
};
