import { chakra, HStack, Icon } from "@chakra-ui/react";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";

type RatingStarsProps = {
  ratingAvg: number;
  ratingQty: number;
};

const RatingStars = ({ ratingAvg, ratingQty }: RatingStarsProps) => {
  const roundedRatingAvg = +(Math.round(ratingAvg * 2) / 2).toFixed(1);
  const totalStarsCount = 5;
  const filledStarsCount = Math.floor(roundedRatingAvg);
  const halfFilledStarCount = Math.ceil(roundedRatingAvg - filledStarsCount);
  const emptyStarsCount = totalStarsCount - filledStarsCount - halfFilledStarCount;

  return (
    <HStack alignItems="flex-end" px="1" fontSize="sm">
      <chakra.span
        minW="8"
        borderRadius="2xl"
        p="1.5"
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
            <Icon key={i} as={MdStar} color="yellow.400" boxSize="6" />
          ))}
        {Array(halfFilledStarCount)
          .fill(1)
          .map((_, i) => (
            <Icon key={i} as={MdStarHalf} color="yellow.400" boxSize="6" />
          ))}
        {Array(emptyStarsCount)
          .fill(1)
          .map((_, i) => (
            <Icon key={i} as={MdStarOutline} color="blackAlpha.400" boxSize="6" />
          ))}
      </HStack>
      <chakra.span color="blackAlpha.600">
        ({ratingQty} rating{ratingQty > 1 && "s"})
      </chakra.span>
    </HStack>
  );
};

export default RatingStars;
