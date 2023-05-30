import { Product } from "@/models/Product";

/* Cart should include only products from the same bakery. */
type State = {
  bakeryId: string;
  products: Product[];
  addToCart: () => void;
  removeFromCart: () => void;
  emptyAndAddToCart: () => void;
  emptyCart: () => void;
};

type Action =
  | { type: "ADD_TO_CART"; payload: { product: Product } }
  | { type: "REMOVE_FROM_CART"; payload: { productId: string } }
  | { type: "EMPTY_AND_ADD_TO_CART"; payload: { product: Product } }
  | { type: "EMPTY_CART" };

export const initialState: State = {
  bakeryId: "",
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  emptyAndAddToCart: () => {},
  emptyCart: () => {},
};

export const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART":
      /* To not allow the user to add a product by a different bakery. */
      if (state.bakeryId !== action.payload.product.bakery) {
        return { ...state };
      } else {
        return {
          ...state,
          bakeryId: action.payload.product.bakery,
          products: [...state.products, action.payload.product],
        };
      }

    case "REMOVE_FROM_CART":
      return { ...state, products: state.products.filter((p) => p.id !== action.payload.productId) };

    case "EMPTY_AND_ADD_TO_CART":
      return {
        ...state,
        bakeryId: action.payload.product.bakery,
        products: [action.payload.product],
      };

    case "EMPTY_CART":
      return { ...initialState };

    default:
      return { ...state };
  }
};
