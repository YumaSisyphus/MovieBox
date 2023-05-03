const express = require("express")
const app = express()
const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "movies",
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
    } else {
        console.log('Connected to MySQL server.');
    }
});

const movieName = "The Shawshank Redemption";
const movieRating = "9.3";
const sqlInsert = `INSERT INTO movie_reviews (movieName, movieRating) VALUES ('${movieName}', '${movieRating}');`;
db.query(sqlInsert, (err, result) => {
    if (err) {
        console.error('Error executing query:', err);
    } else {
        console.log('Query executed successfully:', result);
    }
});


app.use(express.static(__dirname));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(5000, () => {
    console.log("server started on port 5000")

})