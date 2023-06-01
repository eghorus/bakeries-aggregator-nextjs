import { Box, Flex, Grid, Heading, Text, chakra, useCheckboxGroup } from "@chakra-ui/react";
import { Bakery } from "@/models/Bakery";
import { Product } from "@/models/Product";
import { hasAnyItemInCommon } from "@/helpers/array";
import CategoryCheckbox from "./category-checkbox";
import BakeryCard from "./bakery-card";

type BakeriesDirectoryProps = {
  bakeries: Bakery[];
  adjustedBakeries: {
    id: string;
    title: string;
    images: {
      logo: string;
      cover: string;
    };
    ratingAvg: number;
    ratingQty: number;
    products: Product[];
    categories: string[];
  }[];
  categories: string[];
};

const BakeriesDirectory = ({ bakeries, adjustedBakeries, categories }: BakeriesDirectoryProps) => {
  const { value: filteredCategories, getCheckboxProps } = useCheckboxGroup({ defaultValue: [] });
  //

  let adjbake: {
    id: string;
    title: string;
    images: {
      logo: string;
      cover: string;
    };
    ratingAvg: number;
    ratingQty: number;
    products: Product[];
    categories?: string[];
  }[] = [...bakeries];
  for (let i = 0; i < adjbake.length; i++) {
    console.log(adjbake[i]);

    const categories: Record<any, string> = {};

    for (let j = 0; j < adjbake[i].products.length; j++) {
      console.log(adjbake[i].products);

      if (!categories[adjbake[i].products[j].category]) {
        categories[adjbake[i].products[j].category] = adjbake[i].products[j].category;
      }

      adjbake[i].categories = Object.values(categories);
    }
  }
  const adjBakeries = bakeries.map((b) => {
    const categories: Record<any, string> = {};
    b.products.map((p) => {
      if (!categories[p.category]) {
        categories[p.category] = p.category;
      }
      return p;
    });
    return { ...b, categories: Object.values(categories) };
  });
  //
  const filteredBakeries =
    filteredCategories.length > 0
      ? adjustedBakeries.filter((b) => hasAnyItemInCommon(b.categories, filteredCategories))
      : adjustedBakeries;

  return (
    <>
      <Box
        border="1px"
        borderColor="blackAlpha.400"
        borderTop="4px"
        borderTopColor="primary.500"
        borderRadius="lg"
        p="4"
        bgColor="white"
      >
        <chakra.header px="4" py="6" bgColor="primary.50" textAlign="center">
          <Heading as="h2" size="h2" mb="4">
            Explore Bakeries
          </Heading>
          <Text color="blackAlpha.700" fontSize="lg">
            The best way to start the day, and end the night.
          </Text>
        </chakra.header>

        <Box p="4" pt="6">
          <Text mb="4" color="blackAlpha.700" fontSize="sm" textAlign="center">
            Filter by category
          </Text>
          <Flex flexWrap="wrap" justifyContent="center" gap="2">
            {categories.map((c, i) => (
              <CategoryCheckbox key={i} label={c} {...getCheckboxProps({ value: c })} />
            ))}
          </Flex>
        </Box>
      </Box>

      <Grid gridTemplateColumns="repeat(auto-fit, 18rem)" justifyContent="center" gap="8" px="4" py="6">
        {filteredBakeries.map((b) => (
          <BakeryCard key={b.id} bakery={b} />
        ))}
      </Grid>
    </>
  );
};

export default BakeriesDirectory;
