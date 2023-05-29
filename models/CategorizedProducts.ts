import { Product } from "./Product";

export type CategorizedProducts = {
  [key: string]: Product[];
};
