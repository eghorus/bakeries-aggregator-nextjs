import { useContext } from "react";
import NextLink from "next/link";
import { Avatar, Button, Icon, chakra } from "@chakra-ui/react";
import { MdLogout, MdOutlineReceiptLong } from "react-icons/md";
import { CurrentUserContext } from "@/store/current-user-context";

type SideDrawerNavigationItemsProps = {
  onSideDrawerClose: () => void;
};

const SideDrawerNavigationItems = ({ onSideDrawerClose }: SideDrawerNavigationItemsProps) => {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser ? (
    <>
      <Avatar name={currentUser.name} src={currentUser.image?.src} mb="2" p="5" bg="primary.500" color="white" />
      <chakra.span mb="4" fontWeight="medium">
        {currentUser.name}
      </chakra.span>
      <Button
        as={NextLink}
        href="/my-orders"
        variant="outline"
        leftIcon={<Icon as={MdOutlineReceiptLong} boxSize="5" />}
        w="full"
        mb="auto"
        onClick={onSideDrawerClose}
      >
        My Orders
      </Button>
      <Button
        as={NextLink}
        href="/signout"
        variant="ghost"
        leftIcon={<Icon as={MdLogout} boxSize="5" />}
        onClick={onSideDrawerClose}
      >
        Sign Out
      </Button>
    </>
  ) : (
    <>
      <Button as={NextLink} href="/auth?form=signin" size="sm" variant="outline" onClick={onSideDrawerClose}>
        Sign In
      </Button>
      <Button as={NextLink} href="/auth?form=signup" size="xs" onClick={onSideDrawerClose}>
        Create Account
      </Button>
    </>
  );
};

export default SideDrawerNavigationItems;
