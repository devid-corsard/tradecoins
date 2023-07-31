import { Link } from "react-router-dom";
import Account from "./Account";

const Navbar = () => {
    return (
        <div className="w-full mx-auto bg-emerald-950 shadow-xl p-3 m-3 mt-0">
            <h1
                className={
                    "md:text-4xl text-3xl mx-auto mb-3 font-semibold text-amber-500 border-4 \
                    py-2 px-4 w-max border-amber-500 \
                    cursor-pointer "
                }
            >
                <Link to="/">Crypto Portfolio</Link>
            </h1>
            <Account />
        </div>
    );
};

export default Navbar;
