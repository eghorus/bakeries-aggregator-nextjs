import { Box, Flex, Grid, Heading, Text, chakra, useCheckboxGroup } from "@chakra-ui/react";
import { Bakery } from "@/models/Bakery";
import { hasAnyItemInCommon } from "@/helpers/array";
import CategoryCheckbox from "./category-checkbox";
import BakeryCard from "./bakery-card";

type BakeriesDirectoryProps = {
  bakeries: (Bakery & { categories: string[] })[];
  categories: string[];
};

const BakeriesDirectory = ({ bakeries, categories }: BakeriesDirectoryProps) => {
  const { value: filteredCategories, getCheckboxProps } = useCheckboxGroup({ defaultValue: [] });

  const filteredBakeries =
    filteredCategories.length > 0
      ? bakeries.filter((b) => hasAnyItemInCommon(b.categories, filteredCategories))
      : bakeries;

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
