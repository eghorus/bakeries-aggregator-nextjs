import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const typography = {
  fonts: {
    poppins: poppins.style.fontFamily,
    heading: poppins.style.fontFamily,
    body: poppins.style.fontFamily,
  },
};

export default typography;
