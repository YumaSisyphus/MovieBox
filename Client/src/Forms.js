import './Forms.css';
import {useState} from "react";
import Axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';


const darkTheme = createTheme ({
  palette: {
    mode: 'dark',
  },
})

const Forms = () => {
  
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  console.log("test" + name  + image);
  
  const[movieList, setMovieList] = useState([]);

  const addMovie = async () => {
    try {
      await Axios.post('http://localhost:3001/create', {
        name: name, 
        image: image
      });
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const getMovies = () => {
    Axios.get('http://localhost:3001/movies').then((response) => {
      setMovieList(response.data);
    });
  }

  return (
    <ThemeProvider theme = {darkTheme}>
      <CssBaseline />
    <div className="Form">
      <div className ="info">
        <label>Name: </label>
        <input required type="text" onChange = {e => {
          setName(e.target.value);
        }}  />
        <label>Image: </label>
        <input  required type="text" onChange = {e => {
          setImage(e.target.value);
        }}/>
        <button onClick={addMovie}> Add Movie</button>
        <div className="movies">
        <button onClick={getMovies}>Show Movies</button>

        {movieList.map((val,key) => {
          return <div className="films"> 
            <div>
            <h3>{val.name}</h3>
            <img src={val.image} />
            </div>
           
           
            
          </div>
        })}
        </div>
      </div>
        
    </div>
    </ThemeProvider>
  );
};
 
export default Forms;