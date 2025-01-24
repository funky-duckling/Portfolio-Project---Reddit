import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/postsSlice';

const SearchBar = () => {
      // Get the searchQuery from the Redux store
     const searchQuery = useSelector((state) => state.posts.searchQuery);
     const dispatch = useDispatch();

     // Handle the change of the search input
     const handleSearchChange = (e) => {
      dispatch(setSearchQuery(e.target.value)); // Update the search query in the Redux store
  };

    return (
        <div className="flex justify-center">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery} // Set the input value to the searchQuery from Redux store
                onChange={handleSearchChange} // Dispatch the action to update searchQuery in Redux store
                className="px-4 py-2 rounded-md w-full text-black"
            />
        </div>
    );
  };
  
  export default SearchBar;