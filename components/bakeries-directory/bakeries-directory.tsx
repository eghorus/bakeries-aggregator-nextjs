import { useMemo } from "react";
import { Box, Flex, Grid, Heading, Text, chakra, useCheckboxGroup } from "@chakra-ui/react";
import { Bakery } from "@/models/Bakery";
import { hasAnyItemInCommon } from "@/helpers/array";
import CategoryCheckbox from "./category-checkbox";
import BakeryCard from "./bakery-card";

type BakeriesDirectoryProps = {
  bakeries: Bakery[];
};

const BakeriesDirectory = ({ bakeries }: BakeriesDirectoryProps) => {
  const { value: filteredCategories, getCheckboxProps } = useCheckboxGroup({ defaultValue: [] });

  // Better to fix on the server to get all categories list and each bakery model should have a field with their categories

  /* To add a categories property to each bakery. */
  const adjustedBakeries = useMemo(
    () =>
      bakeries.map((b) => {
        const categories: { [key: string]: string } = {};
        b.products.map((p) => {
          if (!categories[p.category]) {
            categories[p.category] = p.category;
          }
          return p;
        });
        return { ...b, categories: Object.values(categories) };
      }),
    [bakeries]
  );

  const categoryList = useMemo(() => {
    const categories: string[] = [];
    adjustedBakeries.forEach((b) => categories.push(...b.categories));
    return Array.from(new Set(categories));
  }, [adjustedBakeries]);

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
            {categoryList.map((c, i) => (
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
