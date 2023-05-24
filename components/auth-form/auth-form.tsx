import { Button, chakra } from "@chakra-ui/react";
import useAuthForm from "./use-auth-form";
import Input from "../input";

type AuthFormProps = {
  type: "signin" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const { register, handleFormSubmit, errors, modifiedFields, DevToolDrawer } = useAuthForm(type);

  return (
    <>
      <chakra.form display="flex" flexDirection="column" gap="6" w="full" onSubmit={handleFormSubmit} noValidate>
        {type === "signup" && (
          <Input
            type="text"
            size="lg"
            label="Full Name"
            isModified={Boolean(modifiedFields.name)}
            registerProps={register("name")}
            error={errors.name}
          />
        )}

        <Input
          type="text"
          size="lg"
          label="Email"
          isModified={Boolean(modifiedFields.email)}
          registerProps={register("email")}
          error={errors.email}
        />

        <Input
          type="password"
          size="lg"
          label="Password"
          isModified={Boolean(modifiedFields.password)}
          registerProps={register("password")}
          error={errors.password}
        />

        {type === "signup" ? (
          <Button type="submit" size="lg">
            Create Account
          </Button>
        ) : (
          <Button type="submit" size="lg">
            Login
          </Button>
        )}
      </chakra.form>

      <DevToolDrawer />
    </>
  );
}
