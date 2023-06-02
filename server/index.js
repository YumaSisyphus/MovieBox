const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const axios = require("axios");
// const path = require("path");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "moviebox",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL server:", err);
  } else {
    console.log("Connected to MySQL server.");
  }
});

app.use(express.static(__dirname + "/public"));

// Error handler middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.get("/api/addMovieAPI/:page", (req, res) => {
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTVmMzdkYjM2NjJhYzhjMjQ2NmUxNmU1MTZjOWFlZiIsInN1YiI6IjYzYjlmZjY2YWU2ZjA5MDBiZDFkY2JlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hrmuK_7NqjFYAl8kwZa_5bN0z38T-22dhK4HIb_sYkU";

  // Fetch movie data from TMDB API
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
    .then((response) => {
      response.data.results.forEach((movie) => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);

            db.query(
              "INSERT INTO movies (Title, Description, ReleaseDate, Thumbnail, Cover, Length, Trailer) VALUES (?, ?, ?, ?, ?, ?, 'empty')",
              [
                response.data.title,
                response.data.overview,
                response.data.release_date,
                `https://image.tmdb.org/t/p/original${response.data.poster_path}`,
                `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
                response.data.runtime,
              ],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Movie data inserted");
                }
              }
            );
          })
          .catch((error) => {
            console.error("Error fetching movie data:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db= mysql.createPool({
    host: "localhost",
    user: "root",
    password : "leart",
    database : "moviebox2"
});

/*    
    Endpoint: Register
    Method: POST
    Parameters: username, email, password, birthday (birthday can be null)
*/

app.post("/api/register", (req, res) => {
  const { username, email, password, birthday } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res
        .status(401)
        .json({ msg: "An error occurred during password encryption" });
    } else {
      let sqlInsert;
      if (!birthday) {
        sqlInsert =
          "INSERT INTO users (Username, Email, Password, Birthday, DateCreated) VALUES (?, ?, ?, NULL, NOW());";
      } else {
        sqlInsert =
          "INSERT INTO users (Username, Email, Password, Birthday, DateCreated) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), NOW());";
      }
      db.query(sqlInsert, [username, email, hash, birthday], (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({ msg: "Username or Email already exists" });
        } else {
          res.status(200).json({ msg: "User created" });
        }
      });
    }
  });
});

/*    
    Endpoint: Check if user exists in Register
    Method: GET
    Parameters: username, email
*/

app.get("/api/checkUserRegister", (req, res) => {
  const { username, email } = req.query;
  const sqlGet = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(sqlGet, [username, email], (err, results) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while checking the username" });
    } else {
      const exists = results.length > 0;
      res.json({ exists, user: results[0] });
    }
  });
});

/* 
    Endpoint: Log in
    Method: POST
    Parameters: username or email, password
*/

app.post("/api/login", (req, res) => {
  const { usernameORemail, password } = req.body;
  const sqlSelect = "SELECT * FROM users WHERE username = ? OR email = ?;";
  db.query(sqlSelect, [usernameORemail, usernameORemail], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ msg: "An error occurred during login" });
    } else {
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
          if (err) {
            console.log(err);
            res.send({ msg: "An error occurred during login" });
          } else if (isMatch) {
            res.send(result);
          } else {
            res.send({ msg: "Wrong username/email or password" });
          }
        });
      } else {
        res.send({ msg: "Wrong username/email or password" });
      }
    }
  });
});

app.put("/api/editPassword/:id", (req, res) => {
  const id = req.params.id;
  const { password, newPassword } = req.body;
  const sqlSelect = "SELECT * FROM users WHERE UserID =?;";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ msg: "An error occurred while changing password" });
    } else {
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
          if (err) {
            console.log(err);
            res.send({ msg: "An error occurred while changing the password" });
          } else if (isMatch) {
            bcrypt.hash(newPassword, 10, (err, hash) => {
              if (err) {
                res.status(401).json({
                  msg: "An error occurred during password encryption",
                });
              } else {
                const sqlUpdate =
                  "UPDATE users SET Password = ? WHERE UserID = ?;";
                db.query(sqlUpdate, [hash, id], (err, result) => {
                  if (err) {
                    console.log(err);
                    res
                      .status(400)
                      .json({ msg: "Username or Email already exists" });
                  } else {
                    res
                      .status(200)
                      .json({ msg: "Password changed successfully" });
                  }
                });
              }
            });
          } else {
            res.send({ msg: "Wrong password" });
          }
        });
      } else {
        res.send({ msg: "Wrong password" });
      }
    }
  });
});

app.put("/api/editProfile/:id", (req, res) => {
  const userId = req.params.id;
  const { profilePic, username, email, bio } = req.body;
  const sqlSelect = "SELECT * FROM users WHERE UserID = ?";
  db.query(sqlSelect, [userId], (err, result) => {
    if (err) {
      console.error("Error selecting user:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving user data" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const updateUser = (field, value, message) => {
      if (value !== null && value !== result[0][field]) {
        const sqlUpdate = `UPDATE users SET ${field} = ? WHERE UserID = ?`;
        db.query(sqlUpdate, [value, userId], (err, result) => {
          if (err) {
            console.error(`Error updating ${field}:`, err);
            return res
              .status(500)
              .json({ error: `An error occurred while changing ${message}` });
          }
        });
      }
    };
    updateUser("ProfilePic", profilePic, "your profile picture");
    updateUser("Username", username, "your username");
    updateUser("Bio", bio, "your bio");
    updateUser("Email", email, "your email");
    res.status(200).json({ message: "Profile updated successfully" });
  });
});

app.get("/api/checkUsernameEdit/:username", (req, res) => {
  const { username } = req.params;
  const sqlSelect = "SELECT * FROM users WHERE Username = ?";
  db.query(sqlSelect, [username], (err, result) => {
    if (err) {
      console.error("Error checking username:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while checking the username" });
    }

    const exists = result.length > 0;
    res.status(200).json({ exists });
  });
});

app.get("/api/checkUsernameEditID/:id", (req, res) => {
  const { id } = req.params;
  const sqlSelect = "SELECT * FROM users WHERE UserID = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.error("Error checking userId:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while checking the userId" });
    }
    res.status(200).json(result[0].Username);
  });
});

app.get("/api/checkEmailEdit/:email", (req, res) => {
  const { email } = req.params;
  const sqlSelect = "SELECT * FROM users WHERE Email = ?";
  db.query(sqlSelect, [email], (err, result) => {
    if (err) {
      console.error("Error checking email:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while checking the email" });
    }

    const exists = result.length > 0;
    res.status(200).json({ exists });
  });
});

app.get("/api/checkEmailEditID/:id", (req, res) => {
  const { id } = req.params;
  const sqlSelect = "SELECT * FROM users WHERE UserID = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.error("Error checking email:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while checking the email" });
    }
    res.status(200).json(result[0].Email);
  });
});
/* 
    Endpoint: Add Movie
    Method: POST
    Parameters: movieName, movieRating, movieReview
*/
app.post("/api/addmovie", (req, res) => {
  const { movieName, movieRating, movieReview } = req.body;
  const sqlInsert = `INSERT INTO movie_reviews (movieName, movieRating, movieReview) VALUES (?, ?, ?);`;
  db.query(sqlInsert, [movieName, movieRating, movieReview], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Movie already exists" });
    }
  });
  res.status(200).json({ msg: "Movie added" });
});

app.post("/api/postActor", (req, res) => {
  const { actorId } = req.body;
  const sqlInsert =
    "INSERT INTO actors (firstName, lastName, actorPic, gender, description, dateOfBirth) VALUES ( ?, ?, ?, ?, ?, ?);";
  db.query(
    sqlInsert,
    [firstName, lastName, actorPic, gender, description, dateOfBirth],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Actor already exists" });
      }
    }
  );
  res.status(200).json({ msg: "Actor added" });
});

app.get("/api/getActor", (req, res) => {
  const { firstName, lastName, actorPic, gender, description, dateOfBirth } =
    req.body;
  const sqlGet = "SELECT * FROM actors WHERE ActorId=?";
  db.query(
    sqlGet,
    [firstName, lastName, actorPic, gender, description, dateOfBirth],
    (err, results) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ error: "An error occurred while checking the username" });
      } else {
        res.status(200).json({ msg: "Actor pulled successfully", results });
      }
    }
  );
});

app.get("/api/getMovie", (req, res) => {
  const { movieName, movieRating, movieReview } = req.body;
  const sqlGet = "SELECT * FROM movie_reviews WHERE movieName = ?;";
  db.query(sqlGet, [movieName, movieRating, movieReview], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Movie pulled successfully", results });
    }
  });

app.get("/api/getMovie/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM movies WHERE MovieId = ?;";
  db.query(sqlGet, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Movie pulled successfully", results });
    }
  });
});

app.get("/api/getAllMovies", (req, res) => {
  const sqlGet = "SELECT * FROM movies;";
  db.query(sqlGet, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Movies pulled successfully", results });
    }
  });
});

app.get("/api/getAllNewMovies", (req, res) => {
  const sqlGet = "SELECT * FROM movies ORDER BY ReleaseDate DESC";
  db.query(sqlGet, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Movies pulled successfully", results });
    }
  });

app.get("/api/numOfMoviesByActor", (req, res) => {
  const { actorId } = req.query;
  const sqlGet = "SELECT COUNT(*) FROM movie_reviews WHERE actorId = ?;";
  db.query(sqlGet, [actorId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res
        .status(200)
        .json({ msg: "Number of movies pulled successfully", results });
    }
  });

app.get("/api/getAllActors", (req, res) => {
  const sqlGet = "SELECT * FROM actors;";
  db.query(sqlGet, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Actors pulled successfully", results });
    }
  });

app.get("/api/getMovieActors/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "SELECT * FROM actors WHERE actorId IN (SELECT actorId FROM movies_actors WHERE movieId = ?);";
  db.query(sqlGet, [id], (err, results) => {
    console.log(results);
    if (err) {
      console.error(err);
      res.status(500).json({ err: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Actors pulled successfully", results });
    }
  });

app.get("/api/getActorMovies/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet =
    "SELECT * FROM movies WHERE movieId IN (SELECT movieId FROM movies_actors WHERE actorId = ?);";
  db.query(sqlGet, [id], (err, results) => {
    console.log(results);
    if (err) {
      console.error(err);
      res.status(500).json({ err: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Movies pulled successfully", results });
    }
  });
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM users;";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { userid } = req.params;
  const sqlRemove = "DELETE FROM users WHERE UserID=?;";
  db.query(sqlRemove, [userid], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/getUser/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM users WHERE UserID = ?;";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Error retrieving user data" });
    } else {
      res.send(result[0]);
    }
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const sqlUpdate =
    "UPDATE users SET Username = ?, Email = ?, Password = ? WHERE UserID = ?;";
  db.query(sqlUpdate, [name, email, password, id], (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, password } = req.body;
  const sqlInsert =
    "INSERT INTO users (Username, Email, Password, Bio, ProfilePic) VALUES (?, ?, ?, 'bio', 'profile.png');";
  db.query(sqlInsert, [name, email, password], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.post("/api/post", (req, res) => {
  const { username, email, password, birthday } = req.body;
  const sqlInsert =
    "INSERT INTO users (Username, Email, Password, Birthday) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'));";
  db.query(sqlInsert, [username, email, password, birthday], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// Get Movie id and thumbnail from all the movies

app.get("/api/movies", (req, res) => {
  const query = "SELECT MovieId, Thumbnail FROM movies";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const movies = results.map((result) => ({
        movieId: result.MovieId,
        thumbnail: result.Thumbnail,
      }));
      res.json(movies);
    }
  });
});

app.get("/api/movieswatchedcount/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT COUNT(MovieID) AS MoviesWatched FROM rate_watched WHERE Watched = 1 AND UserID = ?;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results[0].MoviesWatched);
    }
  });
});

app.get("/api/watchlistcount/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT COUNT(MovieID) AS Watchlist FROM watchlist WHERE UserID = ?;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results[0].Watchlist);
    }
  });
});

app.get("/api/lists/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT COUNT(ListID) AS Lists FROM lists WHERE UserID = ?;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results[0].Lists);
    }
  });
});

app.get("/api/genres/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT g.Genre, r.UserID FROM genre g JOIN movies m ON g.MoviesID = m.MovieID JOIN rate_watched r ON m.MovieID = r.MovieID WHERE r.UserID = ?;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/api/genresMovies/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM genre WHERE MoviesID IN(SELECT MovieID FROM movies WHERE MovieID =?)";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching genres:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Get favorite movies

app.get("/api/favorite/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM movies WHERE MovieId IN(SELECT MovieID FROM rate_watched WHERE Favorite = 1 AND UserID = ?);";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// Get watchlist movies

app.get("/api/watchlist/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM movies WHERE MovieId IN(SELECT MovieID FROM watchlist WHERE UserID = ?);";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching watchlist:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// Get Lists from database

app.get("/api/getLists", (req, res) => {
  const query =
    "SELECT * FROM lists WHERE ListID;";
  db.query(query,  (error, results) => {
    if (error) {
      console.error("Error fetching lists:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

// Get all Movies of a List

app.get("/api/getListMovies/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM movies WHERE MovieId IN(SELECT MoviesID FROM movies_lists WHERE ListsID = ?) LIMIT 1;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});


//Get Genres for a specific movie

app.get("/api/movieswatched/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT * FROM movies WHERE MovieId IN(SELECT MovieID FROM rate_watched WHERE Watched = 1 AND UserID = ?);";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});

//Inserting review into DB

app.post("/api/rateMovie", (req, res) => {
  const { movieId, userId, stars, watched, comment, favorite } = req.query;
  const query =
    "INSERT INTO rate_watched (MovieID, UserID, Stars, Watched, Comment, Favorite) VALUES (?,?,?,?,?,?)";
  db.query(
    query,
    [movieId, userId, stars, watched, comment, favorite],
    (error, results) => {
      if (error) {
        console.error("Error inserting review:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json({ msg: "Review added" });
      }
    }
  );
});

// MovieList get covers

app.get("/api/movieListCover", (req, res) => {
  const query = "SELECT MovieId, Cover FROM movies";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching movielistcover:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const movies = results.map((result) => ({
        movieId: result.MovieId,
        cover: result.Cover,
      }));
      res.json(movies);
    }
  });
});

// GET movie thumbnails for the cinema page

app.get("/api/theatremovies/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT m.Title, m.Length, m.Thumbnail FROM movies m INNER JOIN movies_cinema mc ON m.MovieId = mc.Movie_ID WHERE mc.Theatre_ID = ?;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});

// GET Cinema ID

app.get("/api/getCinema/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM theatre WHERE TheatreID = ?;";
  db.query(sqlGet, id, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "Error retrieving user data" });
    } else {
      res.send(results);
    }
  });
});

// Get all the Cinemas

app.get("/api/getAllCinemas", (req, res) => {
  const sqlGet = "SELECT * FROM theatre;";
  db.query(sqlGet, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Cinemas pulled successfully", results });
    }
  });
});

// Get Movies for Cinema

app.get("/api/getCinemaMovies/:id", (req, res) => {
  const { id } = req.params;
  const query =
    "SELECT m.* FROM movies m JOIN movies_cinema mc ON m.MovieID = mc.Movie_ID WHERE mc.Theatre_ID = ?;";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching movies watched:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json(results);
    }
  });
});
