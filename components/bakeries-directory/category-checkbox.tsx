import { CheckboxProps, Flex, chakra, useCheckbox } from "@chakra-ui/react";

type CategoryCheckboxProps = CheckboxProps & {
  label: string;
};

const CategoryCheckbox = ({ label, ...checkBoxProps }: CategoryCheckboxProps) => {
  const { getCheckboxProps, getInputProps, getLabelProps, htmlProps, state } = useCheckbox(checkBoxProps);

  const checkedStyles = {
    borderColor: "primary.500",
    bgColor: "primary.50",
    color: "primary.600",
    fontWeight: "bold",
  };

  const unCheckedStyles = {
    borderColor: "blackAlpha.200",
    bgColor: "blackAlpha.50",
  };

  return (
    <chakra.label {...htmlProps}>
      <input {...getInputProps()} />
      <div {...getCheckboxProps()} />
      <Flex
        w="fit-content"
        border="2px"
        borderRadius="3xl"
        px="4"
        py="1"
        fontSize="sm"
        cursor="pointer"
        {...(state.isChecked ? checkedStyles : unCheckedStyles)}
        {...getLabelProps()}
      >
        {label}
      </Flex>
    </chakra.label>
  );
};

export default CategoryCheckbox;
