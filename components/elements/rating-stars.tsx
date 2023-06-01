import { chakra, Flex, HStack, Icon } from "@chakra-ui/react";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

type RatingStarsProps = {
  ratingVal: number;
  ratingQty?: number;
};

const RatingStars = ({ ratingVal, ratingQty }: RatingStarsProps) => {
  const roundedRatingVal = +(Math.round(ratingVal * 2) / 2).toFixed(1);
  const totalStarsCount = 5;
  const filledStarsCount = Math.floor(roundedRatingVal);
  const halfFilledStarCount = Math.ceil(roundedRatingVal - filledStarsCount);
  const emptyStarsCount = totalStarsCount - filledStarsCount - halfFilledStarCount;

  return (
    <Flex flexWrap="wrap" alignItems="flex-end" columnGap="2" rowGap="2.5" fontSize="xs" lineHeight="1">
      <chakra.span
        minW="6"
        borderRadius="xl"
        px="1"
        py="1.5"
        bgColor={roundedRatingVal > 1 ? "red.500" : "red.200"}
        color="white"
        fontWeight="medium"
        textAlign="center"
      >
        {roundedRatingVal}
      </chakra.span>
      <HStack spacing="0">
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
      {ratingQty && (
        <chakra.span color="blackAlpha.600">
          ({ratingQty} rating{ratingQty > 1 && "s"})
        </chakra.span>
      )}
    </Flex>
  );
};

export default RatingStars;
