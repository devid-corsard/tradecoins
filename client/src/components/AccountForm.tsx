import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../types/Credentials";

type FormProps = {
  onSubmit: (data: Credentials) => void;
  welcomeText: string;
};

const AccountForm = ({ onSubmit, welcomeText }: FormProps) => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(credentials);
    navigate("/");
  };
  return (
    <form className="wrapper" onSubmit={handleSubmit}>
      <h2>{welcomeText}</h2>
      <label>
        <h3>Username:</h3>
        <input
          onChange={handleInputChange}
          name="username"
          id="username"
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
