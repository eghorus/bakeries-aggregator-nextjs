import { Bakery } from "@/models/Bakery";
import { CartProduct } from "@/models/CartProduct";

/* Cart should include only products from the same bakery. */
export type CartState = {
  bakery: Bakery | null;
  products: { [key: string]: CartProduct };
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: CartProduct; bakery: Bakery } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | { type: "RESET_CART" };

export const initialState: CartState = {
  bakery: null,
  products: {},
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      /* To not allow the user to add a product by a different bakery. */
      if (state.bakery && state.bakery.id !== action.payload.product.bakery) {
        return state;
      }
      /* If the product already exists in the cart, just increment the quantity property if it is below 10. */
      if (state.products[action.payload.product.id]) {
        let newQuantity = state.products[action.payload.product.id].quantity + action.payload.product.quantity;
        if (newQuantity > 10) newQuantity = 10;
        return {
          ...state,
          products: {
            ...state.products,
            [action.payload.product.id]: { ...state.products[action.payload.product.id], quantity: newQuantity },
          },
        };
      }
      return {
        ...state,
        bakery: action.payload.bakery,
        products: { ...state.products, [action.payload.product.id]: action.payload.product },
      };

    case "REMOVE_FROM_CART":
      if (state.products[action.payload.productId]) {
        delete state.products[action.payload.productId];
      }
      return { ...state };

    case "RESET_CART":
      return { ...initialState };

    default:
      return state;
  }
};
