import { useContext, useState } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { Credentials } from "../types/Credentials";
import useUserRequests from "../hooks/useUserRequests";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { setAuth } = useContext(AuthContext);
    const { postRegister } = useUserRequests();
    const [messages, setMessages] = useState<Array<string>>([]);
    const navigate = useNavigate();
    const handleRegister = async (formData: Credentials) => {
        setMessages(["Registering..."]);
        const response = await postRegister(formData);
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
            onSubmit={handleRegister}
            welcomeText="Create new account:"
            resultMessages={messages}
        />
    );
};

export default Register;
