import { useSelector } from 'react-redux';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';
import { usePosts } from '../hooks/usePosts'; // <-- new hook

const Home = () => {
  const searchQuery = useSelector((state) => state.posts.searchQuery);
  const activeFilter = useSelector((state) => state.posts.activeFilter);

  const { posts, after, loading, error, loadPosts } = usePosts(activeFilter);

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

        {loading && posts.length > 0 && <p className="text-white mt-4">Loading more...</p>}

        {!loading && after && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => loadPosts(false)}
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