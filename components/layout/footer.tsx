import { Flex, chakra } from "@chakra-ui/react";

const Footer = () => {
  return (
    <chakra.footer bgColor="blackAlpha.900" color="white" fontSize="sm">
      <Flex justifyContent="space-between" alignItems="center" maxW="container.xl" mx="auto" px="6" py="4">
        <p>© Bakeries Aggregator, 2023</p>
      </Flex>
    </chakra.footer>
  );
};

export default Footer;
