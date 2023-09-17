import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useUserRequests from "../hooks/useUserRequests";

const Account = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const { getUserInfo, postLogout } = useUserRequests();
    useEffect(() => {
        getUserInfo().then((user) => {
            if (user) setAuth({ authorized: true, username: user.name });
        });
    }, [auth.authorized]);
    const handleLogOut = () => {
        postLogout().then((res) => {
            if (res) {
                setAuth({ authorized: false, username: "guest" });
            }
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
                        <button
                            disabled
                            title="No settings by now"
                            className="left neutral"
                        >
                            Settings
                        </button>
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
