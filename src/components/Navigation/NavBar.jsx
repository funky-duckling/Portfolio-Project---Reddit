import Header from '../UI/Header';  
import SearchBar from './SearchBar';  
import NavButtons from './NavButtons';  

const NavBar = () => {
  return (
    <nav className="bg-gray-600 p-4 w-full sticky top-0 z-10">
      {/* Flex container with responsive adjustments */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        
        {/* Header with logo & title (Left on desktop, top on mobile) */}
        <div className="flex justify-center sm:justify-start w-full sm:w-auto">
          <Header />
        </div>

        {/* Search bar (Centered on mobile & desktop) */}
        <div className="w-full sm:w-auto">
          <SearchBar />
        </div>

        {/* Navigation buttons (Centered on mobile, right on desktop) */}
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <NavButtons />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;