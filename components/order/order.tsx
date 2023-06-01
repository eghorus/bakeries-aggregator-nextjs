import { Box, chakra, Collapse, Flex, useDisclosure } from "@chakra-ui/react";
import { OrderType } from "@/models/Order";
import RatingStars from "../elements/rating-stars";
import OrderActions from "./order-actions";
import OrderDetailsGrid from "../elements/order-details-grid";

type OrderProps = {
  order: OrderType;
};

const Order = ({ order }: OrderProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { bakery, date, id, isCompleted, products, rating } = order;
  const orderTotal = products.reduce((sum, item) => (sum += item.quantity * item.price), 0);

  return (
    <Box>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        gap="6"
        w="full"
        mb="4"
        boxShadow="sm"
        border="1px"
        borderColor="blackAlpha.400"
        borderRadius="lg"
        p="4"
        bgColor="white"
        cursor="pointer"
        onClick={onToggle}
      >
        <chakra.span fontWeight="medium">
          {new Date(date).toLocaleDateString("en-US", { dateStyle: "full" })}
        </chakra.span>
        <chakra.span>{bakery.title}</chakra.span>
        <chakra.span fontWeight="semibold">{orderTotal.toLocaleString()} EGP</chakra.span>
        {isCompleted ? <RatingStars ratingVal={rating} /> : <OrderActions orderId={id} />}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <OrderDetailsGrid
          products={products}
          mb="4"
          border="1px"
          borderColor="blackAlpha.200"
          borderRadius="md"
          p="4"
          bgColor="primary.50"
        />
      </Collapse>
    </Box>
  );
};

export default Order;
