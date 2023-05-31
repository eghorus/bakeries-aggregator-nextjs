import { CartProduct } from "./CartProduct";
import { Bakery } from "./Bakery";

export type OrderType = {
  id: string;
  date: string;
  products: CartProduct[];
  isCompleted: boolean;
  rating: number;
  bakery: Bakery;
  user: string;
};
