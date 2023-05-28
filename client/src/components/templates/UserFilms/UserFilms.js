import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "./UserFilms.module.css";
import { Box, Container, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const UserFilms = () => {
    const [movies, setMovies] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { UserID } = token[0];

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`/api/movieswatchedThumbnails/${UserID}`);
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        console.log(movies)
        fetchMovies();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
                }}
            >
                <Header />
                <Container maxWidth="md">
                    <Typography
                        ml={2}
                        fontSize="16px"
                        mt={5}
                        className={styles.Watched}
                    >
                        Watched
                    </Typography>
                    <Box display="flex" flexWrap="wrap" mt={2} mb={5}>

                        {movies.map((movie) => (
                            <Link
                                key={movie.movieId}
                                to="/"
                                style={{
                                    width: "134px",
                                    height: "170px",
                                    marginRight: "2%",
                                    marginBottom: "4%",
                                    marginLeft: "2%"
                                }}
                            >
                                <Box
                                    width="100%"
                                    height="100%"
                                    className={styles.MovieBorder}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundImage: `url(${movie.thumbnail})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}
                                ></Box>
                            </Link>
                                
                        ))}

                    </Box>
                </Container>

                <Footer />
            </div>
        </ThemeProvider>

    )
}

export default UserFilms;