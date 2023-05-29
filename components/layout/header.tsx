import NextLink from "next/link";
import { Box, Button, Flex, Icon, IconButton, chakra, useDisclosure } from "@chakra-ui/react";
import { RiMenuFoldLine, RiStore2Line } from "react-icons/ri";
import Logo from "./logo";
import SideDrawer from "./side-drawer";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <chakra.header
      position="sticky"
      top="0"
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
          <Button
            as={NextLink}
            href="/shop"
            variant="ghost"
            leftIcon={<Icon as={RiStore2Line} mb="0.5" />}
            border="1px"
            borderColor="blackAlpha.200"
          >
            The Shop
          </Button>

          <Flex gap="2">
            <Button as={NextLink} href="/auth?form=signin" size="sm" variant="outline">
              Sign In
            </Button>
            <Button as={NextLink} href="/auth?form=signup" size="sm">
              Create Account
            </Button>
          </Flex>
        </Box>

        <IconButton
          aria-label="primary navigation"
          icon={<Icon as={RiMenuFoldLine} w="full" h="full" />}
          size="sm"
          variant="outline"
          display={{ md: "none" }}
          p="1"
          onClick={onOpen}
        />
      </chakra.nav>

      <SideDrawer isOpen={isOpen} onClose={onClose} />
    </chakra.header>
  );
}
