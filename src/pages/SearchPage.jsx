import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/posts/postsSlice';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';

const SearchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams(); // Read search query from URL
  const searchQuery = searchParams.get('q') || ''; // Default to empty if no query
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(setSearchQuery(searchQuery)); // Ensure Redux state updates when URL changes
  }, [searchQuery, dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
      <NavBar />
      <div className="post-list mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          <p className="text-white">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
