import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { Credentials } from "../types/Credentials";
import useUserRequests from "../hooks/useUserRequests";

const Register = () => {
    const { setAuth } = useContext(AuthContext);
    const { postRegister } = useUserRequests();
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
