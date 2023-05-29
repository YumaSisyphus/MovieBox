import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "./Cinemas.module.css";
import { Box, Container, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Cinemas = () => {
    const [movies, setMovies] = useState([]);
    const [theatre, setTheatre] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { UserID } = token[0];

    useEffect(() => {
        const fetchTheatreCover = async () => {
            try {
                const response = await axios.get(`/api/TheatresCover`);
                setTheatre(response.data);
            } catch (error) {
                console.error("Error fetching cover from theatre:", error);
            }
        };
        console.log(theatre)
        fetchTheatreCover();
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
                    <Box display="flex" flexWrap="wrap" mt={2} mb={5} gap={3}>

                        {theatre.map((cinema) => (
                            <Link
                                key={cinema.theatreId}
                                to="/"
                                style={{
                                    width: "158px",
                                    height: "210px",
                                    marginRight: "2%",
                                    marginLeft: "2%"
                                }}
                            >
                                <Box
                                    width="158px"
                                    height="210px"
                                    className={styles.MovieBorder}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundImage: `url(${cinema.cover})`,
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

export default Cinemas;