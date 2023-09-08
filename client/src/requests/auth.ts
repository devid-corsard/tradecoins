import axios from "axios";
import { AuthActionsEnum } from "../context/AuthActions";
import { Credentials } from "../types/Credentials";

const API = "/api";

const authRequests = {
  [AuthActionsEnum.Register](form: Credentials) {
    const data = new URLSearchParams();
    data.append("username", form.username);
    data.append("password", form.password);
    axios.post(`${API}/register`, data).catch(console.log).then(console.log);
  },
  [AuthActionsEnum.Login](form: Credentials) {
    const data = new URLSearchParams();
    data.append("username", form.username);
    data.append("password", form.password);
    axios.post(`${API}/login`, data).catch(console.log).then(console.log);
  },
  [AuthActionsEnum.Logout]() {
    fetch(`${API}/user/info`, {
      method: "GET",
    });
  },
};

export default authRequests;
