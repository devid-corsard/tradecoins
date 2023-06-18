import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Portfolio from './components/Portfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import { PortfolioContextProvider } from './context/PortfolioContext';

function App() {
  return (
    <div className="bg-gray-50 h-full">
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
