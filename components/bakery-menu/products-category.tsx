import { Box, Grid, Heading } from "@chakra-ui/react";
import { Product } from "@/models/Product";
import { Bakery } from "@/models/Bakery";
import ProductCard from "./product-card";

type ProductsCategoryProps = {
  title: string;
  products: Product[];
  bakery: Bakery;
};

const ProductsCategory = ({ title, products, bakery }: ProductsCategoryProps) => {
  return (
    <Box>
      <Heading as="h4" size="h5" px="4" py="2" bgColor="blackAlpha.100">
        {title}
      </Heading>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(170px, 1fr))" gap="4" p="6" bgColor="primary.50">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} bakery={bakery} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsCategory;
