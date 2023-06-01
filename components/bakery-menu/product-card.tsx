import Image from "next/image";
import { Box, chakra, Flex } from "@chakra-ui/react";
import { Product } from "@/models/Product";
import { Bakery } from "@/models/Bakery";
import { getImageUrl } from "@/helpers/url";
import AddToCartButton from "./add-to-cart-button";

type ProductCardProps = {
  product: Product;
  bakery: Bakery;
};

const ProductCard = ({ product, bakery }: ProductCardProps) => {
  const { image, price, title } = product;
  const imageUrl = getImageUrl(image);

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      w="170px"
      overflow="hidden"
      border="2px"
      borderColor="blackAlpha.300"
      borderRadius="lg"
      bgColor="white"
      transitionDuration="normal"
      _hover={{
        boxShadow: "md",
        borderColor: "secondary.600",
      }}
    >
      <Box position="relative" w="170px" h="170px">
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "cover" }} />
      </Box>
      <Flex flexGrow="1" flexDirection="column" justifyContent="space-between" gap="2" p="2">
        <chakra.span fontWeight="bold">{title}</chakra.span>
        <chakra.span mb="2" color="secondary.600" fontWeight="medium">
          {price} EGP
        </chakra.span>
        <AddToCartButton product={product} bakery={bakery} />
      </Flex>
    </Flex>
  );
};

export default ProductCard;
