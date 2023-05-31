import { Box, chakra, Collapse, Flex, useDisclosure } from "@chakra-ui/react";
import { OrderType } from "@/models/Order";
import RatingStars from "../rating-stars";
import OrderDetailsGrid from "./order-details-grid";
import OrderActions from "./order-actions";

type OrderProps = {
  order: OrderType;
};

const Order = ({ order }: OrderProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const { bakery, date, isCompleted, products, rating } = order;
  const orderTotal = products.reduce((sum, item) => (sum += item.quantity * item.price), 0);

  return (
    <Box>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="6"
        w="full"
        mb="2"
        boxShadow="sm"
        border="1px"
        borderColor="blackAlpha.400"
        borderRadius="lg"
        p="4"
        bgColor="white"
        fontWeight="normal"
        cursor="pointer"
        onClick={onToggle}
      >
        <chakra.span>{new Date(date).toLocaleDateString("en-US", { dateStyle: "full" })}</chakra.span>
        <chakra.span>{bakery.title}</chakra.span>
        <chakra.span fontWeight="semibold">{orderTotal.toLocaleString()} EGP</chakra.span>
        {isCompleted ? <RatingStars ratingVal={rating} /> : <OrderActions />}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box mb="4" border="1px" borderColor="blackAlpha.200" borderRadius="md" p="4" bgColor="primary.50">
          <OrderDetailsGrid products={products} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default Order;
