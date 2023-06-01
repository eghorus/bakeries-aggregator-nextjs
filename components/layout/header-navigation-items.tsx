import { useContext } from "react";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { MdLogout, MdOutlineReceiptLong } from "react-icons/md";
import { RiShoppingBasketFill } from "react-icons/ri";
import { CurrentUserContext } from "@/store/current-user-context";
import { CartContext } from "@/store/cart-context";

const HeaderNavigationItems = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { products } = useContext(CartContext);
  const cartProductsCount = Object.keys(products).length;

  return currentUser ? (
    <Flex gap="8">
      <Menu autoSelect={false}>
        <MenuButton>
          <Flex alignItems="center" gap="2">
            <chakra.span fontWeight="medium">{currentUser.name}</chakra.span>
            <Avatar
              name={currentUser.name}
              src={currentUser.image?.src}
              size="sm"
              p="5"
              bg="primary.500"
              color="white"
            />
            <Icon as={BiChevronDown} boxSize="5" />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuGroup title="Account">
            <MenuItem as={NextLink} href="/my-orders" _hover={{ bgColor: "blackAlpha.100" }}>
              <Icon as={MdOutlineReceiptLong} mr="2" />
              <chakra.span fontSize="sm">My Orders</chakra.span>
            </MenuItem>
            <MenuItem as={NextLink} href="/cart" _hover={{ bgColor: "blackAlpha.100" }}>
              <Icon as={RiShoppingBasketFill} mr="2" />
              <chakra.span fontSize="sm">Cart</chakra.span>
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuItem as={NextLink} href="/signout" _hover={{ bgColor: "blackAlpha.100" }}>
              <Icon as={MdLogout} mr="2" />
              <chakra.span fontSize="sm">Sign Out</chakra.span>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>

      <Box position="relative">
        <IconButton
          as={NextLink}
          href="/cart"
          aria-label="Open shopping cart"
          colorScheme="secondary"
          icon={<Icon as={RiShoppingBasketFill} boxSize="7" />}
          borderRadius="lg"
        />
        <Flex
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="-2"
          right="-4"
          boxSize="7"
          bgColor="primary.200"
          borderRadius="full"
          fontSize="sm"
          fontWeight="bold"
        >
          {cartProductsCount}
        </Flex>
      </Box>
    </Flex>
  ) : (
    <Flex gap="2">
      <Button as={NextLink} href="/auth?form=signin" size="sm" variant="outline">
        Sign In
      </Button>
      <Button as={NextLink} href="/auth?form=signup" size="sm">
        Create Account
      </Button>
    </Flex>
  );
};

export default HeaderNavigationItems;
