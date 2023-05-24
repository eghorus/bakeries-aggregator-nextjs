import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const baseStyle = defineStyle({
  fontFamily: "heading",
  fontWeight: "bold",
});

const sizes = {
  h1: defineStyle({
    fontSize: ["3xl", null, "4xl"],
    lineHeight: 1,
  }),
  h2: defineStyle({
    fontSize: ["2xl", null, "3xl"],
    lineHeight: 1,
  }),
  h3: defineStyle({
    fontSize: ["xl", null, "2xl"],
    lineHeight: [1.2, null, 1],
  }),
  h4: defineStyle({
    fontSize: ["lg", null, "xl"],
    lineHeight: [1.33, null, 1.2],
  }),
  h5: defineStyle({
    fontSize: ["md", null, "lg"],
    lineHeight: [1.33, null, 1.2],
  }),
  h6: defineStyle({
    fontSize: ["sm", null, "md"],
    lineHeight: [1.33, null, 1.2],
  }),
};

export const headingTheme = defineStyleConfig({
  baseStyle,
  sizes,
  defaultProps: {
    size: "h2",
  },
});
