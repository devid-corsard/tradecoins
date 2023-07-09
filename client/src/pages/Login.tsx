import { useContext } from "react";
import LoginRegister from "../components/LoginRegister";
import { FormData } from "../types/IForm";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../types/AuthActions";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (formData: FormData) => {
    dispatch({ type: AuthActionsEnum.Login, payload: formData });
  };
  return (
    <LoginRegister
      onSubmit={handleLogin}
      welcomeText="Login into your account:"
    />
  );
};

export default Login;
