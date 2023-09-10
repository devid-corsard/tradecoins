import { useContext, useState } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { Credentials } from "../types/Credentials";
import useUserRequests from "../hooks/useUserRequests";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const { postLogin } = useUserRequests();
    const [messages, setMessages] = useState<Array<string>>([]);
    const navigate = useNavigate();
    const handleLogin = async (formData: Credentials) => {
        setMessages(["Login..."]);
        const response = await postLogin(formData);
        if (!response) {
            setMessages(["Unexpected error, try again"]);
            return;
        }
        if (response.success) {
            setAuth({ authorized: true, username: formData.username });
            navigate("/");
        }
        setMessages(response.messages);
    };
    return (
        <AccountForm
            onSubmit={handleLogin}
            welcomeText="Login into your account:"
            resultMessages={messages}
        />
    );
};

export default Login;
