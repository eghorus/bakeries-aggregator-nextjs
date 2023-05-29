import Image from "next/image";
import { Box, chakra, Flex, Icon, IconButton } from "@chakra-ui/react";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { Product } from "@/models/Product";
import { getImageUrl } from "@/helpers/url";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, bakery, category, image, price, title } = product;
  const imageUrl = getImageUrl(image);

  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      w="150px"
      overflow="hidden"
      border="1px"
      borderColor="blackAlpha.200"
      borderRadius="lg"
    >
      <Box position="relative" w="150px" h="225px">
        <Image src={imageUrl} alt={title} fill style={{ objectFit: "contain" }} />
      </Box>
      <Flex flexGrow="1" flexDirection="column" justifyContent="space-between" gap="2" p="2" pb="4">
        <chakra.span fontWeight="semibold">{title}</chakra.span>
        <Flex justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <chakra.span color="secondary.700" fontWeight="medium">
            {price} EGP
          </chakra.span>
          <IconButton aria-label="Add to shopping cart" icon={<Icon as={RiShoppingBasket2Line} boxSize="6" />} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
