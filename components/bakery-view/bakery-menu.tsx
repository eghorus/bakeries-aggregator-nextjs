import { Box, Heading } from "@chakra-ui/react";
import { CategorizedProducts } from "@/models/CategorizedProducts";
import ProductsCategory from "./products-category";

type BakeryMenuProps = {
  categorizedProducts: CategorizedProducts;
};

const BakeryMenu = ({ categorizedProducts }: BakeryMenuProps) => {
  return (
    <Box overflow="hidden" border="1px" borderColor="blackAlpha.200" borderRadius="lg">
      <Heading as="h3" size="h3" p="4" bgColor="white" color="primary.600">
        Menu
      </Heading>

      {Object.keys(categorizedProducts).map((key, i) => (
        <ProductsCategory key={i} title={key} products={categorizedProducts[key]} />
      ))}
    </Box>
  );
};

export default BakeryMenu;
