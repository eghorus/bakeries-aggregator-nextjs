import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import CompleteOrderModal from "./complete-order-modal";
import CancelOrderModal from "./cancel-order-modal";

type OrderActionsProps = {
  orderId: string;
};

const OrderActions = ({ orderId }: OrderActionsProps) => {
  const { isOpen: isCompleteModalOpen, onOpen: onCompleteModalOpen, onClose: onCompleteModalClose } = useDisclosure();
  const { isOpen: isCancelModalOpen, onOpen: onCancelModalOpen, onClose: onCancelModalClose } = useDisclosure();

  return (
    <>
      <HStack>
        <Button size="sm" variant="ghost" onClick={onCompleteModalOpen}>
          Mark Completed
        </Button>
        <Button colorScheme="blackAlpha" size="sm" variant="ghost" onClick={onCancelModalOpen}>
          Cancel Order
        </Button>
      </HStack>

      <CompleteOrderModal orderId={orderId} isOpen={isCompleteModalOpen} onClose={onCompleteModalClose} />
      <CancelOrderModal orderId={orderId} isOpen={isCancelModalOpen} onClose={onCancelModalClose} />
    </>
  );
};

export default OrderActions;
