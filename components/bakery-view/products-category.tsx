import { Box, Grid, Heading } from "@chakra-ui/react";
import { Product } from "@/models/Product";
import ProductCard from "./product-card";

type ProductsCategoryProps = {
  title: string;
  products: Product[];
};

const ProductsCategory = ({ title, products }: ProductsCategoryProps) => {
  return (
    <Box>
      <Heading as="h4" size="h5" px="4" py="2" bgColor="blackAlpha.100">
        {title}
      </Heading>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(170px, 1fr))" gap="6" p="4">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsCategory;
