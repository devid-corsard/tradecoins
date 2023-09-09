import {
    Dispatch,
    ReactNode,
    createContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import User from "../types/User";
import { AuthActions, AuthActionsEnum } from "./AuthActions";
import authRequests from "../requests/auth";

export const INITIAL_USER: User = { name: "guest", id: "" };

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

/////////////////////////// new fresh and simple implementation
type AuthState = {
    authorized: boolean;
    username: string;
};

export type AuthContextType = {
    auth: AuthState;
    setAuth: Dispatch<React.SetStateAction<AuthState>>;
};

const INITIAL_AUTH: AuthState = {
    authorized: false,
    username: "guest",
};

export const AuthContext = createContext<AuthContextType>({
    auth: INITIAL_AUTH,
    setAuth: () => {},
});

async function getUser<TResponse>(): Promise<TResponse | undefined> {
    try {
        const response = await fetch("/api/user/info", { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const user = await response.json();
        const currentUser = {
            name: user.username,
            id: user.user_id,
        };
        return currentUser as TResponse;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
export const AuthContextProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<AuthState>(INITIAL_AUTH);
    useEffect(() => {
        getUser<User>().then((user) => {
            console.log("use effect: ", user);
            if (user) setAuth({ authorized: true, username: user.name });
        });
    }, [auth.authorized]);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
