import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormData } from "../types/IForm";

type FormProps = {
  onSubmit: (data: FormData) => void;
  welcomeText: string;
};

const LoginRegister = ({ onSubmit, welcomeText }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col items-center bg-slate-700
      px-9 py-3 m-3 rounded-lg text-slate-200`}
    >
      <h1 className="text-lg mb-5">{welcomeText}</h1>
      <label>
        <p>Username:</p>
        <input
          onChange={handleInputChange}
          name="login"
          id="login"
          type="text"
          className={`
          w-64 p-2 m-1 rounded-sm mb-5 
          bg-slate-900 outline-amber-600
          `}
        />
      </label>
      <label>
        <p>Password:</p>
        <input
          onChange={handleInputChange}
          name="password"
          id="password"
          type="password"
          className={`
          w-64 p-2 m-1 rounded-sm mb-5
          bg-slate-900 outline-amber-600
          `}
        />
      </label>
      <input
        className={`m-1 p-1 px-3 
        bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900
        rounded-sm text-white cursor-pointer`}
        type="submit"
      />
    </form>
  );
};

export default LoginRegister;
