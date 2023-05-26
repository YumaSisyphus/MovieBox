const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
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

app.listen(5000, () => {
  console.log("server started on port 5000");
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/users", (req, res) => {
  const sqlGet = "SELECT * FROM users";
  db.query(sqlGet, (err, result) => {
    res.send({ users: result, totalUsers: result.length });
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Error" });
    }
  });
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
  const userId = req.params.id;
  const { password } = req.body;
  const sqlSelect = "SELECT * FROM users WHERE UserID =?;";
  db.query(sqlSelect, [userId], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ msg: "An error occurred while changin password" });
    } else {
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
          if (err) {
            console.log(err);
            res.send({ msg: "An error occurred while changing the password" });
          } else if (isMatch) {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                res.status(401).json({
                  msg: "An error occurred during password encryption",
                });
              } else {
                const sqlUpdate =
                  "UPDATE users SET Password = ? WHERE UserID = ?;";
                db.query(sqlUpdate, [hash, userId], (err, result) => {
                  if (err) {
                    console.log(err);
                    res
                      .status(400)
                      .json({ msg: "Username or Email already exists" });
                  } else {
                    res.status(200).json({ msg: "User created" });
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
  const { profilePic, username, bio } = req.body;

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

    res.status(200).json({ message: "Profile updated successfully" });
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
});

app.get("/api/getAllMovies", (req, res) => {
  const sqlGet = "SELECT * FROM movie_reviews;";
  db.query(sqlGet, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Movies pulled successfully", results });
    }
  });
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
});

app.get("/api/getMovieActors", (req, res) => {
  const { movieId } = req.query;
  const sqlGet =
    "SELECT * FROM actors WHERE actorId IN (SELECT actorId FROM movies_actors WHERE movieId = ?);";
  db.query(sqlGet, [movieId], (err, results) => {
    console.log(results);
    if (err) {
      console.error(err);
      res.status(500).json({ err: "An error occurred." });
    } else {
      res.status(200).json({ msg: "Actors pulled successfully", results });
    }
  });
});

app.get("/api/getActorMovies", (req, res) => {
  const { actorId } = req.query;
  const sqlGet =
    "SELECT * FROM movies WHERE movieId IN (SELECT movieId FROM movies_actors WHERE actorId = ?);";
  db.query(sqlGet, [actorId], (err, results) => {
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
