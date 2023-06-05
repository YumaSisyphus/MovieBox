import {
  Box,
  Container,
  Grid,
  Rating,
  ThemeProvider,
  Tooltip,
  Typography,
  Pagination
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import theme from "../../../utils/Themes";
import axios from "axios";
import styled from "@emotion/styled";
import StarRateIcon from "@mui/icons-material/StarRate";
import Header from "../../header/Header";
import Footer from "../../footer/Footer"

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/getAllMovies`);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
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
        <Header/>
        <Container maxWidth="md">
          <Typography ml={2} mt={7} variant="h5" color="#ebebeb">
            Movies
          </Typography>
          <hr
            style={{
              border: "1px solid #8f8f8f",
              marginLeft: "2%",
              width: "95%",
            }}
          />
          <Box display="flex" flexWrap="wrap" mt={3} mb={3}>
            {paginatedMovies.map((movie) => (
              <>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{movie.Title}</Typography>
                      <em>{movie.Length}</em> <b>{"minutes"}</b>{" "}
                      <em style={{ float: "right", fontSize: "12px" }}></em>
                    </React.Fragment>
                  }
                  placement="top"
                  arrow
                >
                  <Box
                    key={movie.movieId}
                    className={styles.MovieBorder}
                    sx={{
                      width: "130px",
                      height: "170px",
                      marginRight: "2%",
                      marginBottom: "4%",
                      marginLeft: "2%",
                      borderRadius: "5px",
                      backgroundImage: `url(${movie.Thumbnail})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                    onClick={() => {
                      sendMovieInfo(movie);
                    }}
                  />
                </Tooltip>
              </>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" mb={9.4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="secondary"
              size="large"
            />
          </Box>
        </Container>

        <Footer/>
      </div>
    </ThemeProvider>
  );
};

export default Movies;

// {"5"}{<StarRateIcon/>}
