import { chakra, Grid, GridProps } from "@chakra-ui/react";
import { CartProduct } from "@/models/CartProduct";

type OrderDetailsGridProps = {
  products: CartProduct[];
} & GridProps;

const GridItemHeader = ({ children }: { children: React.ReactNode }) => (
  <chakra.span borderBottom="1px" borderColor="blackAlpha.200" px="1" py="1" fontSize="xs" fontWeight="bold">
    {children}
  </chakra.span>
);

const GridItemFooter = ({ children }: { children?: React.ReactNode }) => (
  <chakra.span borderTop="1px" borderColor="blackAlpha.200" px="1" py="1" fontSize="xs" fontWeight="bold">
    {children ? children : <chakra.span visibility="hidden">ph</chakra.span>}
  </chakra.span>
);

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <chakra.span px="1" py="0.5" fontSize="sm">
    {children}
  </chakra.span>
);

const OrderDetailsGrid = ({ products, ...gridProps }: OrderDetailsGridProps) => {
  const orderTotal = products.reduce((sum, item) => (sum += item.quantity * item.price), 0);

  return (
    <Grid
      gridTemplateColumns="auto auto minmax(2rem, auto) minmax(2rem, auto)"
      alignItems="end"
      rowGap="2"
      {...gridProps}
    >
      <GridItemHeader>Product</GridItemHeader>
      <GridItemHeader>QTY</GridItemHeader>
      <GridItemHeader>Price</GridItemHeader>
      <GridItemHeader>Total</GridItemHeader>

      {products.map((p) => (
        <>
          <GridItem>{p.title}</GridItem>
          <GridItem>{p.quantity}</GridItem>
          <GridItem>{p.price}</GridItem>
          <GridItem>{(+p.quantity * +p.price).toLocaleString()}</GridItem>
        </>
      ))}

      <GridItemFooter>Total</GridItemFooter>
      <GridItemFooter></GridItemFooter>
      <GridItemFooter></GridItemFooter>
      <GridItemFooter>{orderTotal.toLocaleString()}</GridItemFooter>
    </Grid>
  );
};

export default OrderDetailsGrid;
