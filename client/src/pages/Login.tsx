import { useContext } from "react";
import AccountForm from "../components/AccountForm";
import { FormData } from "../types/IForm";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../types/AuthActions";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (formData: FormData) => {
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
