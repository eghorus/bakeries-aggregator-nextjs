import { useContext } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Input, useNumberInput } from "@chakra-ui/react";
import { Product } from "@/models/Product";
import { CartProduct } from "@/models/CartProduct";
import { AuthContext } from "@/store/auth-context";
import { CartContext } from "@/store/cart-context";
import useConfirmModal from "@/hooks/use-confirm-modal";

type AddToCartButtonProps = {
  product: Product;
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const router = useRouter();
  const { authUserId } = useContext(AuthContext);
  const { bakeryId, addToCart } = useContext(CartContext);
  const { valueAsNumber, getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 10,
  });
  const cartProduct: CartProduct = { ...product, quantity: valueAsNumber };
  const { openConfirmModal, ConfirmModalComponent: ConfirmModal } = useConfirmModal(() =>
    router.push("/auth?form=signin")
  );

  const handleAddToCart = () => {
    if (!authUserId) {
      openConfirmModal({
        heading: "Plesae sign in!",
        message: "You need to sign in or create a new account to starting adding products.",
        confirmButtonTitle: "Sign In Page",
      });
      return;
    }

    if (bakeryId && bakeryId !== product.bakery) {
      openConfirmModal({
        heading: "This is a different Order!",
        message: "You need to empty your cart first to start creating an order from another bakery shop.",
      });
      return;
    }

    addToCart(cartProduct);
  };

  return (
    <>
      <Flex gap="2">
        <Flex gap="1">
          <Button colorScheme="secondary" size="sm" variant="outline" fontSize="md" {...getIncrementButtonProps()}>
            +
          </Button>
          <Input size="sm" maxW="10" {...getInputProps()} />
          <Button colorScheme="secondary" size="sm" variant="outline" fontSize="md" {...getDecrementButtonProps()}>
            -
          </Button>
        </Flex>
        <Button size="sm" onClick={handleAddToCart}>
          Add
        </Button>
      </Flex>

      <ConfirmModal />
    </>
  );
};

export default AddToCartButton;
