import Head from "next/head";
import { chakra, Heading, Text } from "@chakra-ui/react";
import usePageProtect from "@/hooks/use-page-protect";
import CartProducts from "@/components/cart/cart-products";

export default function CartPage() {
  const { isCheckingAuth, LoadingSpinner } = usePageProtect({ allowed: "authenticated" });

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
      </Head>

      <chakra.section maxW="container.md" mx="auto" my="6">
        <Heading as="h2" size="h2" mb="4">
          Shopping Cart
        </Heading>
        <Text mb="4" color="blackAlpha.700">
          Please review your order.
        </Text>

        <CartProducts />
      </chakra.section>
    </>
  );
}
