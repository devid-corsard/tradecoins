import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { Credentials } from "../types/Credentials";

async function loginRequest<TResponse>(
    credentials: Credentials
): Promise<TResponse | undefined> {
    try {
        const data = new URLSearchParams();
        data.append("username", credentials.username);
        data.append("password", credentials.password);
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: data,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const handleLogin = (formData: Credentials) => {
        loginRequest(formData).then(() =>
            setAuth({ authorized: true, username: formData.username })
        );
    };
    return (
        <AccountForm
            onSubmit={handleLogin}
            welcomeText="Login into your account:"
        />
    );
};

export default Login;
