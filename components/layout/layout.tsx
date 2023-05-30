import { useContext, useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "@/store/auth-context";
import { CurrentUserContext } from "@/store/current-user-context";
import useModal from "@/hooks/use-modal";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { authToken, authUserId } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { ModalComponent: Modal, handleOpenModal } = useModal();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
          headers: { Authorization: `Bearer ${authToken}` },
        });
        const { data } = response.data;
        setCurrentUser(data.user);
      } catch (error) {
        handleOpenModal({ error });
      }
    };

    if (authToken && authUserId) getCurrentUser();
  }, [authToken, authUserId, setCurrentUser, handleOpenModal]);

  return (
    <>
      <Grid gridTemplateRows="auto 1fr auto" minH="100vh">
        <Header />
        <Box as="main" w="full" maxW="container.xl" mx="auto" px="6" py="2">
          {children}
        </Box>
        <Footer />
      </Grid>

      <Modal />
    </>
  );
};

export default Layout;
