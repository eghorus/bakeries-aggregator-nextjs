import { Box, Icon, IconButton, chakra, useDisclosure } from "@chakra-ui/react";
import { RiMenuFoldLine } from "react-icons/ri";
import Logo from "./logo";
import HeaderNavigationItems from "./header-navigation-items";
import SideDrawer from "./side-drawer/side-drawer";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <chakra.nav
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="8"
        maxW="container.xl"
        mx="auto"
        px="6"
        py="1"
      >
        <Logo />

        <Box display={{ base: "none", md: "contents" }}>
          <HeaderNavigationItems />
        </Box>

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
