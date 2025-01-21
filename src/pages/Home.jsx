import NavBar from '../components/NavBar';
import sampleData from '../components/sampleData';
import Card from '../components/Card'; 

const Home = () => {
  return (
    <div>
      <NavBar /> 
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div>
          {sampleData.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;