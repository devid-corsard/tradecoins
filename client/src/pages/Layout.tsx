import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="h-full flex flex-col items-center">
            <Navbar />
            <Outlet />
        </div>
    );
}
