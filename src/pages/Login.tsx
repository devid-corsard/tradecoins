import { useContext } from 'react';
import LoginRegister from '../components/LoginRegister';
import { FormData } from '../types/IForm';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const handleLogin = (formData: FormData) => {
    dispatch({ type: 'SET_USER', payload: formData.login });
  };
  return (
    <>
      <p className='mb-5'>Login into your account:</p>
      <LoginRegister onSubmit={handleLogin} />
    </>
  );
};

export default Login;
