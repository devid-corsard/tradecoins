import { Link } from "react-router-dom";
import Account from "./Account";

const Navbar = () => {
  return (
    <div className="">
      <Link to="/">
        <h1 className="">CryptoPortfolio</h1>
      </Link>
      <Account />
    </div>
  );
};

export default Navbar;
