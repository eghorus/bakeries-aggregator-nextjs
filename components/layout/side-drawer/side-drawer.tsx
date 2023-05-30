import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import Logo from "../logo";
import SideDrawerNavigationItems from "./side-drawer-navigation-items";

type SideDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SideDrawer = ({ isOpen, onClose }: SideDrawerProps) => {
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader display="flex">
            <Logo />
            <IconButton
              aria-label="Close drawer"
              icon={<MdClose fontSize="1rem" />}
              colorScheme="blackAlpha"
              size="xs"
              variant="outline"
              borderColor="blackAlpha.300"
              borderRadius="full"
              onClick={onClose}
            />
          </DrawerHeader>

          <DrawerBody display="flex" flexDirection="column" alignItems="center" mt="16">
            <SideDrawerNavigationItems onSideDrawerClose={onClose} />
          </DrawerBody>

          <DrawerFooter
            justifyContent="center"
            borderTop="1px"
            borderColor="blackAlpha.400"
            bgColor="blackAlpha.900"
            color="white"
            fontSize="sm"
          >
            <p>© Bakeries Aggregator, 2023</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
