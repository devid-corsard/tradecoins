import { Credentials } from "../types/Credentials";

export default function useUserRequests() {
    async function postLogout<TResponse>(): Promise<TResponse | undefined> {
        try {
            const response = await fetch("/api/user/logout", {
                method: "post",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function getUserInfo<TResponse>(): Promise<TResponse | undefined> {
        try {
            const response = await fetch("/api/user/info", { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const user = await response.json();
            const currentUser = {
                name: user.username,
                id: user.user_id,
            };
            return currentUser as TResponse;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function postRegister<TResponse>(
        credentials: Credentials
    ): Promise<TResponse | undefined> {
        try {
            const data = new URLSearchParams();
            data.append("username", credentials.username);
            data.append("password", credentials.password);
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: data,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    async function postLogin<TResponse>(
        credentials: Credentials
    ): Promise<TResponse | undefined> {
        try {
            const data = new URLSearchParams();
            data.append("username", credentials.username);
            data.append("password", credentials.password);
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: data,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    return { getUserInfo, postLogin, postLogout, postRegister };
}
