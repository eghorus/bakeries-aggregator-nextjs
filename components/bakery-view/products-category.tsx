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
      <Heading as="h4" size="h5" px="6" py="4" bgColor="primary.50">
        {title}
      </Heading>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(10rem, 1fr))" gap="8" p="6">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsCategory;
