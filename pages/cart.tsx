import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, chakra, Flex, Heading, Text } from "@chakra-ui/react";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import usePageProtect from "@/hooks/use-page-protect";
import { CartProduct } from "@/models/CartProduct";
import { AuthContext } from "@/store/auth-context";
import { CartContext } from "@/store/cart-context";
import OrderDetailsGrid from "@/components/order/order-details-grid";

const confirmOrderFetcher = async (
  [path, authToken]: [string, string],
  { arg }: { arg: { products: CartProduct[]; bakeryId: string } }
) => {
  const res = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    headers: { Authorization: `Bearer ${authToken}` },
    data: arg,
  });
  return res.data;
};

export default function CartPage() {
  const { isCheckingAuth, LoadingSpinner } = usePageProtect({ allowed: "authenticated" });
  const { authToken } = useContext(AuthContext);
  const { bakeryId, products, removeFromCart, emptyCart } = useContext(CartContext);
  const { trigger, isMutating } = useSWRMutation([`/orders`, authToken], confirmOrderFetcher);
  const router = useRouter();

  if (isCheckingAuth) return <LoadingSpinner />;

  const onConfirmOrder = async () => {
    const confirmOrderdata = {
      bakeryId,
      products: Object.values(products),
    };
    await trigger(confirmOrderdata);
    router.push("/my-orders");
    emptyCart();
  };

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

        {!Object.values(products).length ? (
          <Text textAlign="center">Your cart is empty. Start adding some products.</Text>
        ) : (
          <>
            <OrderDetailsGrid
              products={Object.values(products)}
              borderTop="4px"
              borderColor="primary.500"
              borderRadius="lg"
              p="4"
              bgColor="white"
              sx={{ "& > *": { py: "2", fontSize: "md" } }}
            />
            <Flex flexDirection="column" alignItems="center" gap="4" mt="6">
              <Button isLoading={isMutating} onClick={onConfirmOrder}>
                Confirm Order
              </Button>
              <Button colorScheme="blackAlpha" size="sm" variant="ghost" onClick={emptyCart}>
                Reset Cart
              </Button>
            </Flex>
          </>
        )}
      </chakra.section>
    </>
  );
}
