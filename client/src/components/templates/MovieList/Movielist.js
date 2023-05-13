import Container from '@mui/material/Container';
import MovieCard from "./MovieCard";
import Grid from '@mui/material/Grid';
import films from "./data.json";
import { Typography } from "@mui/material";
import Header from '../../header/Header';
// import SearchBox from '../../SearchBox/SearchBox';
const Movielist = () => {
    return (
        <div className="App">
            <Header />
            {/* <Search placeholder="Enter a movie name..." /> */}
            <Container sx={{ marginY: 5, }} maxWidth="xl">
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

                        <Grid container spacing={5} width={100} height={100}>
                            {film.movies.map((movie, index) =>

                                <MovieCard movie={movie} key={index} />

                            )}
                        </Grid>

                    </>
                ))}

            </Container>
        </div>
    );
}

export default Movielist;
