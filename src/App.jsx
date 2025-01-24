import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;