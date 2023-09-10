import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { Credentials } from "../types/Credentials";
import useUserRequests from "../hooks/useUserRequests";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const { postLogin } = useUserRequests();
    const handleLogin = (formData: Credentials) => {
        postLogin(formData).then(() =>
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
