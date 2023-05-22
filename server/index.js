const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "moviebox",
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
  let sqlInsert;
  if (!birthday) {
    sqlInsert =
      "INSERT INTO users (Username, Email, Password, Birthday, DateCreated) VALUES (?, ?, ?, NULL, NOW());";
  } else {
    sqlInsert =
      "INSERT INTO users (Username, Email, Password, Birthday, DateCreated) VALUES (?, ?, ?, STR_TO_DATE(?, '%d/%m/%Y'), NOW());";
  }
  db.query(sqlInsert, [username, email, password, birthday], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Username or Email already exists" });
    }
  });
  res.status(200).json({ msg: "User created" });
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
      res.json({ exists });
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
  const sqlInsert =
    "SELECT * FROM users WHERE (username = ? OR email=?) AND password = ?;";
  db.query(
    sqlInsert,
    [usernameORemail, usernameORemail, password],
    (err, result) => {
      if (err) {
        console.log(err);
        req.setEncoding({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ msg: "Wrong username/email or password" });
        }
      }
    }
  );
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
  const {actorId}= req.body;
  const sqlInsert = "INSERT INTO actors (firstName, lastName, actorPic, gender, description, dateOfBirth) VALUES ( ?, ?, ?, ?, ?, ?);";
  db.query(sqlInsert, [firstName, lastName, actorPic, gender, description, dateOfBirth], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ msg: "Actor already exists" });
    }
  });
  res.status(200).json({ msg: "Actor added" });
});

app.get("/api/getActor", (req, res) => {
  const { firstName, lastName, actorPic, gender, description, dateOfBirth }= req.body;
  const sqlGet= "SELECT * FROM actors WHERE ActorId=?";
  db.query(sqlGet, [firstName, lastName, actorPic, gender, description, dateOfBirth], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while checking the username" });
    } else {
      res.status(200).json({ msg: "Actor pulled successfully", results });
    }
  });
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
      res.status(200).json({ msg: "Number of movies pulled successfully", results });
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
  const sqlGet = "SELECT * FROM actors WHERE actorId IN (SELECT actorId FROM movies_actors WHERE movieId = ?);";
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




/////////

// app.get("/", (req, res) => {
//     const sqlInsert =
//       "INSERT INTO users (Username, Password, Email, Bio) VALUES ('butaa', 'pass','buta@gmail.com','bio');";
//     db.query(sqlInsert, (err, result) => {
//       console.log("error", err);
//       console.log("result", result);
//     });
//     res.send("hello express");
// });
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL server:", err);
//   } else {
//     console.log("Connected to MySQL server.");
//   }
// });

// const movieName = "The Shawshank Redemption";
// const movieRating = "9.3";
// const sqlInsert = `INSERT INTO movie_reviews (movieName, movieRating) VALUES ('${movieName}', '${movieRating}');`;
// db.query(sqlInsert, (err, result) => {
//     if (err) {
//         console.error('Error executing query:', err);
//     } else {
//         console.log('Query executed successfully:', result);
//     }
// });

// app.use(express.static(__dirname));

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });
