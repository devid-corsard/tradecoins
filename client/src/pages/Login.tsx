import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../context/AuthActions";
import { Credentials } from "../types/Credentials";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (formData: Credentials) => {
    dispatch({ type: AuthActionsEnum.Login, payload: formData });
  };
  return (
    <AccountForm
      onSubmit={handleLogin}
      welcomeText="Login into your account:"
    />
  );
};

export default Login;
