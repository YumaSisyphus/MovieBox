import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import AppBar from '../components/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import MovieListCard from '../components/MovieListCard';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    Axios.get('http://localhost:3001/movies')
      .then((response) => {
        setMovieList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  return (
    <div className="App">
      <AppBar />
      {/* <Search placeholder="Enter a movie name..." /> */}
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container sx={{ marginY: 5 }} maxWidth="xl">
          <Grid container spacing={3}>
            {movieList.map((movies, index) => {
              return <MovieListCard movies={movies} key={index} />;
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default MovieList;
