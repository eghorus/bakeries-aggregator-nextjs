import Head from "next/head";
import { Center, Spinner, chakra } from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import { Bakery } from "@/models/Bakery";
import BakeriesDirectory from "@/components/bakeries-directory/bakeries-directory";

const getBakeriesFetcher = async (path: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const res = await axios({ method: "GET", url });
  return res.data.data.bakeries;
};

export default function HomePage() {
  const { data: bakeries, error, isLoading } = useSWR("/bakeries", getBakeriesFetcher);

  if (isLoading && !bakeries) {
    return (
      <Center mt="16">
        <Spinner color="primary.500" />
      </Center>
    );
  }

  // Better to fix on the server to get all categories list and each bakery model should have a field with their categories
  const adjustedBakeries: (Bakery & { categories: string[] })[] = bakeries.map((b: Bakery) => {
    const categories: Record<string, string> = {};
    b.products.map((p) => {
      if (!categories[p.category]) {
        categories[p.category] = p.category;
      }
      return p;
    });
    return { ...b, categories: Object.values(categories) };
  });

  const allCategoriesFound: string[] = [];
  adjustedBakeries.forEach((b) => allCategoriesFound.push(...b.categories));
  const categories = Array.from(new Set(allCategoriesFound));

  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
      </Head>

      <chakra.section maxW="container.lg" mx="auto" my="4">
        <BakeriesDirectory bakeries={adjustedBakeries} categories={categories} />
      </chakra.section>
    </>
  );
}
