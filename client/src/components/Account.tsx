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
    <div className="w-max ml-auto mr-[clamp(1rem,6vw,10rem)] text-slate-200 text-xs">
      <p className="text-amber-400 text-xl mb-3">@{currentUser.name}</p>
      {currentUser?.name === "guest" ? (
        <>
          <Link to="login">
            <button className="w-20 m-1 py-1 px-2 bg-amber-700 hover:bg-amber-600 active:bg-emerald-400">
              Login
            </button>
          </Link>
          <Link to="register">
            <button className="w-20 m-1 py-1 px-2 bg-amber-700 hover:bg-amber-600 active:bg-emerald-400">
              Register
            </button>
          </Link>
        </>
      ) : (
        <div>
          <Link to="/">
            <button
              className="m-1 py-1 px-2 bg-red-800 text-slate-100 hover:bg-red-700 active:bg-red-950 active:text-gray-700"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </Link>
          <Link to="settings">
            <button className="m-1 py-1 px-2 bg-red-800 text-slate-100 hover:bg-red-700 active:bg-red-950 active:text-gray-700">
              Settings
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Account;
