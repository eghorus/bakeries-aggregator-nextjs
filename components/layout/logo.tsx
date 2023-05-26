import NextLink from "next/link";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdBakeryDining, MdStar } from "react-icons/md";

export default function Logo() {
  return (
    <Flex as={NextLink} href="/" alignItems="center" gap="2.5">
      <Box
        flexShrink="0"
        overflowX="clip"
        overflowY="visible"
        position="relative"
        zIndex="1"
        _after={{
          content: '""',
          position: "absolute",
          left: "0",
          bottom: "-40%",
          zIndex: "-1",
          transform: "rotate(45deg)",
          boxSize: "12",
          bgColor: "primary.500",
        }}
      >
        <Flex flexDirection="column" alignItems="center" boxSize="12" bgColor="primary.500">
          <Icon as={MdBakeryDining} boxSize="10" color="white" />
          <Icon as={MdStar} boxSize="5" mt="-1" color="primary.100" />
        </Flex>
      </Box>
      <Text py="2" color="secondary.600" fontSize={{ md: "lg" }} fontWeight="semibold" lineHeight="1.2">
        The Bakeries Aggregator
      </Text>
    </Flex>
  );
}
