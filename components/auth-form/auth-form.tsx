import { useContext } from "react";
import { useRouter } from "next/router";
import { Button, chakra } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "@/store/auth-context";
import useAuthForm, { FormData } from "./use-auth-form";
import useConfirmModal from "@/hooks/use-confirm-modal";
import Input from "./input";

type AuthFormProps = {
  type: "signin" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const { storeAuthToken } = useContext(AuthContext);
  const router = useRouter();
  const { getValues, handleSubmit, register, reset, isSubmitting, errors, modifiedFields, DevToolDrawer } =
    useAuthForm(type);
  const { onOpen: onOpenConfirmModal, ConfirmModalComponent } = useConfirmModal();

  const handleSignUp: SubmitHandler<FormData> = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        data: { name, email, password },
      });
      const { message } = response.data;
      reset();
      onOpenConfirmModal({ heading: "Account Created", message });
    } catch (error) {
      onOpenConfirmModal({ error });
    }
  };

  const handleSignIn: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/signin`,
        data: { email, password },
      });
      const { data } = response.data;
      storeAuthToken(data.accessToken);
      reset();
      router.push("/");
    } catch (error) {
      onOpenConfirmModal({ error });
    }
  };

  return (
    <>
      <chakra.form display="flex" flexDirection="column" gap="6" w="full" noValidate>
        {type === "signup" && (
          <Input
            type="text"
            label="Full Name"
            val={getValues().name || ""}
            isModified={Boolean(modifiedFields.name)}
            registerProps={register("name")}
            error={errors.name}
          />
        )}

        <Input
          type="text"
          label="Email"
          val={getValues().email}
          isModified={Boolean(modifiedFields.email)}
          registerProps={register("email")}
          error={errors.email}
        />

        <Input
          type="password"
          label="Password"
          val={getValues().password}
          isModified={Boolean(modifiedFields.password)}
          registerProps={register("password")}
          error={errors.password}
        />

        {type === "signup" ? (
          <Button type="submit" isLoading={isSubmitting} py="5" onClick={handleSubmit(handleSignUp)}>
            Create Account
          </Button>
        ) : (
          <Button type="submit" isLoading={isSubmitting} py="5" onClick={handleSubmit(handleSignIn)}>
            Login
          </Button>
        )}
      </chakra.form>

      <ConfirmModalComponent />

      <DevToolDrawer />
    </>
  );
};

export default AuthForm;
