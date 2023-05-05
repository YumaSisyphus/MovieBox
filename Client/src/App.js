import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Test from './test';



function App() {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path ="/movies" element ={<Home />} />
      <Route path = "/movies/:id" element =  {<MovieDetails />} />
      <Route path = "/test" element = {<Test />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
