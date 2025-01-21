//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Home from './pages/Home';
import NavBar from './components/NavBar';  // Import NavBar

const App = () => {
  return (
    <div>
      <NavBar />  {/* Include NavBar */}
      <main className="p-4">
        {/* Content of your app */}
      </main>
    </div>
  );
};

export default App;