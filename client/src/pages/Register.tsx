import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../context/AuthActions";
import { Credentials } from "../types/Credentials";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const handleRegister = (formData: Credentials) => {
    dispatch({ type: AuthActionsEnum.Register, payload: formData });
  };
  return (
    <AccountForm onSubmit={handleRegister} welcomeText="Create new account:" />
  );
};

export default Register;
