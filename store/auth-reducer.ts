export type State = {
  authToken: string;
  authTokenExp: number;
  authUserId: string | null;
};

type Action =
  | { type: "STORE_TOKEN"; payload: { authToken: string; authTokenExp: number; authUserId: string } }
  | { type: "REMOVE_TOKEN" };

export const initialState: State = {
  authToken: "",
  authTokenExp: 0,
  authUserId: null,
};

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "STORE_TOKEN":
      return {
        ...state,
        authToken: action.payload.authToken,
        authTokenExp: action.payload.authTokenExp,
        authUserId: action.payload.authUserId,
      };

    case "REMOVE_TOKEN":
      return initialState;

    default:
      return state;
  }
};
