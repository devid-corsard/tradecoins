import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import { PortfolioContextProvider } from "./context/PortfolioContext";
import Portfolio from "./pages/Portfolio";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Portfolio,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <PortfolioContextProvider>
        <RouterProvider router={router} />
      </PortfolioContextProvider>
    </AuthContextProvider>
  );
}

export default App;
