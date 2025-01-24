import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import sampleData from '../components/sampleData';
import Card from '../components/Card';

const Home = () => {
  // Get the searchQuery from Redux store
  const searchQuery = useSelector((state) => state.posts.searchQuery);
  
  // Filter posts based on the search query
  const filteredPosts = sampleData.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div>
          {/* Map over filtered posts instead of sampleData */}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id} post={post} />
            ))
          ) : (
            <p className="text-white">No posts found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
