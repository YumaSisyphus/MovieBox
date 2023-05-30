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
    database : "moviebox"
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





app.get("/api/get/:id", (req, res)=>{
    const { id } = req.params;
    const sqlGet = "SELECT * FROM movies WHERE MovieId = ?";
    db.query(sqlGet, id,  (error, result)=>{
      if(error){
        console.log(error);
      }
        res.send(result)
    })
});