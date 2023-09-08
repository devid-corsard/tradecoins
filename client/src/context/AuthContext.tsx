import { Dispatch, ReactNode, createContext, useReducer } from "react";
import User from "../types/User";
import { AuthActions, AuthActionsEnum } from "./AuthActions";
import authRequests from "../requests/auth";

export type AuthContextType = {
  user: User;
  dispatch: Dispatch<AuthActions>;
};

export const INITIAL_USER: User = { name: "guest", id: "" };

export const AuthContext = createContext<AuthContextType>({
  user: INITIAL_USER,
  dispatch: () => {},
});

type Props = { children: ReactNode };

export const AuthContextProvider = ({ children }: Props) => {
  const userReducer = (state: User, action: AuthActions): User => {
    switch (action.type) {
      case AuthActionsEnum.Logout:
        authRequests[action.type]();
        return INITIAL_USER;
      case AuthActionsEnum.Login:
        authRequests[action.type](action.payload);
        if (action.payload.username === "test")
          return { name: action.payload.username, id: "testId" };
        return INITIAL_USER;
      case AuthActionsEnum.Register:
        authRequests[action.type](action.payload);
        return { name: action.payload.username, id: crypto.randomUUID() };
      default:
        return state;
    }
  };

  const [user, dispatch] = useReducer(userReducer, INITIAL_USER);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
