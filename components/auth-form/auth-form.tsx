import { useState } from "react";
import { Button, chakra } from "@chakra-ui/react";
import { SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import useAuthForm, { FormData } from "./use-auth-form";
import Input from "./input";
import AuthResponseModal from "./auth-response-modal";

type AuthFormProps = {
  type: "signin" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const defaultModalState = { isModalOpen: false, heading: "", body: "" };
  const [modalState, setModalState] = useState(defaultModalState);
  const { register, handleSubmit, reset, isSubmitting, errors, modifiedFields, DevToolDrawer } = useAuthForm(type);

  const handleCloseModal = () => setModalState(defaultModalState);

  const handleSignUp: SubmitHandler<FormData> = async (data) => {
    const { name, email, password } = data;

    try {
      const res = await axios({ method: "POST", url: "/api/auth/signup", data: { name, email, password } });
      setModalState({ isModalOpen: true, heading: res.data.status, body: res.data.message });
      reset();
    } catch (error) {
      let status = "Error.";
      let message = "Something went wrong.";

      if (error instanceof AxiosError) {
        status = error.response?.data.status;
        message = error.response?.data.message;
      }

      setModalState({
        isModalOpen: true,
        heading: status,
        body: message,
      });
    }
  };

  return (
    <>
      <chakra.form
        display="flex"
        flexDirection="column"
        gap="6"
        w="full"
        onSubmit={handleSubmit(handleSignUp)}
        noValidate
      >
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
          <Button type="submit" isLoading={isSubmitting} py="5">
            Create Account
          </Button>
        ) : (
          <Button type="submit" isLoading={isSubmitting} py="5">
            Login
          </Button>
        )}
      </chakra.form>

      <AuthResponseModal
        isOpen={modalState.isModalOpen}
        onClose={handleCloseModal}
        heading={modalState.heading}
        body={modalState.body}
      />

      <DevToolDrawer />
    </>
  );
}
