import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import * as yup from "yup";

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

  type FormDataType = yup.InferType<typeof schema>;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormDataType>({
    defaultValues,
    delayError: 500,
    resolver: yupResolver(schema),
  });

  const submitData: SubmitHandler<FormDataType> = (data) => console.log(data);

  const DevToolDrawer = () => <DevTool control={control} />;

  return { register, handleFormSubmit: handleSubmit(submitData), errors, modifiedFields: dirtyFields, DevToolDrawer };
};

export default useAuthForm;
