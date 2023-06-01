import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "./Watchlist.module.css";
import { Box, Container, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Watchlist = () =>{
    const [movies, setMovies] = useState({});
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { UserID } = token[0];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`/api/watchlist/${UserID}`);
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        console.log(movies)
        fetchMovies();
    }, []);

    const sendMovieInfo = (movie) => {
        navigate("/MoviePage", { state: { movie } });
    };


    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
                }}
            >
                <Header />
                <Container maxWidth="md">
                <ul className={styles.Navbar1}>
          <li>
              <Link to="/profile" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Profile
                </Typography>
              </Link>
            </li>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "70%",
              justifyContent: "space-around",
            }}
          >
            <li>
              <Link to="/usermovie" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText} display="flex" style={{ marginTop: "1px" }}>
                  Watched
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Watchlist
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/favorite" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText} display="flex" style={{ marginTop: "1px" }}>
                  Favorite
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/actorPage" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Lists
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/cinemas" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Reviews
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/cinemas" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Payment history
                </Typography>
              </Link>
            </li>
          </div>
        </ul>
                    <Typography
                        ml={2}
                        fontSize="16px"
                        mt={3}
                        className={styles.Watched}
                    >
                        Watchlist
                    </Typography>
                    <Box display="flex" flexWrap="wrap" mt={2} mb={5} gap={4.5} ml={2}>

                        {Array.isArray(movies) && movies.map((movie) => (
                            <Box
                                className={styles.MovieBorder}
                                sx={{
                                    width: "130px",
                                    height: "170px",
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
                </Container>

                <Footer />
            </div>
        </ThemeProvider>

    )
}

export default Watchlist;