import { useContext } from "react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { RiMenuFoldLine, RiShoppingBasketFill } from "react-icons/ri";
import { CartContext } from "@/store/cart-context";
import Logo from "./logo";
import HeaderNavigationItems from "./header-navigation-items";
import SideDrawer from "./side-drawer/side-drawer";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { products } = useContext(CartContext);
  const cartProductsCount = products.length;

  return (
    <chakra.header
      position="sticky"
      top="0"
      zIndex="10"
      w="full"
      boxShadow="sm"
      borderBottom="1px"
      borderColor="blackAlpha.400"
      bgColor="white"
    >
      <chakra.nav display="flex" alignItems="center" gap="8" maxW="container.xl" mx="auto" px="6" py="1">
        <Logo />
        <Box mr="auto" />

        <Box display={{ base: "none", md: "contents" }}>
          <HeaderNavigationItems />
        </Box>

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
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton
          aria-label="Open primary navigation menu"
          icon={<Icon as={RiMenuFoldLine} w="full" h="full" />}
          size="sm"
          display={{ md: "none" }}
          p="1"
          onClick={onOpen}
        />
      </chakra.nav>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </chakra.header>
  );
};

export default Header;
