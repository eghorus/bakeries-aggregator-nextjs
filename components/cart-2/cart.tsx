import { useContext } from "react";
import {
  Box,
  chakra,
  Flex,
  Grid,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { RiShoppingBasketFill } from "react-icons/ri";
import { CartContext } from "@/store/cart-context";
import CartItem from "./cart-item";

const Cart = () => {
  const { products } = useContext(CartContext);
  const cartProductsCount = Object.keys(products).length;

  return (
    <Popover>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Open shopping cart"
            variant="outline"
            icon={<Icon as={RiShoppingBasketFill} boxSize="7" />}
          />
          <Flex
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top="-2"
            right="-4"
            boxSize="7"
            bgColor="secondary.600"
            borderRadius="full"
            color="white"
            fontSize="sm"
            fontWeight="bold"
          >
            {cartProductsCount}
          </Flex>
        </Box>
      </PopoverTrigger>

      <PopoverContent w={{ base: "320px", sm: "340px" }} border="1px" borderColor="blackAlpha.400">
        <PopoverArrow bgColor="primary.500" />
        <PopoverCloseButton color="white" />

        <PopoverHeader bgColor="primary.500" color="white" fontWeight="bold" textAlign="center">
          Your Cart
        </PopoverHeader>

        <PopoverBody maxH="70vh" overflow="auto" p="2" fontSize="sm">
          <Grid
            gridTemplateColumns="auto 2rem minmax(2rem, auto) minmax(2rem, auto) 1.5rem"
            alignItems="end"
            rowGap="2"
            listStyleType="none"
          >
            <>
              <chakra.span borderBottom="1px" borderColor="blackAlpha.400" px="1" fontSize="xs" fontWeight="bold">
                Product
              </chakra.span>
              <chakra.span borderBottom="1px" borderColor="blackAlpha.400" px="1" fontSize="xs" fontWeight="bold">
                Qty
              </chakra.span>
              <chakra.span borderBottom="1px" borderColor="blackAlpha.400" px="1" fontSize="xs" fontWeight="bold">
                Price
              </chakra.span>
              <chakra.span borderBottom="1px" borderColor="blackAlpha.400" px="1" fontSize="xs" fontWeight="bold">
                Total
              </chakra.span>
              <chakra.span borderBottom="1px" borderColor="blackAlpha.400" px="1" fontSize="xs" fontWeight="bold">
                _
              </chakra.span>

              {Object.keys(products).map((k) => (
                <CartItem key={products[k].id} product={products[k]} />
              ))}
            </>
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Cart;
