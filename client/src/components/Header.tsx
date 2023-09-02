import { Link } from "react-router-dom";
import Account from "./Account";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Crypto Portfolio</h1>
      </Link>
      <Account />
    </header>
  );
};

export default Header;
