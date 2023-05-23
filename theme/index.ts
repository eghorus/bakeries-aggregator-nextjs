import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./foundations/colors";
import typography from "./foundations/typography";

const overrides = {
  styles,
  colors,
  ...typography,
};

const theme = extendTheme(overrides, withDefaultColorScheme({ colorScheme: "primary" }));

export default theme;
