import { useContext, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { AuthContext } from "@/store/auth-context";

type CancelOrderModalProps = {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
};

const cancelOrderFetcher = async ([path, authToken]: [string, string]) => {
  const res = await axios({
    method: "DELETE",
    url: `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return res.data.data;
};

const CancelOrderModal = ({ orderId, isOpen, onClose }: CancelOrderModalProps) => {
  const { authToken } = useContext(AuthContext);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { trigger, isMutating } = useSWRMutation([`/orders/${orderId}`, authToken], cancelOrderFetcher);
  const { mutate } = useSWRConfig();

  const onConfirm = async () => {
    await trigger();
    onClose();
    mutate(["/users/account", authToken]);
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Order Cancellation.
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text>Are you sure you want to cancel your order.</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="blackAlpha" ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button ml={4} isLoading={isMutating} onClick={onConfirm}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CancelOrderModal;
