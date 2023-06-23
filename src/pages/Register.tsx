import { useContext } from "react";
import LoginRegister from "../components/LoginRegister";
import { FormData } from "../types/IForm";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../types/AuthActions";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const handleRegister = (formData: FormData) => {
    dispatch({ type: AuthActionsEnum.Register, payload: formData });
  };
  return (
    <LoginRegister
      onSubmit={handleRegister}
      welcomeText="Create new account:"
    />
  );
};

export default Register;
