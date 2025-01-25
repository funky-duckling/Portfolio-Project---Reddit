import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';
import { getAccessToken, fetchRedditPosts } from '../services/redditAPI';

const Home = () => {
  const [posts, setPosts] = useState([]); // State to store posts from Reddit
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null);
  // Get the searchQuery from Redux store
  const searchQuery = useSelector((state) => state.posts.searchQuery);

  // Fetch posts from Reddit API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Get access token
        const accessToken = await getAccessToken();

        // Fetch posts from Reddit
        const fetchedPosts = await fetchRedditPosts(accessToken, 'all', 'hot', 10);
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this effect runs only once

  
  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          <p className="text-white">No posts found.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
