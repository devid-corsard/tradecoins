import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { PortfolioContextProvider } from "./context/PortfolioContext";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <div className="h-full flex flex-col items-center">
      <AuthContextProvider>
        <PortfolioContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </PortfolioContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
