import { useDispatch, useSelector } from 'react-redux';
import { setActiveFilter } from '../../features/posts/postsSlice';

const NavButtons = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.posts.activeFilter);

  const handleButtonClick = (filter) => {
    dispatch(setActiveFilter(filter));
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-end gap-2">
      {['New', 'Top', 'Hot'].map((filter) => (
        <button
          key={filter}
          data-test={`filter-${filter.toLowerCase()}`}
          onClick={() => handleButtonClick(filter)}
          className={`px-8 py-2 rounded-lg w-24 sm:w-auto text-sm ${
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