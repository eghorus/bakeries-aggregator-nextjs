import { chakra, Flex, HStack, Icon } from "@chakra-ui/react";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

type BakeryRatingStarsProps = {
  ratingAvg: number;
  ratingQty: number;
};

const BakeryRatingStars = ({ ratingAvg, ratingQty }: BakeryRatingStarsProps) => {
  const roundedRatingAvg = +(Math.round(ratingAvg * 2) / 2).toFixed(1);
  const totalStarsCount = 5;
  const filledStarsCount = Math.floor(roundedRatingAvg);
  const halfFilledStarCount = Math.ceil(roundedRatingAvg - filledStarsCount);
  const emptyStarsCount = totalStarsCount - filledStarsCount - halfFilledStarCount;

  return (
    <Flex alignItems="flex-end" flexWrap="wrap" columnGap="2" rowGap="4" fontSize="sm" lineHeight="1">
      <chakra.span
        minW="6"
        borderRadius="xl"
        px="1"
        py="1.5"
        bgColor={roundedRatingAvg > 1 ? "red.500" : "red.200"}
        color="white"
        fontWeight="medium"
        textAlign="center"
      >
        {roundedRatingAvg}
      </chakra.span>
      <HStack spacing="1">
        {Array(filledStarsCount)
          .fill(1)
          .map((_, i) => (
            <Icon key={i} as={MdStar} color="yellow.400" boxSize="5" />
          ))}
        {Array(halfFilledStarCount)
          .fill(1)
          .map((_, i) => (
            <Icon key={i} as={MdStarHalf} color="yellow.400" boxSize="5" />
          ))}
        {Array(emptyStarsCount)
          .fill(1)
          .map((_, i) => (
            <Icon key={i} as={MdStarOutline} color="blackAlpha.400" boxSize="5" />
          ))}
      </HStack>
      <chakra.span color="blackAlpha.600" fontSize="sm">
        ({ratingQty} rating{ratingQty > 1 && "s"})
      </chakra.span>
    </Flex>
  );
};

export default BakeryRatingStars;
