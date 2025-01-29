import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.location.reload(); // Force refresh if already on Home
    } else {
      navigate("/"); // Navigate to Home if on another page
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={handleHomeClick} className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700">
        <img src="/src/assets/reddit-logo.svg" alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold text-white cursor-pointer">
          Reddit Clone
        </h1>
      </button>
    </div>
  );
};

export default Header;