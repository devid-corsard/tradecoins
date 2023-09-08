import axios from "axios";
import { FormData } from "../types/IForm";
import { AuthActionsEnum } from "../types/AuthActions";

const API = "/api";

const authRequests = {
  [AuthActionsEnum.Register](form: FormData) {
    const data = new URLSearchParams();
    data.append("username", form.username);
    data.append("password", form.password);
    axios.post(`${API}/register`, data).catch(console.log).then(console.log);
  },
  [AuthActionsEnum.Login](form: FormData) {
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
