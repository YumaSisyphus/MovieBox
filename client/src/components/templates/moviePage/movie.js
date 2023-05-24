import { useEffect, useState } from "react";
import styles from "./style.module.css";
import movie from "../../../assets/movies/JohnWick4Thumbnail.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const MoviePage = () => {
  const location = useLocation();
  const actor_movie = location.state?.movie;
  console.log(actor_movie);
  const [activeList, setActiveList] = useState("cast");
  const [actors, setActors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchActors = async () => {
      const movieId = actor_movie?.MovieId || 1;
      const response = await fetch(`/api/getMovieActors?movieId=${movieId}`);
      const data = await response.json();
      if (response.ok) {
        setActors(data.results);
      } else {
        console.error(data.error);
      }
    };
    fetchActors();
  }, []);
  const sendActorInfo = (actor) => {
    navigate("/ActorPage", { state: { actor } });
  };
  return (
    <div className={styles.movie_page}>
      <Header />
      <div className={styles.movie}>
        <div className={styles.movie_background}> </div>
        <div className={styles.container}>
          <div className={styles.movie_img}>
            <img src={movie} />
          </div>
          <div className={styles.movie_details}>
            <h1 className={styles.movie_title}> John Wick: Chapter 4</h1>

            <p className={styles.movie_desc}>
              {" "}
              With the price on his head ever increasing, John Wick uncovers a
              path to defeating The High Table. But before he can earn his
              freedom, Wick must face off against a new enemy with powerful
              alliances across the globe and forces that turn old friends into
              foes.
            </p>

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
              // <ul className={styles.movie_cast}>
              //   <li> Keanu Reeves </li>
              //   <li> Donnie Yen </li>
              //   <li> Bill Skarsgard</li>
              //   <li> Ian McShane</li>
              //   <li> Laurence Fishburne</li>
              //   <li> Lance Reddick </li>
              //   <li> Clancy Brown </li>
              //   <li> Hirouky Sanada</li>
              //   <li> Actor 8</li>
              //   <li> Actor 8</li>
              //   <li> Actor 8</li>
              //   <li> Actor 8</li>
              //   <li> Actor 8</li>
              // </ul>
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
