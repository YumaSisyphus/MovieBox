import React, { useEffect, useState } from "react";
import styles from "./ProfileContainer.module.css";
import Header from "../../header/Header";
import {
  Box,
  Container,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Footer from "../../footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import theme from "../../../utils/Themes";
import Cookies from "universal-cookie";
import axios from "axios";

function ProfileContainer() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { UserID } = token[0];
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);
  const [movieswatched, setMoviesWatched] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [lists, setLists] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [genreCounts, setGenreCounts] = useState({});

  const fetchGenres = () => {
    return axios.get(`/api/genres/${UserID}`)
      .then((response) => {
        const genres = response.data;

        // Calculate genre counts
        const counts = {};
        genres.forEach((genre) => {
          const { Genre } = genre;
          if (counts[Genre]) {
            counts[Genre] += 10;
          } else {
            counts[Genre] = 10;
          }
        });

        setGenreCounts(counts);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  };

  useEffect(() => {
    fetchGenres();
  }, []);



  const fetchMoviesWatched = () => {
    return axios.get(`/api/movieswatchedcount/${UserID}`)
      .then((response) => setMoviesWatched(response.data));
  }
  useEffect(() => {
    fetchMoviesWatched();
  }, []);

  const fetchWatchlist = () => {
    return axios.get(`/api/watchlist/${UserID}`)
      .then((response) => setWatchlist(response.data));
  }
  useEffect(() => {
    fetchWatchlist();
  }, []);


  const fetchList = () => {
    return axios.get(`/api/lists/${UserID}`)
      .then((response) => setLists(response.data));
  }
  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/getUser/${UserID}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

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

  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const response = await axios.get(`/api/favorite/${UserID}`);
        setFavorite(response.data);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    fetchFavorite();
  }, []);

  const sendMovieInfo = (movie) => {
    navigate("/MoviePage", { state: { movie } });
  };

  const sendFavoriteInfo = (movie)=>{
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
          <Box mt={5} mb={8}>
            <Box display={"flex"}>
              <Box display={"flex"} flex={1}>
                <img
                  src={`${user.ProfilePic}`}
                  alt="Profile picture"
                  className={styles.profilePicture}
                />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Typography
                    variant="h3"
                    mb={"10px"}
                    className={styles.username}
                  >
                    {user.Username}
                  </Typography>

                  <Link className={styles.editButton} to="/editProfile">
                    Edit Profile
                  </Link>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent="space-around" mt={2}>
                <div className={styles.statsItem}>
                  <Typography
                    mr={1}
                    fontSize="16px"
                    className={styles.Watched}
                  >
                    Watched
                  </Typography>
                  <Typography className={styles.watchedNumber}>{movieswatched}</Typography>
                </div>
                <div className={styles.statsItem}>
                  <Typography
                    mr={1}
                    fontSize="16px"
                    className={styles.Watched}
                  >
                    Watchlist
                  </Typography>
                  <Typography className={styles.watchedNumber}>{watchlist}</Typography>
                </div>
                <div className={styles.statsItem}>
                  <Typography fontSize="16px" className={styles.Watched}>
                    Lists
                  </Typography>
                  <Typography className={styles.watchedNumber}>{lists}</Typography>
                </div>
              </Box>
            </Box>
            <Typography className={styles.bio} mt={2} width={600}>
              {user.Bio}
            </Typography>

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
              <Link to="/Movies" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Watchlist
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/usermovie" className={styles.Links}>
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

            <Box mt={10}>
              <Box>
                <Typography fontWeight="bold" color="#ebebeb">
                  Top Genres:
                </Typography>
              </Box>
              <Box display="flex" mt={3}>
                <Box mr={7}>
                  <Typography variant="body2" color="#ebebeb">
                    Drama
                  </Typography>
                  <LinearProgress
                    sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                    color="secondary"
                    variant="determinate"
                    value={genreCounts["Drama"] || 0}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="#ebebeb">
                    Sci-Fi
                  </Typography>
                  <LinearProgress
                    sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                    color="secondary"
                    variant="determinate"
                    value={genreCounts["Sci-Fi"] || 0}
                  />
                </Box>
              </Box>
              <Box display="flex" mt={5}>
                <Box mr={7}>
                  <Typography variant="body2" color="#ebebeb">
                    Comedy
                  </Typography>
                  <LinearProgress
                    sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                    color="secondary"
                    variant="determinate"
                    value={genreCounts["Comedy"] || 0}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" color="#ebebeb">
                    Action
                  </Typography>
                  <LinearProgress
                    sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                    color="secondary"
                    variant="determinate"
                    value={genreCounts["Action"] || 0}
                  />
                </Box>
              </Box>
            </Box>

            <Box mt={5}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography fontWeight="bold" color="#ebebeb">
                  Favorite Films:
                </Typography>
              </Box>
              <hr style={{ border: "1px solid #8f8f8f" }} />

              <Box display="flex" mt={2} gap={7}>
                {favorite?.slice(0, 4).map((movie) => (
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
                    onClick={() => {
                      sendFavoriteInfo(movie);
                    }}
                  ></Box>
                ))}
              </Box>
            </Box>
            <Box mt={5}>
              <Box display={"flex"} justifyContent="space-between">
                <Typography fontWeight="bold" color="#ebebeb">
                  Watched:
                </Typography>

                <Link to="/usermovie" className={styles.Links}>
                  <Typography fontWeight="bold" color="#ebebeb">
                    More...
                  </Typography>
                </Link>
              </Box>
              <hr style={{ border: "1px solid #8f8f8f" }} />

              <Box display="flex" mt={2} gap={7}>
                {movies.slice(0, 4).map((movie) => (
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
                    onClick={() => {
                      sendMovieInfo(movie);
                    }}
                  ></Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default ProfileContainer;
