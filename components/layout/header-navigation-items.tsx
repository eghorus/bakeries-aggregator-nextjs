import { useContext } from "react";
import NextLink from "next/link";
import {
  Avatar,
  Button,
  chakra,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { MdLogout, MdOutlineReceiptLong } from "react-icons/md";
import { CurrentUserContext } from "@/store/current-user-context";

const HeaderNavigationItems = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser ? (
    <Menu>
      <MenuButton>
        <Flex alignItems="center" gap="2">
          <chakra.span fontWeight="medium">{currentUser.name}</chakra.span>
          <Avatar name={currentUser.name} src={currentUser.image?.src} size="sm" p="5" bg="primary.500" color="white" />
          <Icon as={BiChevronDown} boxSize="5" ml="-1" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Account">
          <MenuItem as={NextLink} href="/my-orders" _hover={{ bgColor: "blackAlpha.100" }}>
            <Icon as={MdOutlineReceiptLong} mr="2" />
            <chakra.span fontSize="sm">My Orders</chakra.span>
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
