import { Box, Grid } from "@chakra-ui/react";
import Header from "./header";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Grid gridTemplateRows="auto 1fr auto" minH="100vh">
      <Header />
      <Box as="main" w="full" maxW="container.xl" mx="auto" px="6" py="12">
        {children}
      </Box>
      <Footer />
    </Grid>
  );
}
