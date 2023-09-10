"use client";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import User from "../types/User";

async function postLogout<TResponse>(): Promise<TResponse | undefined> {
    try {
        const response = await fetch("/api/user/logout", { method: "post" });
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

const Account = () => {
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
        getUserInfo<User>().then((user) => {
            console.log("use effect: ", user);
            if (user) setAuth({ authorized: true, username: user.name });
        });
    }, [auth.authorized]);
    const handleLogOut = () => {
        postLogout().then(() => {
            setAuth({ authorized: false, username: "guest" });
        });
    };
    return (
        <nav>
            <h2>@{auth.username}</h2>
            {auth?.username === "guest" ? (
                <>
                    <Link to="login">
                        <button className="left neutral">Login</button>
                    </Link>
                    <Link to="register">
                        <button className="right">Register</button>
                    </Link>
                </>
            ) : (
                <div>
                    <Link to="settings">
                        <button className="left neutral">Settings</button>
                    </Link>
                    <Link to="/">
                        <button className="right bad" onClick={handleLogOut}>
                            Log out
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Account;
