import { useSelector } from 'react-redux';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';
import { usePosts } from '../hooks/usePosts';

const Home = () => {
  const activeFilter = useSelector((state) => state.posts.activeFilter);
  const { posts, after, loading, loadPosts } = usePosts(activeFilter);

  return (
    <div>
      <NavBar /> {/* ✅ NavBar always visible */}

      <main className="max-w-4xl mx-auto px-4 py-4">
        {/* ✅ Show posts immediately, even while loading */}
        {posts.length > 0 ? (
          posts.map((post) => <Card key={post.id} post={post} />)
        ) : (
          !loading && <p className="text-white">No posts found.</p>
        )}

        {/* ✅ Show "Loading more..." below posts instead of full-screen */}
        {loading && posts.length > 0 && (
          <p className="text-white text-center mt-4">Loading more posts...</p>
        )}

        {/* ✅ Keep "Load More" button visible */}
        {after && (
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
