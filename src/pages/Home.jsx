import { useSelector } from 'react-redux';
import NavBar from '../components/Navigation/NavBar';
import Card from '../components/UI/Card';
import { usePosts } from '../hooks/usePosts';
import { motion } from 'framer-motion';

const Home = () => {
  const activeFilter = useSelector((state) => state.posts.activeFilter);
  const { posts, after, loading, loadPosts } = usePosts(activeFilter);

  return (
    <div>
      <NavBar /> {/* NavBar always visible */}

      <main className="max-w-4xl mx-auto px-4 py-4">
        {/* Show posts immediately, even while loading */}
        {posts.length > 0 ? (
          posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
          <Card post={post} />
          </motion.div>
          ))
        ) : (
          !loading && <p className="text-white">No posts found.</p>
        )}

        {/* Show "Loading more..." */}
        {loading && posts.length > 0 && (
          <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
        )}

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
