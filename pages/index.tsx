import type { GetServerSideProps } from "next";
import Head from "next/head";
import { chakra } from "@chakra-ui/react";
import axios from "axios";
import { Bakery } from "@/models/Bakery";
import BakeriesDirectory from "@/components/bakeries-directory/bakeries-directory";

type HomePageProps = {
  bakeries: Bakery[];
  adjustedBakeries: (Bakery & { categories: string[] })[];
  categoryList: string[];
};

export default function HomePage({ bakeries, adjustedBakeries, categoryList }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
      </Head>

      <chakra.section maxW="container.lg" mx="auto" my="4">
        <BakeriesDirectory bakeries={bakeries} adjustedBakeries={adjustedBakeries} categoryList={categoryList} />
      </chakra.section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const res = await axios({ method: "GET", url: `${process.env.API_URL}/bakeries` });
  const bakeries: Bakery[] = res.data.data.bakeries;

  // Better to fix on the server to get all categories list and each bakery model should have a field with their categories

  const adjustedBakeries = bakeries.map((b) => {
    const categories: { [key: string]: string } = {};
    b.products.map((p) => {
      if (!categories[p.category]) {
        categories[p.category] = p.category;
      }
      return p;
    });
    return { ...b, categories: Object.values(categories) };
  });

  const categories: string[] = [];
  adjustedBakeries.forEach((b) => categories.push(...b.categories));
  // const categoryList = Array.from(new Set(categories));
  const categoryList = categories;

  return {
    props: {
      bakeries,
      adjustedBakeries,
      categoryList,
    },
  };
};
