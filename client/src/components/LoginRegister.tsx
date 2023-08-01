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
    <form onSubmit={handleSubmit} className="">
      <h1 className="text-lg mb-5">{welcomeText}</h1>
      <label>
        <p>Username:</p>
        <input
          onChange={handleInputChange}
          name="login"
          id="login"
          type="text"
          className=""
        />
      </label>
      <label>
        <p>Password:</p>
        <input
          onChange={handleInputChange}
          name="password"
          id="password"
          type="password"
          className=""
        />
      </label>
      <input className="" type="submit" />
    </form>
  );
};

export default LoginRegister;
