import { Container, Box, Typography } from "@mui/material";
import Header from "../../header/Header";
import Avatar from "../../../assets/movies/AvatarCover.jpg";
import AvatarTrailer from "../../../assets/movies/AvatarTrailer.jpeg";
import styles from "./style.module.css";
import Parasite from "../../../assets/movies/SevenThumbnail.jpg";
import GoodWill from "../../../assets/movies/GoodWillHuntingCover.jpg";
import DeadPoets from "../../../assets/DeadPoetsSocietyCover.jpg";
import GrandBudapest from "../../../assets/GrandBudapest.jpg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import BrendanFraser from "../../../assets/actors/BrendanFraser.jpg";
import Slider from "./slider/Carousel";
import SliderTheatre from "./theatreSlider/Carousel";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/api/getAllNewMovies`);
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
    <div
      style={{
        backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
      }}
    >
      <Header />

      <Box width="100%" height="80vh" sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Avatar})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            filter: "brightness(50%)",
            position: "absolute",
            zIndex: "0",
          }}
        ></Box>
        <Typography ml={100} pt={15} pr={20} className={styles.AvatarQuote}>
          UP AHEAD LIES PANDORA
        </Typography>

        <Typography
          zIndex="10"
          position="inherit"
          ml={117}
          mt={3}
          fontSize="34px"
          letterSpacing="2px"
          color="#ebebeb"
        >
          NOW IN CINEMAS
        </Typography>
        <Link
          to={"/Home"}
          style={{
            width: "200px",
            height: "140px",
            borderRadius: "7px",
            position: "absolute",
            top: "53%",
            left: "5%",
            textDecoration: "none",
          }}
        >
          <Typography zIndex="10" color="#b8b6b6" variant="body2" ml={6}>
            Trailer Out Now
          </Typography>
          <Box
            width="100%"
            height="100%"
            borderRadius="7px"
            className={styles.avatarTrailer}
            sx={{
              backgroundImage: `url(${AvatarTrailer})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              zIndex: 0,
              filter: "brightness(50%)",
            }}
          ></Box>
        </Link>
      </Box>

      <Container maxWidth="md">
        <Box mt={10}>
          <Typography color="#ebebeb">New On Moviebox</Typography>

          <hr />

          <Box display="flex" mt={2}>
            {movies.slice(0, 4).map((movie) => (
              <Link
                key={movie.movieId}
                to="/"
                style={{
                  width: "168px",
                  height: "220px",
                  marginRight: "7%",
                }}
              >
                <Box
                  width="168px"
                  height="220px"
                  className={styles.MovieBorder}
                  sx={{
                    borderRadius: "5px",
                    backgroundImage: `url(${movie.Thumbnail})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></Box>
              </Link>
            ))}
          </Box>
        </Box>

        <Box display="flex" mt={10}>
          <Box
            width="300px"
            height="220px"
            className={styles.MovieBorder}
            sx={{
              borderRadius: "5px",
              backgroundImage: `url(${BrendanFraser})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></Box>

          <Box width={500} ml={5} mt={10}>
            <Typography mb={2} variant="h5" color="#ebebeb">
              Brendan Fraser
            </Typography>
            <Typography color="#ebebeb">
              Brendan Fraser has won the best actor Oscar for The Whale at the
              Academy Awards in Los Angeles. Fraser stars as a morbidly obese
              teacher in the film, which was directed by Darren Aronofsky and
              adapted by Samuel D Hunter from his own play.
            </Typography>
          </Box>
        </Box>

        <Box mt={10}>
          <Slider />
        </Box>

        <Box mt={10}>
          <Typography color="#8f8f8f" mb={2} fontSize="24px" textAlign="center">
            Dive into Sensational Cinemas
          </Typography>
          <SliderTheatre />
        </Box>
      </Container>

      <Box mb={10}></Box>
      <Footer />
    </div>
  );
};

export default HomePage;
