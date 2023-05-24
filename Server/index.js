const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'moviesystem',
});
app.post('/create', (req, res) => {
    const name = req.body.name;
    const image = req.body.image;

    db.query('INSERT INTO movies (name,image) VALUES (?,?)',
     [name,image],
      (err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values inserted")
        }
     }
     );
});
app.get('/movies', (req,res) => {
    db.query('SELECT * FROM movies', (err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req,res) => {
    const id = req.body.id;
    const name = req.body.name;
    const image = req.body.image;
    db.query('UPDATE movies SET name = ?, image = ? WHERE id = ?', 
    [name,image,id], (err,result) => {
        if(err) {
            console.log(err);
        } else {
           res.send(result)
        }
    } )
    
});

// app.delete()

app.listen(3001,() => {
    console.log("Yay, your server do be running");
});