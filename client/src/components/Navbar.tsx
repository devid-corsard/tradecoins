import { Link } from "react-router-dom";
import Account from "./Account";

const Navbar = () => {
  return (
    <div className="w-full bg-emerald-800 flex">
      <Link to="/">
        <h1
          className={
            "mx-3 my-3 py-2 px-4 w-[clamp(10rem,60vw,25rem)] \
            font-semibold text-amber-500 text-[clamp(0.7rem,5vw,2rem)]\
            border-4 border-amber-500"
          }
        >
          CryptoPortfolio
        </h1>
      </Link>
      <Account />
    </div>
  );
};

export default Navbar;
