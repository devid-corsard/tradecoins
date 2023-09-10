import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { Credentials } from "../types/Credentials";

async function postRegister<TResponse>(
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
const Register = () => {
    const { setAuth } = useContext(AuthContext);
    const handleRegister = (formData: Credentials) => {
        postRegister(formData).then(() =>
            setAuth({ authorized: true, username: formData.username })
        );
    };
    return (
        <AccountForm
            onSubmit={handleRegister}
            welcomeText="Create new account:"
        />
    );
};

export default Register;
