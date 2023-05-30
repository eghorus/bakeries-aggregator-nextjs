import { createContext, useReducer } from "react";
import { CartProduct } from "@/models/CartProduct";
import { CartState, cartReducer, initialState } from "./cart-reducer";

type ContextValue = CartState & {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  emptyCart: () => void;
};

const initialContext: ContextValue = {
  bakeryId: "",
  products: {},
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialContext);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);
  const { bakeryId, products } = cartState;

  const handleAddToCart = (product: CartProduct) => {
    dispatch({ type: "ADD_TO_CART", payload: { product } });
  };

  const handleRemoveFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const handleEmptyCart = () => {
    dispatch({ type: "EMPTY_CART" });
  };

  const contextValue: ContextValue = {
    bakeryId,
    products,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    emptyCart: handleEmptyCart,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
