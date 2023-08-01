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
    <div className="">
      <p className="">@{currentUser.name}</p>
      {currentUser?.name === "guest" ? (
        <>
          <Link to="login">
            <button className="">Login</button>
          </Link>
          <Link to="register">
            <button className="">Register</button>
          </Link>
        </>
      ) : (
        <div>
          <Link to="/">
            <button className="" onClick={handleLogOut}>
              Log out
            </button>
          </Link>
          <Link to="settings">
            <button className="">Settings</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Account;
