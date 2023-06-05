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
import Navbar from "../../Profile Navbar/Navbar";

const Watchlist = () => {
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
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
          }}
      >
        <Header />
        <Container maxWidth="md" style={{ flex: "1 0 auto" }}>
          <Navbar />

          <Typography ml={2} mt={5} variant="h6" color="#ebebeb">
            Watchlist
          </Typography>
          <hr
            style={{
              border: "1px solid #8f8f8f",
              marginLeft: "2%",
              width: "95%",
            }}
          />
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
                  cursor: "pointer"
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