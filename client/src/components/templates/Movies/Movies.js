import {
  Box,
  Container,
  Grid,
  Rating,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import axios from "axios";
import styled from "@emotion/styled";
import StarRateIcon from '@mui/icons-material/StarRate';

const Movies = () => {
  const [movies, setMovies] = useState([]);
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

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
        }}
      >
        <Header />
        <Container maxWidth="md">
          <Typography ml={2} fontSize="16px" mt={5} className={styles.Watched}>
            Movies
          </Typography>
          <Box display="flex" flexWrap="wrap" mt={2} mb={5}>
            {movies.map((movie) => (
              <>
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography color="inherit">{movie.Title}</Typography>
                      <em>{movie.Length}</em> <b>{"minutes"}</b>{" "}<em style={{float: "right", fontSize: "12px"}}>{"5"}{<StarRateIcon/>}</em>
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
        </Container>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Movies;
