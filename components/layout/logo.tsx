import NextLink from "next/link";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdBakeryDining, MdStar } from "react-icons/md";

export default function Logo() {
  return (
    <Flex as={NextLink} href="/" alignItems="center" gap="2.5">
      <Box
        overflowX="clip"
        overflowY="visible"
        position="relative"
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
      <Text color="secondary.600" fontSize="lg" fontWeight="semibold">
        The Bakeries Aggregator
      </Text>
    </Flex>
  );
}
