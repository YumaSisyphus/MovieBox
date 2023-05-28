import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import MovieListCard from './MovieListCard';
import Header from '../../header/Header';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [movies, setMovies] = useState([])



  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movieListCover`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
    console.log(movies)
  }, []);

  return (
    <div className="App">
    <Header/>
      {/* <Search placeholder="Enter a movie name..." /> */}
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ marginY: 5 }} maxWidth="xl">
          <Grid container spacing={3}>
            {movies.map((movies, index) => {
              return <MovieListCard movies={movies} key={index} />;
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default MovieList;
