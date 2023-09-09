"use client";
import User from "../types/User";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../context/AuthActions";
import useAuth from "../hooks/useAuth";

async function getUser<TResponse>(): Promise<TResponse | undefined> {
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
    const { user, dispatch, authorized, setAuthorized } =
        useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState<User>(user);
    const handleLogOut = () => {
        dispatch({ type: AuthActionsEnum.Logout });
        setAuthorized(false);
    };
    useEffect(() => {
        setTimeout(() => {
            getUser<User>().then((user) => {
                console.log("use effect: ", user);
                if (user) setCurrentUser(user);
            });
        }, 1000);
    }, [authorized]);
    return (
        <nav>
            <h2>@{currentUser.name}</h2>
            {currentUser?.name === "guest" ? (
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
