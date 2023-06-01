import Image from "next/image";
import { Avatar, Box, chakra, Flex, HStack, Heading } from "@chakra-ui/react";
import { getImageUrl } from "@/helpers/url";
import RatingStars from "../elements/rating-stars";

type HeaderProps = {
  title: string;
  images: {
    logo: string;
    cover: string;
  };
  categories: string[];
  ratingAvg: number;
  ratingQty: number;
};

const Header = ({ categories, images, ratingAvg, ratingQty, title }: HeaderProps) => {
  const coverImgSrc = getImageUrl(images.cover);
  const logoImgSrc = getImageUrl(images.logo);

  return (
    <chakra.header>
      <Box position="relative" w="full" h="44" overflow="hidden" borderTopRadius="xl">
        <Image src={coverImgSrc} alt={title} fill style={{ objectFit: "cover" }} />
      </Box>

      <Box px="6" py="4">
        <Flex gap="6" alignItems="flex-start">
          <Avatar
            src={logoImgSrc}
            name={title}
            size="xl"
            position="relative"
            transform="translateY(-2rem)"
            outline="0.5rem solid"
            outlineColor="white"
            _before={{
              content: "''",
              position: "absolute",
              zIndex: "-1",
              w: "calc(100% + 0.5rem)",
              h: "calc(100% + 0.5rem)",
              bgColor: "white",
              borderRadius: "full",
            }}
          />

          <Flex flexDirection="column" gap="2">
            <Heading as="h2" size="h2">
              {title}
            </Heading>
            <HStack flexWrap="wrap" mb="1">
              {categories.map((c, i) => (
                <Box
                  key={i}
                  as="span"
                  borderRadius="xl"
                  px="1.5"
                  py="0.5"
                  bgColor="blackAlpha.50"
                  color="blackAlpha.600"
                  fontSize="sm"
                >
                  {c}
                </Box>
              ))}
            </HStack>
            <RatingStars ratingVal={ratingAvg} ratingQty={ratingQty} />
          </Flex>
        </Flex>
      </Box>
    </chakra.header>
  );
};

export default Header;
