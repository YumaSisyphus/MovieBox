import { Box, Container, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./style.module.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import theme from "../../../utils/Themes";
import GrandBudapest from "../../../assets/GrandBudapest.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ActorPage = () => {
  const location = useLocation();
  const actor = location.state?.actor;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showMovies, setShowMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const actorId = actor?.ActorId;
        const response = await axios.get(`/api/getActorMovies/${actorId}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);
  console.log(movies);
  const sendMovieInfo = (movie) => {
    navigate("/MoviePage", { state: { movie } });
  };
  const handleInputShowMovies = (e) => {
    setShowMovies(!showMovies);
  };
  const handleInputShowFullDescription = (e) => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
        }}
      >
        <Container
          sx={{
            marginTop: "1%",
            border: "2px solid red",
            width: "80%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div
              style={{
                marginTop: "3%",
                marginRight: "10%",
                width: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                style={{
                  width: "100%",
                  border: "2px solid blue",
                  // maxHeight: { xs: 203, md: 167 },
                  // maxWidth: { xs: 350, md: 250 },
                }}
                alt={actor.FirstName + " " + actor.LastName}
                src={`images/actors/${actor.ActorPic}`}
              />
              <Typography
                style={{
                  marginTop: "5%",
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                }}
              >
                Chris Pratt (21.06.1979)
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "65%",
                marginTop: "2%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                }}
                marginBottom="1%"
              >
                Bio
              </Typography>
              <Typography
                style={{
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                  marginBottom: "2%",
                }}
              >
                {showFullDescription
                  ? actor.Description
                  : `${actor.Description.slice(0, 1000)}...`}
              </Typography>
              <IconButton
                onClick={handleInputShowFullDescription}
                disableRipple
                disableFocusRipple
                style={{ marginBottom: "2%", marginTop: "0%" }}
              >
                <Typography
                  style={{
                    fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                    color: "white",
                  }}
                >
                  See the rest
                </Typography>
                {showFullDescription ? (
                  <ArrowDropDownIcon color="white" />
                ) : (
                  <ArrowDropUpIcon color="white" />
                )}
              </IconButton>
            </div>
          </div>
          <Typography
            variant="h5"
            style={{
              fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
              color: "white",
              marginBottom: "-2%",
            }}
          >
            Movies they've starred in:
          </Typography>
          <div
            style={{
              marginTop: "5%",
              marginBottom: "5%",
              display: "flex",
              flexDirection: "row",
              alignContent: "left",
              gap: "8.7%",
              border: "2px solid green",
            }}
          >
            {movies.map((movie) => {
              return (
                <Box
                  width={150}
                  height={200}
                  className={styles.MovieBorder}
                  sx={{
                    backgroundImage: `url(${movie.Thumbnail})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                  }}
                  borderRadius="5px"
                  key={movie.MovieId}
                  onClick={() => {
                    sendMovieInfo(movie);
                  }}
                />
              );
            })}
          </div>
          {movies.length <= 4 ? (
            <></>
          ) : (
            <>
              <IconButton
                onClick={handleInputShowMovies}
                disableRipple
                disableFocusRipple
                style={{ marginBottom: "2%", marginTop: "2%" }}
              >
                <Typography
                  style={{
                    fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                    color: "white",
                  }}
                >
                  Load more movies
                </Typography>
                {showMovies ? (
                  <ArrowDropDownIcon color="white" />
                ) : (
                  <ArrowDropUpIcon color="white" />
                )}
              </IconButton>
              {showMovies ? (
                <></>
              ) : (
                <div style={{ marginTop: "-5%" }}>
                  {" "}
                  <div
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "left",
                      gap: "8.7%",
                      border: "2px solid green",
                    }}
                  >
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "left",
                      gap: "8.7%",
                      border: "2px solid green",
                    }}
                  >
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                      display: "flex",
                      flexDirection: "row",
                      alignContent: "left",
                      gap: "8.7%",
                      border: "2px solid green",
                    }}
                  >
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                    <Box
                      width={150}
                      height={200}
                      className={styles.MovieBorder}
                      sx={{
                        backgroundImage: `url(${GrandBudapest})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                      }}
                      borderRadius="5px"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
};
export default ActorPage;
