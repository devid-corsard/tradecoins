import { ReactNode, createContext, useReducer } from "react";
import { AuthContextType } from "../types/AuthContextType";
import User from "../types/User";
import { AuthActions, AuthActionsEnum } from "../types/AuthActions";
import { INITIAL_USER } from "./inits";

export const AuthContext = createContext<AuthContextType>({
  user: INITIAL_USER,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

type Props = { children: ReactNode };

export const AuthContextProvider = ({ children }: Props) => {
  const userReducer = (state: User, action: AuthActions): User => {
    switch (action.type) {
      case AuthActionsEnum.Logout:
        return INITIAL_USER;
      case AuthActionsEnum.Login:
        if (action.payload.login === "test")
          return { name: action.payload.login, id: "testId" };
        return INITIAL_USER;
      case AuthActionsEnum.Register:
        return { name: action.payload.login, id: crypto.randomUUID() };
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
