const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "moviebox",
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
    } else {
        console.log('Connected to MySQL server.');
    }
});

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM users;"
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params
    const sqlRemove = "DELETE FROM users WHERE UserID=?;"
    db.query(sqlRemove, [id], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params
    const sqlGet = "SELECT * FROM users WHERE UserID = ?;"
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
})

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    const sqlUpdate = "UPDATE users SET Username = ?, Email = ?, Password = ? WHERE UserID = ?;"
    db.query(sqlUpdate, [name, email, password, id], (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send(result)
    })
})

app.post("/api/post", (req, res) => {
    const { name, email, password } = req.body
    const sqlInsert = "INSERT INTO users (Username, Email, Password, Bio, ProfilePic) VALUES (?, ?, ?, 'bio', 'profile.png');"
    db.query(sqlInsert, [name, email, password], (error, result) => {
        if (error) {
            console.log(error)
        }
    })
})


app.use(express.static(__dirname));

app.get("/*", (req, res) => {
    // res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(5000, () => {
    console.log("server started on port 5000")
})