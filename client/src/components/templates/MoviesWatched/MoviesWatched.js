import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "./MoviesWatched.module.css";
import { Box, Container, Rating, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Navbar from "../../Profile Navbar/Navbar";

const MoviesWatched = () => {
  const [movies, setMovies] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { UserID } = token[0];
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/movieswatched/${UserID}`);
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

  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
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

          <Navbar />

          <Typography ml={2} mt={5} variant="h6" color="#ebebeb">
            Watched
          </Typography>
          <hr
            style={{
              border: "1px solid #8f8f8f",
              marginLeft: "2%",
              width: "95.5%",
            }}
          />
          <Box display="flex" flexWrap="wrap" mt={2} mb={5} gap={4.5} ml={2}>

            {movies.map((movie) => (
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
          <Box display="flex" justifyContent="center" mb={9.4}>
            {ITEMS_PER_PAGE <= movies.length && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="secondary"
                size="large"
              />
            )}
          </Box>
        </Container>

        <Footer />
      </div>
    </ThemeProvider>

  )
}

export default MoviesWatched;