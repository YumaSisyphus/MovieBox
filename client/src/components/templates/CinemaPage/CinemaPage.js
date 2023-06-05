import { Container, ThemeProvider, Box, Typography } from "@mui/material";
import theme from "../../../utils/Themes";
import styles from "./CinemaPage.module.css";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Thisio from "../../../assets/Theatres/Thisio.jpg"
import { useEffect, useState } from "react";
import axios from "axios";


const CinemaPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [cinema, setCinema] = useState({
        Name: '',
        Description: ''
    });
    const [movies, setMovies] = useState({});
    const theatre_cinema = location.state?.cinema;

    const fetchCinema = () => {
        const theatreId = theatre_cinema?.TheatreID;
        return axios.get(`/api/getCinema/${theatreId}`)
            .then((response) => {
                setCinema(response.data[0]);
            });
    }
    useEffect(() => {
        fetchCinema();
    }, []);

    const fetchCinemaMovies = () => {
        const theatreId = theatre_cinema?.TheatreID;
        return axios.get(`/api/getCinemaMovies/${theatreId}`)
            .then((response) => {
                setMovies(response.data);
            });
    }
    useEffect(() => {
        fetchCinemaMovies();
    }, []);

    const sendMovieInfo = (movie) => {
        navigate("/MoviePage", { state: { movie } });
    };


    return (
        <ThemeProvider theme={theme}>
            <div style={{ backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))` }}>
                <Header />
                <Box width="100%" height="80vh" sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${cinema.Cover})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            filter: "brightness(25%)",
                            position: "absolute",
                            zIndex: "0"
                        }}>
                    </Box>
                    <Typography
                        pt={15}
                        pl={10}
                        className={styles.BannerQuote}>
                        {cinema.Name}
                    </Typography>

                    <Typography
                        zIndex="10"
                        position="inherit"
                        width={700}
                        mt={3}
                        pl={10}
                        mb={10}
                        fontSize="34px"
                        letterSpacing="2px"
                        color="#ebebeb">
                        {cinema.Description}
                    </Typography>
                    <Link className={styles.CinemaButton}>
                        Get Tickets Here
                    </Link>
                </Box>
                <Container maxWidth="md">

                    <Box display="flex" flexWrap="wrap" mt={10} mb={5} gap={10} ml={0}>
                        {Array.isArray(movies) && movies.slice(0, 3).map((movie) => (
                            <Box
                                ml={2}
                                width="208px"
                                height="250px"
                                className={styles.MovieBorder}
                                sx={{
                                    borderRadius: "5px",
                                    backgroundImage: `url(${movie.Thumbnail})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                }}
                                onClick={() => {
                                    sendMovieInfo(movie);
                                }}
                            ></Box>
                        ))}
                    </Box>

                    <Typography ml={2} mt={7} variant="h5" color="#ebebeb">
                        Now in our Cinema
                    </Typography>
                    <hr style={{ border: "1px solid #8f8f8f", marginLeft: "2%" }} />


                    <Box display="flex" flexDirection="column" mt={3} ml={2} bgcolor="#0b1017" className={styles.movieContainer}>
                        {Array.isArray(movies) && movies.map((movie) => (
                            <Box display="flex" className={styles.rowBorder} height={120} alignItems="center">
                                <Box
                                    ml={2}
                                    mt={2}
                                    mb={2}
                                    width="70px"
                                    height="90px"
                                    className={styles.MovieBorder}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundImage: `url(${movie.Thumbnail})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}
                                    onClick={() => {
                                        sendMovieInfo(movie);
                                    }}
                                ></Box>
                                <Box display="flex" flexDirection="column">
                                    <Typography variant="h6" ml={3} color="#ebebeb">{movie.Title}</Typography>
                                    <Typography variant="body2" ml={3} color="#ebebeb">Length: {movie.Length} minutes</Typography>
                                    <Typography variant="body2" ml={3} color="#ebebeb">Release Date: {new Date(movie.ReleaseDate).toLocaleDateString()}</Typography>
                                </Box>
                            </Box>
                        ))}

                    </Box>

                </Container>

                <Box mb={20}>

                </Box>

                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default CinemaPage;