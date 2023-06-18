import { useContext } from 'react';
import LoginRegister from '../components/LoginRegister';
import { FormData } from '../types/IForm';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const handleRegister = (formData: FormData) => {
    dispatch({ type: 'SET_USER', payload: formData.login });
  };
  return (
    <>
      <p className="mb-5">Create new account:</p>
      <LoginRegister onSubmit={handleRegister} />
    </>
  );
};

export default Register;
