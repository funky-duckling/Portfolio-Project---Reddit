import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';
import { getAccessToken, fetchRedditPosts } from '../services/redditAPI';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = useSelector((state) => state.posts.searchQuery);
  const activeFilter = useSelector((state) => state.posts.activeFilter);

  // 1. FRESH LOAD in useEffect
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const accessToken = await getAccessToken();
        // Fresh load: pass null as the "after" token
        const { posts: newPosts, after: newAfter } = await fetchRedditPosts(
          accessToken,
          'all',
          activeFilter.toLowerCase(),
          10,
          null
        );

        setPosts(newPosts);
        setAfter(newAfter);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [activeFilter]);

  // 2. LOAD MORE for the Button
  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessToken();
      // Append more posts: pass existing 'after' token
      const { posts: newPosts, after: newAfter } = await fetchRedditPosts(
        accessToken,
        'all',
        activeFilter.toLowerCase(),
        10,
        after
      );

      setPosts((prev) => [...prev, ...newPosts]);
      setAfter(newAfter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter by search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && posts.length === 0) {
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

        {/* Loading Indicator */}
        {loading && posts.length > 0 && <p className="text-white mt-4">Loading more...</p>}

        {/* "Load More" Button */}
        {!loading && after && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
