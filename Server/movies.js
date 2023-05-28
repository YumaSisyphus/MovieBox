const axios = require('axios');
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root123',
    database: 'moviesystem',
});

// Function to fetch movie data from TMDb API
async function fetchMovieData() {
  try {
    const url = `https://api.reelgood.com/v3.0/content/random?availability=onSources&content_kind=movie&free=false&minimum_imdb=8&nocache=true&region=us&sources=netflix&spin_count=1`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error.message);
    throw error;
  }
}

// Function to save movie data to MySQL database
async function saveMovieData(movieData) {
  try {
    const { title, id } = movieData;

    const query = 'INSERT INTO movies (name, image) VALUES (?, ?)';
    const values = [title, `https://img.rgstatic.com/content/movie/${id}/poster-780.webp`];

    db.query('INSERT INTO movies (name, image) VALUES (?, ?)',
     [title, `https://img.rgstatic.com/content/movie/${id}/poster-780.webp`],
      (err,result) => {
        if(err) {
            console.log(err);
        } else {
            console.log("values inserted")
        }
     }
     );
    console.log('Movie data saved to the database.');
  } catch (error) {
    console.error('Error saving movie data:', error.message);
    throw error;
  }
}

(async () => {
  try {
    for (let index = 0; index < 2; index++) {
        const movieData = await fetchMovieData();
        await saveMovieData(movieData);
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();