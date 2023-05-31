import { useContext, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { AuthContext } from "@/store/auth-context";

type CompleteOrderModalProps = {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
};

const completeOrderFetcher = async ([path, authToken]: [string, string], { arg }: { arg: { rating: number } }) => {
  const res = await axios({
    method: "PATCH",
    url: `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    headers: { Authorization: `Bearer ${authToken}` },
    data: { isCompleted: true, rating: arg.rating },
  });
  return res.data.data;
};

const CompleteOrderModal = ({ orderId, isOpen, onClose }: CompleteOrderModalProps) => {
  const { authToken } = useContext(AuthContext);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [ratingValue, setRatingValue] = useState("");
  const { trigger, isMutating } = useSWRMutation([`/orders/${orderId}`, authToken], completeOrderFetcher);
  const { mutate } = useSWRConfig();

  const onConfirm = async () => {
    if (!ratingValue) {
      window.alert("Please rate your order first.");
      return;
    }
    await trigger({ rating: +ratingValue });
    onClose();
    mutate(["/users/account", authToken]);
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Thank You! Enjoy Your Bakes.
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text mb="2">Rate your order.</Text>
            <RadioGroup value={ratingValue} onChange={setRatingValue} fontWeight="medium">
              <HStack spacing="4">
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
              </HStack>
            </RadioGroup>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="blackAlpha" ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button ml={4} isLoading={isMutating} onClick={onConfirm}>
              Complete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CompleteOrderModal;
