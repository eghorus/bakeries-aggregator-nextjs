import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Box, Heading, chakra } from "@chakra-ui/react";
import axios from "axios";
import { Bakery } from "@/models/Bakery";
import { CategorizedProducts } from "@/models/CategorizedProducts";
import Header from "@/components/bakery-menu/header";
import ProductsCategory from "@/components/bakery-menu/products-category";

type BakeryPageProps = {
  bakery: Bakery;
};

export default function BakeryPage({ bakery }: BakeryPageProps) {
  const { images, products, ratingAvg, ratingQty, title } = bakery;
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

      <chakra.section maxW="container.md" mx="auto" my="4">
        <Header
          title={title}
          images={images}
          categories={Object.keys(categorizedProducts)}
          ratingAvg={ratingAvg}
          ratingQty={ratingQty}
        />

        <Box overflow="hidden" border="1px" borderColor="blackAlpha.200" borderRadius="lg">
          <Heading as="h3" size="h3" p="4" bgColor="white" color="primary.600">
            Menu
          </Heading>
          {Object.keys(categorizedProducts).map((key, i) => (
            <ProductsCategory key={i} title={key} products={categorizedProducts[key]} bakery={bakery} />
          ))}
        </Box>
      </chakra.section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<BakeryPageProps> = async ({ params }) => {
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
  };
};
