import { AuthActionsEnum } from "../context/AuthActions";
import { Credentials } from "../types/Credentials";

const API = "/api";

const authRequests = {
  async [AuthActionsEnum.Register](form: Credentials) {
    const data = new URLSearchParams();
    data.append("username", form.username);
    data.append("password", form.password);
    fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: data,
    });
  },
  async [AuthActionsEnum.Login](form: Credentials) {
    const data = new URLSearchParams();
    data.append("username", form.username);
    data.append("password", form.password);
    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: data,
    });
  },
  async [AuthActionsEnum.Logout]() {
    fetch(`${API}/user/logout`, {
      method: "POST",
    });
  },
};

export default authRequests;
