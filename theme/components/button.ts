import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
import { mode } from "@chakra-ui/theme-tools";

const variantSolid = defineStyle((props) => {
  const { colorScheme: c } = props;

  const background = mode(`${c}.500`, `${c}.200`)(props);
  const backgroundHover = mode(`${c}.200`, `${c}.500`)(props);
  const backgroundActive = mode(`${c}.100`, `${c}.600`)(props);
  const color = mode("white", `${c}.900`)(props);
  const colorHover = mode(`${c}.900`, "white")(props);

  return {
    border: "2px solid transparent",
    bg: background,
    color: color,
    _hover: {
      borderColor: colorHover,
      bg: backgroundHover,
      color: colorHover,
    },
    _active: {
      bg: backgroundActive,
    },
  };
});

export const buttonTheme = defineStyleConfig({
  variants: {
    solid: variantSolid,
  },
});
