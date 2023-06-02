const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2")
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db= mysql.createPool({
    host: "localhost",
    user: "root",
    password : "leart",
    database : "moviebox2"
});

app.get("/",(req, res)=>{
    
    res.send("Express");
});

app.get("/api/get", (req, res)=>{
    const sqlGet = "SELECT * FROM movies";
    db.query(sqlGet, (error, result)=>{
        res.send(result)
    })
});

app.listen((5000),()=>{
    console.log("This server is running on port 5000")
});





app.get("/api/getMovie/:id", (req, res)=>{
    const { id } = req.params;
    const sqlGet = "SELECT * FROM movies WHERE MovieId = ?";
    db.query(sqlGet, id,  (error, result)=>{
      if(error){
        console.log(error);
      }
        res.send(result)
    })
});


app.get("/api/getActorsByMovie/:movieId", (req, res) => {
    const { movieId } = req.params;
    const sqlGet = "SELECT * FROM actors JOIN movies_actors ON actors.ActorID = movies_actors.ActorID WHERE movies_actors.MovieID = ?";
  
    db.query(sqlGet, [movieId], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred");
        return;
      }
      res.send(result);
    });
  });

  app.get("/api/getDirectorsByMovie/:movieID", (req, res) => {
    const { movieID } = req.params;
    const sqlGet = "SELECT * FROM directors WHERE movieID = ?";
  
    db.query(sqlGet, [movieID], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred");
        return;
      }
      res.send(result);
    });
  });








  app.post("/api/post/watched", (req, res) => {
    const { MovieID, UserID } = req.body;
    const sqlInsert = `INSERT INTO rate_watched(MovieID, UserID, Watched) VALUES(?, ?, 1) `;
    db.query(sqlInsert, [MovieID, UserID], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while inserting data.");
      } else {
        res.status(200).send("Data inserted successfully.");
      }
    });
  });




  app.put("/api/removeWatched/:MovieID/:UserID", (req, res)=>{
    const { MovieID, UserID } = req.params;
    const sqlUpdate = "UPDATE rate_watched SET name = ?, email = ?, contact = ? WHERE MovieID = ? AND UserID = ?  ";
    db.query(sqlUpdate, [MovieID, UserID,],  (error, result)=>{
      if(error){
        console.log(error);
      }
        res.send(result)
    })
  });



  app.post("/api/post/favorite", (req, res) => {
    const { MovieID, UserID } = req.body;
    const sqlInsert = `INSERT INTO rate_watched(MovieID, UserID, Favorite) VALUES(?, ?, 1) `;
    db.query(sqlInsert, [MovieID, UserID], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while inserting data.");
      } else {
        res.status(200).send("Data inserted successfully.");
      }
    });
  });

  app.post("/api/post/watchlist", (req, res) => {
    const { MovieID, UserID } = req.body;
    const sqlInsert = `INSERT INTO watchlist(MovieID, UserID) VALUES(?, ?) `;
    db.query(sqlInsert, [MovieID, UserID], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send("An error occurred while inserting data.");
      } else {
        res.status(200).send("Data inserted successfully.");
      }
    });
  });
  

