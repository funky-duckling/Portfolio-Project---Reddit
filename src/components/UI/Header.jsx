import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleHomeClick}>
      <img src="/src/assets/reddit-logo.svg" alt="Logo" className="h-8 w-8" />
      <h1 className="text-lg sm:text-xl font-bold text-white">
        Reddit Clone
      </h1>
    </div>
  );
};

export default Header;