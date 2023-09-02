import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormData } from "../types/IForm";

type FormProps = {
  onSubmit: (data: FormData) => void;
  welcomeText: string;
};

const AccountForm = ({ onSubmit, welcomeText }: FormProps) => {
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
    <form className="wrapper" onSubmit={handleSubmit}>
      <h2>{welcomeText}</h2>
      <label>
        <h3>Username:</h3>
        <input
          onChange={handleInputChange}
          name="login"
          id="login"
          type="text"
        />
      </label>
      <label>
        <h3>Password:</h3>
        <input
          onChange={handleInputChange}
          name="password"
          id="password"
          type="password"
        />
      </label>
      <button className="wide" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AccountForm;
