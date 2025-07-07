import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmesListPage from './pages/FilmesListPage';
import FilmePage from './pages/FilmePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<FilmesListPage />} />
        <Route path="/filmes/:id" element={<FilmePage />} />
      </Routes>
    </>
  );
}

export default App;
