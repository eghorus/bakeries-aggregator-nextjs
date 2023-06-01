import { useContext } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, chakra, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { MdRemoveCircle } from "react-icons/md";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { CartProduct } from "@/models/CartProduct";
import { AuthContext } from "@/store/auth-context";
import { CartContext } from "@/store/cart-context";
import { getImageUrl } from "@/helpers/url";
import OrderDetailsGrid from "@/components/elements/order-details-grid";

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

const CartProducts = () => {
  const { authToken } = useContext(AuthContext);
  const { bakery, products, removeFromCart, resetCart } = useContext(CartContext);
  const { trigger, isMutating } = useSWRMutation([`/orders`, authToken], confirmOrderFetcher);
  const router = useRouter();
  const logoImgSrc = getImageUrl(bakery?.images?.logo || "");

  const onConfirmOrder = async () => {
    const confirmOrderdata = {
      bakeryId: bakery ? bakery.id : "",
      products: Object.values(products),
    };
    await trigger(confirmOrderdata);
    router.push("/my-orders");
    resetCart();
  };

  return (
    <>
      {!Object.values(products).length ? (
        <Text mt="12" textAlign="center">
          Your cart is empty. Start adding some products.
        </Text>
      ) : (
        <>
          <Flex alignItems="center" gap="4" mb="4" fontWeight="bold">
            <Avatar src={logoImgSrc} name={bakery?.title} />
            <chakra.span>{bakery?.title}</chakra.span>
          </Flex>

          <OrderDetailsGrid
            products={Object.values(products)}
            ActionComponent={({ productId }: { productId: string }) => (
              <IconButton
                aria-label="Remove from cart"
                colorScheme="red"
                size="sm"
                variant="ghost"
                icon={<Icon as={MdRemoveCircle} />}
                onClick={() => removeFromCart(productId)}
              />
            )}
            borderTop="4px"
            borderColor="primary.500"
            borderRadius="lg"
            p="4"
            pt="2"
            bgColor="white"
            sx={{ "& > *": { py: "2", fontSize: "md" } }}
          />
          <Flex flexDirection="column" alignItems="center" gap="4" mt="4">
            <Button isLoading={isMutating} onClick={onConfirmOrder}>
              Confirm Order
            </Button>
            <Button colorScheme="blackAlpha" size="sm" variant="ghost" onClick={resetCart}>
              Reset Cart
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};

export default CartProducts;
