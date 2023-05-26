import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";

export type FormData = {
  name: string | undefined;
  email: string;
  password: string;
};

const useAuthForm = (formType: "signin" | "signup") => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const nameValidations = yup
    .string()
    .trim()
    .min(5, "Name must be 5 characters or more")
    .max(30, "Name must be 30 characters or less")
    .required("Name is required");
  const emailValidations = yup
    .string()
    .trim()
    .email("Email must be a valid email address")
    .required("Email is required");
  const passwordValidations = yup
    .string()
    .trim()
    .min(8, "Password must be 8 characters or more")
    .max(20, "Password must be 20 characters or less")
    .required("Password is required");

  const schema = yup.object({
    name: formType === "signup" ? nameValidations : yup.string().optional(),
    email: emailValidations,
    password: passwordValidations,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, dirtyFields },
  } = useForm<FormData>({
    defaultValues,
    delayError: 500,
    resolver: yupResolver(schema),
  });

  const DevToolDrawer = () => <DevTool control={control} />;

  return { register, handleSubmit, reset, isSubmitting, errors, modifiedFields: dirtyFields, DevToolDrawer };
};

export default useAuthForm;
