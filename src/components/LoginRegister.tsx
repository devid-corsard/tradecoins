import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProps, FormData } from '../types/IForm';

const LoginRegister = ({ onSubmit }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({ login: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    navigate('/');
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      <label>
        <p>
          Username:
        </p>
        <input
          onChange={handleInputChange}
          name="login"
          id="login"
          type="text"
          className='w-64 p-1 m-1 border-2 border-blue-400 mb-5'
        />
      </label>
      <label>
        <p>
          Password:
        </p>
        <input
          onChange={handleInputChange}
          name="password"
          id="password"
          type="password"
          className='w-64 p-1 m-1 border-2 border-blue-400 mb-5'
        />
      </label>
      <input
        className="m-1 p-1 border bg-green-100 hover:bg-green-200 active:bg-green-400 cursor-pointer"
        type="submit"
      />
    </form>
  );
};

export default LoginRegister;
