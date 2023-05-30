import { useContext } from "react";
import { useRouter } from "next/router";
import { Button, chakra } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { AuthContext } from "@/app-state/auth-context";
import useAuthForm, { FormData } from "./use-auth-form";
import useModal from "@/hooks/use-modal";
import Input from "./input";

type AuthFormProps = {
  type: "signin" | "signup";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const { storeAuthToken } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit, reset, isSubmitting, errors, modifiedFields, DevToolDrawer } = useAuthForm(type);
  const { ModalComponent: Modal, setModalState } = useModal();

  const handleSignUp: SubmitHandler<FormData> = async (data) => {
    const { name, email, password } = data;
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        data: { name, email, password },
      });
      reset();
      setModalState({
        isModalOpen: true,
        status: "success",
        heading: "Account Created!",
        body: response.data.message,
      });
    } catch (error) {
      setModalState({
        isModalOpen: true,
        status: "error",
        heading: "Error",
        body: error instanceof AxiosError ? error.response?.data?.message : "Something went wrong. Please try again.",
      });
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
      storeAuthToken(response.data.data.accessToken);
      reset();
      router.push("/");
    } catch (error) {
      setModalState({
        isModalOpen: true,
        status: "error",
        heading: "Error",
        body: error instanceof AxiosError ? error.response?.data?.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <chakra.form display="flex" flexDirection="column" gap="6" w="full" noValidate>
        {type === "signup" && (
          <Input
            type="text"
            label="Full Name"
            isModified={Boolean(modifiedFields.name)}
            registerProps={register("name")}
            error={errors.name}
          />
        )}

        <Input
          type="text"
          label="Email"
          isModified={Boolean(modifiedFields.email)}
          registerProps={register("email")}
          error={errors.email}
        />

        <Input
          type="password"
          label="Password"
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

      <Modal />

      <DevToolDrawer />
    </>
  );
};

export default AuthForm;
