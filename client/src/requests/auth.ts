import axios from "axios";
import { FormData } from "../types/IForm";
import { AuthActionsEnum } from "../types/AuthActions";

axios.defaults.baseURL = import.meta.env.DEV
    ? "http://127.0.0.1:8080"
    : "http://130.162.61.35:84";

const authRequests = {
    [AuthActionsEnum.Register](form: FormData) {
        const data = new URLSearchParams();
        data.append("name", form.login);
        data.append("password", form.password);
        axios
            .post("/register", data)
            .catch(console.log)
            .then(console.log);
    }
}

export default authRequests;
