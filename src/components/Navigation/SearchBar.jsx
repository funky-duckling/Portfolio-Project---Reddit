import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../features/posts/postsSlice';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import URL search params

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.posts.searchQuery);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams(); // Manage URL params

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      dispatch(setSearchQuery(newQuery));

      // ✅ Update the URL
      setSearchParams({ q: newQuery });
    }, 300);
  };

  return (
    <div className="flex justify-center w-full">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleSearchChange}
        className="px-4 py-2 rounded-md w-full text-black"
      />
    </div>
  );
};

export default SearchBar;
