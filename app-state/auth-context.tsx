import { createContext, useEffect, useReducer } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { State, authReducer, initialState } from "./auth-reducer";

type ContextValue = Omit<State, "authTokenExp"> & {
  storeAuthToken: (authToken: string) => void;
  removeAuthToken: () => void;
};

const initialContext: ContextValue = {
  authToken: "",
  authUserId: "",
  storeAuthToken: (authToken) => {},
  removeAuthToken: () => {},
};

export const AuthContext = createContext(initialContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const tokenStorageName = "BA_AG_NXT_AUTH";

  const handleStoreAuthToken = (authToken: string) => {
    /* Decode the token to get the user Id and expiration time from payload. */
    const decodedToken = jwtDecode<JwtPayload & { id: string }>(authToken);

    /* Store the token, expiration time, and user Id in authState. */
    dispatch({
      type: "STORE_TOKEN",
      payload: { authToken, authTokenExp: decodedToken.exp!, authUserId: decodedToken.id },
    });

    /* Persist the token in local storage. */
    localStorage.setItem(tokenStorageName, authToken);
  };

  const handleRemoveAuthToken = () => {
    /* Remove the token, expiration time, and user Id from authState. */
    dispatch({ type: "REMOVE_TOKEN" });

    /* Remove the token from local storage. */
    localStorage.removeItem(tokenStorageName);
  };

  useEffect(() => {
    /* On application first load, check if there is a token in local storage. */
    const localStoredAuthToken = localStorage.getItem(tokenStorageName);
    if (!localStoredAuthToken) return;

    /* Decode the token to get the user Id and expiration time from payload. */
    const decodedToken = jwtDecode<JwtPayload & { id: string }>(localStoredAuthToken);

    /* If the token hasn't expired store it in authState, else remove it. */
    if (decodedToken.exp! * 1000 > Date.now()) {
      handleStoreAuthToken(localStoredAuthToken);
    } else {
      handleRemoveAuthToken();
    }
  }, []);

  const contextValue: ContextValue = {
    authToken: authState.authToken,
    authUserId: authState.authUserId,
    storeAuthToken: handleStoreAuthToken,
    removeAuthToken: handleRemoveAuthToken,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
