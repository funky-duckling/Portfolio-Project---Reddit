import Header from '../components/Header';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2>Welcome to Reddit Clone!</h2>
        <p>This is your home page.</p>
      </main>
    </div>
  );
}

export default Home;