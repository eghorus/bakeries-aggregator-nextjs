import { useContext } from "react";
import { Button, HStack } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "@/store/auth-context";

const OrderActions = () => {
  const { authToken } = useContext(AuthContext);

  const completeOrder = async () => {
    const res = await axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };

  return (
    <HStack>
      <Button size="sm" variant="ghost">
        Mark Completed
      </Button>
      <Button colorScheme="blackAlpha" size="sm" variant="ghost">
        Cancel Order
      </Button>
    </HStack>
  );
};

export default OrderActions;
