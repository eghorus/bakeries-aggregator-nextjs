import { Flex, chakra } from "@chakra-ui/react";
import Copyright from "./copyright";

export default function Footer() {
  return (
    <chakra.footer bgColor="blackAlpha.900" color="white" fontSize="sm">
      <Flex justifyContent="space-between" alignItems="center" maxW="container.xl" mx="auto" px="6" py="4">
        <Copyright />
      </Flex>
    </chakra.footer>
  );
}
