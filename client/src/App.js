import Movie from "./Components/Movie/Movie";
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>

<div className="App">
  <Routes>
    <Route path='/movie/:id' element={<Movie/>}   /> 
    
      
      
      
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
