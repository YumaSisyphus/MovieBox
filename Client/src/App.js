import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Forms from './Forms'
import MovieList from './pages/MovieList';



function App() {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path ="/movies" element ={<Home />} />
      <Route path = "/movies/:id" element =  {<MovieDetails />} />
      <Route path ="/forms" element = {<Forms />} />
      <Route path = "/movielist" element = {<MovieList />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
