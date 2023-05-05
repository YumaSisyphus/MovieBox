const express = require('express')
const app = express();
const mysql = require('mysql')
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database: 'moviesystem',

});

app.post('/create', (req,res) => {
    const name = req.body.name;
    const hours = req.body.hours;
    const minutes = req.body.minutes;
    const rating = req.body.rating;
    const numberReviews = req.body.numberReviews;
    const price = req.body.price;
    const image = req.body.image;

    db.query('INSERT INTO movies (name, hours, minutes, rating, numberReviews, price, image) VALUES (?,?,?,?,?,?,?) ',
     [name, hours, minutes, rating, numberReviews, price, image], 
     (err,result) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Values Inserted")
        }
     }
     );
});

app.listen(3001, ( ) => {
    console.log("Yey, your server is running");
})