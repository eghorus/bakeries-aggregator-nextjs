import Image from "next/image";
import NextLink from "next/link";
import { Avatar, Box, Button, chakra, Flex } from "@chakra-ui/react";
import { Bakery } from "@/models/Bakery";
import { getImageUrl } from "@/helpers/url";
import BakeryRatingStars from "../bakery-view/bakery-rating-stars";

type BakeryCardProps = {
  bakery: Bakery & { categories: string[] };
};

const BakeryCard = ({ bakery }: BakeryCardProps) => {
  const { id, images, ratingAvg, ratingQty, title } = bakery;
  const coverImgUrl = getImageUrl(images.cover);
  const logoImgUrl = getImageUrl(images.logo);

  return (
    <Flex
      flexDirection="column"
      role="group"
      overflow="hidden"
      boxShadow="sm"
      border="1px"
      borderColor="blackAlpha.200"
      borderRadius="xl"
      bgColor="white"
      transitionDuration="slow"
      _hover={{
        borderColor: "primary.500",
      }}
    >
      <Box position="relative" maxW="18rem" h="11rem">
        <Image src={coverImgUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Box>

      <Flex flexGrow="1" px="4" py="2" gap="4">
        <Avatar src={logoImgUrl} name={title} size="lg" showBorder />
        <Flex flexDirection="column" gap="2">
          <chakra.span fontWeight="bold" transitionDuration="slow" _groupHover={{ color: "primary.500" }}>
            {title}
          </chakra.span>
          <BakeryRatingStars ratingAvg={ratingAvg} ratingQty={ratingQty} />
        </Flex>
      </Flex>

      <Box p="4">
        <Button as={NextLink} href={`/bakeries/${id}`} size="sm" variant="outline" w="full">
          View Menu
        </Button>
      </Box>
    </Flex>
  );
};

export default BakeryCard;
