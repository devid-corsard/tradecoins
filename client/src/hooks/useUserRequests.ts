import { Credentials } from "../dto/Credentials";
import { ServerMessage } from "../dto/ServerMessage";

type User = {
    name: string;
};

export default function useUserRequests() {
    async function postLogout(): Promise<boolean | null> {
        return fetch("/api/user/logout", {
            method: "post",
        })
            .then((res) => res.ok)
            .catch(() => null);
    }

    async function getUserInfo(): Promise<User | null> {
        return fetch("/api/user/info", { method: "GET" })
            .then((res) => res.json())
            .then((user) => ({ name: user.username }) as User)
            .catch(() => null);
    }

    async function postRegister(
        credentials: Credentials
    ): Promise<ServerMessage | null> {
        const data = new URLSearchParams();
        data.append("username", credentials.username);
        data.append("password", credentials.password);
        return fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: data,
        })
            .then((res) => res.json())
            .catch(() => null);
    }

    async function postLogin(
        credentials: Credentials
    ): Promise<ServerMessage | null> {
        const data = new URLSearchParams();
        data.append("username", credentials.username);
        data.append("password", credentials.password);
        return fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: data,
        })
            .then((res) => res.json())
            .catch(() => null);
    }

    return { getUserInfo, postLogin, postLogout, postRegister };
}
