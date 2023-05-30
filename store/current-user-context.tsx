import { createContext, useState } from "react";
import { User } from "@/models/User";

type ContextValue = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

const initialContext: ContextValue = {
  currentUser: null,
  setCurrentUser: () => {},
};

export const CurrentUserContext = createContext(initialContext);

export const CurrentUserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const contextValue = {
    currentUser,
    setCurrentUser,
  };

  return <CurrentUserContext.Provider value={contextValue}>{children}</CurrentUserContext.Provider>;
};
