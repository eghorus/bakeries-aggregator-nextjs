import { createContext, useReducer } from "react";
import { CartProduct } from "@/models/CartProduct";
import { Bakery } from "@/models/Bakery";
import { CartState, cartReducer, initialState } from "./cart-reducer";

type ContextValue = CartState & {
  addToCart: (product: CartProduct, bakery: Bakery) => void;
  removeFromCart: (productId: string) => void;
  resetCart: () => void;
};

const initialContext: ContextValue = {
  bakery: null,
  products: {},
  addToCart: (product, bakery) => {},
  removeFromCart: (productId) => {},
  resetCart: () => {},
};

export const CartContext = createContext(initialContext);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const { bakery, products } = cartState;

  const handleAddToCart = (product: CartProduct, bakery: Bakery) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, bakery } });
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const handleEmptyCart = () => {
    dispatch({ type: "RESET_CART" });
  };

  const contextValue: ContextValue = {
    bakery,
    products,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    resetCart: handleEmptyCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
