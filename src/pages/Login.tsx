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
    <>
      <p className="mb-5">Login into your account:</p>
      <LoginRegister onSubmit={handleLogin} />
    </>
  );
};

export default Login;
