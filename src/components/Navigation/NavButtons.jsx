import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../../features/posts/postsSlice';

const NavButtons = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.posts.activeFilter); // Access active filter from Redux store

  const handleButtonClick = (filter) => {
    dispatch(setActiveFilter(filter)); // Update active filter in Redux
  };

  return (
    <div className="flex items-center space-x-4 justify-end">
      {['New', 'Top', 'Hot'].map((filter) => (
        <button
          key={filter}
          onClick={() => handleButtonClick(filter)}
          className={`px-4 py-2 rounded-lg ${
            activeFilter === filter
              ? 'bg-blue-600 text-white font-bold shadow-md hover:bg-blue-600'
              : 'text-white font-bold shadow-md'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default NavButtons;