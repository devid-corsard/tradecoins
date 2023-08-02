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
