import Container from '@mui/material/Container';
import MovieCard from "../components/MovieCard";
import Grid from '@mui/material/Grid';
import films from "../data.json";
import  {Typography} from "@mui/material";
import Search from '../components/Search';
import AppBar from '../components/AppBar';
const Home = () => {
    return ( 
        <div className="App">
      <AppBar />
      {/* <Search placeholder="Enter a movie name..." /> */}
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
            
            <Grid container spacing = {5}>
            {film.movies.map((movie, index ) => 
            
            <MovieCard movie ={movie} key = {index} />
            
            )}
        </Grid>
        
          </>
        ))}
       
      </Container>
    </div>
     );
}
 
export default Home;