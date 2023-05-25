import NextLink from "next/link";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import Logo from "./logo";
import { MdClose } from "react-icons/md";
import { RiStore2Line } from "react-icons/ri";
import Copyright from "./copyright";

type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader display="flex">
            <Logo />
            <IconButton
              aria-label="close drawer"
              icon={<MdClose fontSize="1.2rem" />}
              colorScheme="blackAlpha"
              size="sm"
              variant="outline"
              borderColor="blackAlpha.300"
              borderRadius="full"
              onClick={onClose}
            />
          </DrawerHeader>

          <DrawerBody display="flex" flexDirection="column">
            <Button
              as={NextLink}
              href="/shop"
              variant="ghost"
              leftIcon={<Icon as={RiStore2Line} mb="0.5" />}
              alignSelf="center"
              my="12"
              border="1px"
              borderColor="blackAlpha.200"
              onClick={onClose}
            >
              The Shop
            </Button>
            <Flex flexDirection="column" gap="4">
              <Button as={NextLink} href="/auth?form=signin" size="sm" variant="outline" onClick={onClose}>
                Sign In
              </Button>
              <Button as={NextLink} href="/auth?form=signup" size="sm" onClick={onClose}>
                Create Account
              </Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter
            justifyContent="center"
            borderTop="1px"
            borderColor="blackAlpha.400"
            bgColor="blackAlpha.900"
            color="white"
            fontSize="sm"
          >
            <Copyright />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
