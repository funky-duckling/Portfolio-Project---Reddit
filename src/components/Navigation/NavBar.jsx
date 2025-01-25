import Header from '../UI/Header';  // Import Header component
import SearchBar from './SearchBar';  // Import SearchBar component
import NavButtons from './NavButtons';  // Import NavButtons component

const NavBar = () => {
  return (
    <nav className="bg-gray-600 p-4 w-full sticky top-0 z-10">
      <div className="flex justify-between items-center">

        {/* Header with logo and title */}
        <div className='flex-1'>
          <Header />
        </div>

        {/* Search bar */}
        <div className='flex-1 justify-center'>
          <SearchBar />
        </div>

        {/* Navigation buttons */}
        <div className='flex-1 justify-end'>
          <NavButtons />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;