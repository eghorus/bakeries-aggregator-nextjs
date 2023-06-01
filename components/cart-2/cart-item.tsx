import { Icon, IconButton, chakra } from "@chakra-ui/react";
import { RiCloseFill } from "react-icons/ri";
import { CartProduct } from "@/models/CartProduct";

type CartItemProps = {
  product: CartProduct;
};

const CartItem = ({ product }: CartItemProps) => {
  const { category, id, image, price, quantity, title } = product;

  return (
    <>
      <chakra.span borderBottom="1px" borderBottomColor="blackAlpha.200" px="1" py="1" fontWeight="medium">
        {title}
      </chakra.span>
      <chakra.span borderBottom="1px" borderBottomColor="blackAlpha.200" px="1" py="1">
        {quantity}
      </chakra.span>
      <chakra.span borderBottom="1px" borderBottomColor="blackAlpha.200" px="1" py="1">
        {price}
      </chakra.span>
      <chakra.span borderBottom="1px" borderBottomColor="blackAlpha.200" px="1" py="1" fontWeight="medium">
        200000
      </chakra.span>
      <chakra.span borderBottom="1px" borderBottomColor="blackAlpha.200" px="1" py="1" fontWeight="medium">
        <IconButton
          aria-label="Remove from cart"
          colorScheme="red"
          size="xs"
          variant="ghost"
          icon={<Icon as={RiCloseFill} />}
          fontSize="md"
        />
      </chakra.span>
    </>
  );
};

export default CartItem;
