import Image from "next/image";
import { Avatar, Box, chakra, Flex, HStack, Heading } from "@chakra-ui/react";
import RatingStars from "./rating-stars";

type HeaderProps = {
  categories: string[];
  images: {
    logo: string;
    cover: string;
  };
  title: string;
};

const Header = ({ categories, images, title }: HeaderProps) => {
  const coverImgSrc = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${images.cover}`;
  const logoImgSrc = `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/${images.logo}`;

  return (
    <chakra.header>
      <Box position="relative" w="full" h="40" overflow="hidden" borderTopRadius="xl">
        <Image src={coverImgSrc} alt={title} fill style={{ objectFit: "cover" }} />
      </Box>

      <Box px="6" py="3">
        <Flex gap="6" alignItems="flex-start" borderBottom="1px" borderColor="blackAlpha.100" pb="3">
          <Avatar
            name={title}
            src={logoImgSrc}
            size="xl"
            position="relative"
            transform="translateY(-2rem)"
            outline="0.5rem solid"
            outlineColor="bg"
            _before={{
              content: "''",
              position: "absolute",
              zIndex: "-1",
              w: "calc(100% + 0.5rem)",
              h: "calc(100% + 0.5rem)",
              bgColor: "bg",
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
                  bgColor="gray.200"
                  color="blackAlpha.600"
                  fontSize="sm"
                >
                  {c}
                </Box>
              ))}
            </HStack>
            <HStack>
              <RatingStars ratingAvg={2.5} ratingQty={0} />
            </HStack>
          </Flex>
        </Flex>
      </Box>
    </chakra.header>
  );
};

export default Header;
