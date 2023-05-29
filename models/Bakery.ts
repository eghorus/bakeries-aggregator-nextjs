import { Product } from "./Product";

export type Bakery = {
  id: string;
  title: string;
  images: {
    logo: string;
    cover: string;
  };
  ratingAvg: number;
  ratingQty: number;
  products: Product[];
};
