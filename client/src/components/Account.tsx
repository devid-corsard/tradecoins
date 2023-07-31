import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../types/AuthActions";

const Account = () => {
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const handleLogOut = () => {
        dispatch({ type: AuthActionsEnum.Logout });
    };
    return (
        <div className="md:w-3/12 w-1/3 ml-auto text-slate-200 text-xs">
            <p className="text-amber-400 text-xl mb-3">@{currentUser.name}</p>
            {currentUser?.name === "guest" ? (
                <>
                    <Link
                        to="login"
                        className="w-20 m-1 py-1 px-2 bg-amber-700 hover:bg-amber-600 active:bg-emerald-400"
                    >
                        Login
                    </Link>
                    <Link
                        to="register"
                        className="w-20 m-1 py-1 px-2 bg-amber-700 hover:bg-amber-600 active:bg-emerald-400"
                    >
                        Register
                    </Link>
                </>
            ) : (
                <div>
                    <Link
                        to="/"
                        className="m-1 py-1 px-2 bg-red-800 text-slate-100 hover:bg-red-700 active:bg-red-950 active:text-gray-700"
                        onClick={handleLogOut}
                    >
                        Log out
                    </Link>
                    <Link
                        to="settings"
                        className="m-1 py-1 px-2 bg-red-800 text-slate-100 hover:bg-red-700 active:bg-red-950 active:text-gray-700"
                    >
                        Settings
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Account;
