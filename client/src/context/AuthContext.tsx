import { ReactNode, createContext, useReducer } from "react";
import { AuthContextType } from "../types/AuthContextType";
import User from "../types/User";
import { AuthActions, AuthActionsEnum } from "../types/AuthActions";
import { INITIAL_USER } from "./inits";
import axios from "axios";

export const AuthContext = createContext<AuthContextType>({
  user: INITIAL_USER,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => { },
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
        try {
          const req = async () => {
            const data = new URLSearchParams();
            data.append("name", action.payload.login);
            data.append("password", action.payload.password);
            const res = await axios.post(
              "http://127.0.0.1:8080/register",
              data,
            );
            console.log(res);
          };
          req();
        } catch (err) {
          console.log(err);
        }
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
