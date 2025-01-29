import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../features/posts/postsSlice';
import { useState } from 'react';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.posts.searchQuery);
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);

    clearTimeout(window.searchTimeout); // Prevent spamming API
    window.searchTimeout = setTimeout(() => {
      dispatch(setSearchQuery(newQuery));
    }, 300); // Only fire API call after 300ms of no typing
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue} // Use local state for instant UI updates
        onChange={handleSearchChange}
        className="px-4 py-2 rounded-md w-full text-black"
      />
    </div>
  );
};

export default SearchBar;