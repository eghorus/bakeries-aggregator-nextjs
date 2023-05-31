import { useContext, useEffect } from "react";
import { chakra } from "@chakra-ui/react";
import { AuthContext } from "@/store/auth-context";
import { CurrentUserContext } from "@/store/current-user-context";

export default function SignOutPage() {
  const { removeAuthToken } = useContext(AuthContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    removeAuthToken();
    setCurrentUser(null);
    window.location.replace("/");
  }, [removeAuthToken, setCurrentUser]);

  return (
    <chakra.p mt="16" fontSize="lg" fontWeight="bold" textAlign="center">
      See You Soon! 👋
    </chakra.p>
  );
}
