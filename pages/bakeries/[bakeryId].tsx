import type { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { Box, chakra, Flex } from "@chakra-ui/react";
import axios from "axios";
import { Bakery } from "@/models/Bakery";
import { CategorizedProducts } from "@/models/CategorizedProducts";
import Header from "@/components/bakery-view/header";
import BakeryMenu from "@/components/bakery-view/bakery-menu";

type BakeryPageProps = {
  bakery: Bakery;
};

export default function BakeryPage({ bakery }: BakeryPageProps) {
  const { id, images, products, ratingAvg, ratingQty, title } = bakery;
  const categorizedProducts: CategorizedProducts = {};
  products.forEach((p) => {
    if (!categorizedProducts[p.category]) categorizedProducts[p.category] = [];
    categorizedProducts[p.category].push(p);
  });

  return (
    <>
      <Head>
        <title>{`${title} | Bakeries Aggregator`}</title>
      </Head>

      <Flex gap="6">
        <Box w="full" maxW="64" bgColor="gray.200">
          Side
        </Box>

        <chakra.section w="full">
          <Header
            categories={Object.keys(categorizedProducts)}
            images={images}
            ratingAvg={ratingAvg}
            ratingQty={ratingQty}
            title={title}
          />

          <BakeryMenu categorizedProducts={categorizedProducts} />
        </chakra.section>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps<BakeryPageProps> = async ({ params }) => {
  const res = await axios({ method: "GET", url: `${process.env.API_URL}/bakeries/${params?.bakeryId}` });
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
    revalidate: 1 * 24 * 60 * 60, // 1d
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
