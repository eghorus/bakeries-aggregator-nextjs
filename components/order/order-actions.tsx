import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import CompleteOrderModal from "./complete-order-modal";
import CancelOrderModal from "./cancel-order-modal";

type OrderActionsProps = {
  orderId: string;
};

const OrderActions = ({ orderId }: OrderActionsProps) => {
  const {
    isOpen: isCompOrderModalOpen,
    onOpen: onCompOrderModalOpen,
    onClose: onCompOrderModalClose,
  } = useDisclosure();
  const {
    isOpen: isCnclOrderModalOpen,
    onOpen: onCnclOrderModalOpen,
    onClose: onCnclOrderModalClose,
  } = useDisclosure();

  return (
    <>
      <HStack>
        <Button size="sm" variant="ghost" onClick={onCompOrderModalOpen}>
          Mark Completed
        </Button>
        <Button colorScheme="blackAlpha" size="sm" variant="ghost" onClick={onCnclOrderModalOpen}>
          Cancel Order
        </Button>
      </HStack>

      <CompleteOrderModal orderId={orderId} isOpen={isCompOrderModalOpen} onClose={onCompOrderModalClose} />
      <CancelOrderModal orderId={orderId} isOpen={isCnclOrderModalOpen} onClose={onCnclOrderModalClose} />
    </>
  );
};

export default OrderActions;
