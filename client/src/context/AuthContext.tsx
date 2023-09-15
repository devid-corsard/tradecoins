import { Dispatch, ReactNode, createContext, useState } from "react";

type AuthState = {
    authorized: boolean;
    username: string;
};

type AuthContextType = {
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

type Props = { children: ReactNode };

export const AuthContextProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<AuthState>(INITIAL_AUTH);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
