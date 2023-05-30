import { createContext, useReducer } from "react";
import { Product } from "@/models/Product";
import { cartReducer, initialState } from "./cart-reducer";

type ContextValue = {
  products: Product[];
  addToCart: () => void;
  removeFromCart: () => void;
  emptyAndAddToCart: () => void;
  emptyCart: () => void;
};

const initialContext: ContextValue = {
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  emptyAndAddToCart: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialContext);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const { products, addToCart, removeFromCart, emptyAndAddToCart, emptyCart } = cartState;

  const contextValue: ContextValue = {
    products,
    addToCart,
    removeFromCart,
    emptyAndAddToCart,
    emptyCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
