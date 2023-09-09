import {
    Dispatch,
    ReactNode,
    createContext,
    useReducer,
    useState,
} from "react";
import User from "../types/User";
import { AuthActions, AuthActionsEnum } from "./AuthActions";
import authRequests from "../requests/auth";

export type AuthContextType = {
    user: User;
    dispatch: Dispatch<AuthActions>;
    authorized: boolean;
    setAuthorized: Dispatch<React.SetStateAction<boolean>>;
};

export const INITIAL_USER: User = { name: "guest", id: "" };

export const AuthContext = createContext<AuthContextType>({
    user: INITIAL_USER,
    dispatch: () => {},
    authorized: false,
    setAuthorized: () => {},
});

const API = "/api";

type Props = { children: ReactNode };

const userReducer = (state: User, action: AuthActions): User => {
    switch (action.type) {
        case AuthActionsEnum.Logout:
            authRequests[action.type]();
            return INITIAL_USER;
        case AuthActionsEnum.Login:
            authRequests[action.type](action.payload);
            return { name: action.payload.username, id: "testId" };
        case AuthActionsEnum.Register:
            const data = new URLSearchParams();
            data.append("username", action.payload.username);
            data.append("password", action.payload.password);
            fetch(`${API}/register`, {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: data,
            });
            return { name: action.payload.username, id: crypto.randomUUID() };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: Props) => {
    const [user, dispatch] = useReducer(userReducer, INITIAL_USER);
    const [authorized, setAuthorized] = useState(false);
    return (
        <AuthContext.Provider
            value={{ user, dispatch, authorized, setAuthorized }}
        >
            {children}
        </AuthContext.Provider>
    );
};
