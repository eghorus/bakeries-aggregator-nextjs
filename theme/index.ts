import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./foundations/colors";
import radii from "./foundations/radii";
import typography from "./foundations/typography";
import { headingTheme } from "./components/heading";

const overrides = {
  styles,
  colors,
  radii,
  ...typography,
  components: {
    Heading: headingTheme,
  },
};

const theme = extendTheme(overrides, withDefaultColorScheme({ colorScheme: "primary" }));

export default theme;
