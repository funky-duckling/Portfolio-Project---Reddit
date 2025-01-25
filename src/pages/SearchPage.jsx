import { useSelector } from 'react-redux';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';

const SearchPage = () => {
  // Get the search query from the Redux store
  const searchQuery = useSelector((state) => state.posts.searchQuery);
  const posts = useSelector((state) => state.posts.posts); // Assuming posts are in Redux

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
      <NavBar />

      {/* Display the filtered posts */}
      <div className="post-list mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id} post={post} /> // Render the Card component for each post
          ))
        ) : (
          <p className="text-white">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
