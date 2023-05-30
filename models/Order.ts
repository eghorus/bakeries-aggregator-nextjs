import { Product } from "./Product";
import { Bakery } from "./Bakery";

export type Order = {
  date: Date;
  products: Product[];
  isCompleted: boolean;
  rating: number;
  user: string;
  bakery: Bakery;
};
