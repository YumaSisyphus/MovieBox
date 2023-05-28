import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import axios from "axios";

const MoviePage = () => {
  const location = useLocation();
  const actor_movie = location.state?.movie;
  const movies_movie = location.state?.movies;
  const [activeList, setActiveList] = useState("cast");
  const [actors, setActors] = useState([]);
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchActors = async () => {
      try {
        const movieId = actor_movie?.MovieId || movies_movie?.MovieId;
        const responseActors = await axios.get(
          `/api/getMovieActors/${movieId}`
        );
        const responseMovies = await axios.get(`/api/getMovie/${movieId}`);
        setMovie(responseMovies.data.results[0]);
        setActors(responseActors.data.results);
      } catch (error) {
        console.error("Error fetching actors:", error);
      }
    };
    fetchActors();
  }, []);
  console.log(movie);
  const sendActorInfo = (actor) => {
    navigate("/ActorPage", { state: { actor } });
  };

  return (
    <div className={styles.movie_page}>
      <Header />
      <div className={styles.movie}>
        <div
          className={styles.movie_background}
          style={{
            backgroundImage: `url(${movie.Cover})`,
          }}
        >
          {" "}
        </div>
        <div className={styles.container}>
          <div className={styles.movie_img}>
            <img src={movie.Thumbnail} />
          </div>
          <div className={styles.movie_details}>
            <h1 className={styles.movie_title}> {movie.Title}</h1>

            <p className={styles.movie_desc}> {movie.Description}</p>

            <ul className={styles.movie_labels}>
              <li
                className={activeList === "cast" ? `${styles.active}` : ""}
                onClick={() => setActiveList("cast")}
              >
                Cast
              </li>
              <li
                className={activeList === "crew" ? `${styles.active}` : ""}
                onClick={() => setActiveList("crew")}
              >
                Crew
              </li>
              <li
                className={activeList === "genres" ? `${styles.active}` : ""}
                onClick={() => setActiveList("genres")}
              >
                Genres
              </li>
              <li
                className={activeList === "details" ? `${styles.active}` : ""}
                onClick={() => setActiveList("details")}
              >
                Details
              </li>
            </ul>
            {activeList === "cast" && (
              <ul className={styles.movie_cast}>
                {actors.map((actor) => (
                  <li
                    onClick={() => {
                      sendActorInfo(actor);
                    }}
                    key={actor.ActorId}
                  >
                    {actor.FirstName} {actor.LastName}
                  </li>
                ))}
              </ul>
            )}

            {activeList === "crew" && (
              <ul className={styles.movie_crew}>
                <li> Crew 1</li>
                <li>Crew 2</li>
              </ul>
            )}

            {activeList === "genres" && (
              <ul className={styles.movie_genres}>
                <li> Genre 1</li>
                <li> Genre 2</li>
              </ul>
            )}

            {activeList === "details" && (
              <ul className={styles.movie_det}>
                <li> Detail 1C</li>
              </ul>
            )}
          </div>
          <div className={`${styles.logged_out} ${styles.review}`}>
            <div className={styles.review_1}> Sign in to leave a review</div>
            <div className={styles.review_2}> Share</div>
          </div>

          {/* <div className={`${styles.logged_in} ${styles.review}`} >
                <div> Watch -  Watchlist </div>
                <div>  Rate </div>
                <div> Add to a list</div>
                 </div> */}
        </div>
      </div>

      <div className={styles.ticket}>Get Tickets</div>
      <Footer />
    </div>
  );
};

export default MoviePage;
