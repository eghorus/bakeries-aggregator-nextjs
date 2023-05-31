import { useContext } from "react";
import Head from "next/head";
import { chakra, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import useSWR from "swr";
import axios from "axios";
import { AuthContext } from "@/store/auth-context";
import { OrderType } from "@/models/Order";
import Order from "@/components/order/order";

const getUserAccount = async ([path, authToken]: [string, string]) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  const res = await axios({ method: "GET", url, headers: { Authorization: `Bearer ${authToken}` } });
  return res.data.data.user;
};

export default function MyOrders() {
  const { authToken } = useContext(AuthContext);
  const { data: user, error, isLoading } = useSWR(["/users/account", authToken], getUserAccount);

  if (error) return <div>Failed to load...</div>;

  return (
    <>
      <Head>
        <title>My Orders | Bakeries Aggregator</title>
      </Head>

      <chakra.section maxW="container.md" mx="auto" my="6">
        <Heading as="h2" size="h2" mb="4">
          My Orders
        </Heading>
        <Text mb="4" color="blackAlpha.700">
          Please mark active orders as completed after collecting it from the bakery shop.
        </Text>
        <Text mb="4" color="secondary.700" fontSize="sm">
          Click on each order to expand order details.
        </Text>

        <Skeleton isLoaded={!isLoading && user}>
          <Flex flexDirection="column-reverse">
            {user && user.orders.map((o: OrderType) => <Order key={o.id} order={o} />)}
          </Flex>
        </Skeleton>
      </chakra.section>
    </>
  );
}
