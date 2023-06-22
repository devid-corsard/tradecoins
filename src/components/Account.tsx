import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AuthActionsEnum } from "../types/AuthActions";

const Account = () => {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate("/login");
  };
  const handleLogOut = () => {
    dispatch({ type: AuthActionsEnum.Logout });
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="w-3/12 ml-auto">
      <p>{currentUser.name}</p>
      {currentUser?.name === "guest" ? (
        <>
          <button
            className="m-1 p-1 border bg-green-100 hover:bg-green-200 active:bg-green-400"
            onClick={handleLogIn}
          >
            Log in
          </button>
          <button
            className="m-1 p-1 border bg-blue-100 hover:bg-blue-200 active:bg-blue-400"
            onClick={handleRegister}
          >
            Register
          </button>
        </>
      ) : (
        <>
          <button
            className="m-1 p-1 border bg-red-100 hover:bg-red-200 active:bg-red-400"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default Account;
