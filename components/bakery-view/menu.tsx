import { Box, Heading } from "@chakra-ui/react";
import { CategorizedProducts } from "@/models/CategorizedProducts";
import ProductsCategory from "./products-category";

type MenuProps = {
  categorizedProducts: CategorizedProducts;
};

const Menu = ({ categorizedProducts }: MenuProps) => {
  return (
    <Box overflow="hidden" my="4" border="1px" borderColor="blackAlpha.200" borderRadius="lg">
      <Heading as="h3" size="h3" px="6" py="6" color="primary.600">
        Menu
      </Heading>

      {Object.keys(categorizedProducts).map((key, i) => (
        <ProductsCategory key={i} title={key} products={categorizedProducts[key]} />
      ))}
    </Box>
  );
};

export default Menu;