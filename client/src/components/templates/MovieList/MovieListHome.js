import Container from '@mui/material/Container';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';
import films from "./data.json"
import  {Typography} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Header from '../../header/Header';
const darkTheme = createTheme ({
  palette: {
      mode: 'dark',
  },
})
const MovieListHome = () => {
    return ( 
        <div className="App">
      <Header/>
      {/* <Search placeholder="Enter a movie name..." /> */}
      <ThemeProvider theme = {darkTheme}>
        <CssBaseline />
      <Container sx={{marginY: 5, }} maxWidth="xl">
        {films.map((film) => (
          
          <>
          
          <Typography 
            variant="h4"
            component="h2"
            marginTop={5}
            marginBottom={3}
          >
             {film.name} 
            </Typography>
            
            <Grid container spacing = {3}>
            {film.movies.map((movie, index ) => 
            
            <MovieCard movie ={movie} key = {index} />
            
            )}
        </Grid>
        
          </>
        ))}
       
      </Container>
      
      </ThemeProvider>
    </div>
    
     );
}
 
export default MovieListHome;
