const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movies } = require("./models/movies.model");

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", async (req, res) => {
  res.send("Hello, Express! This is Redux Practice 2");
});

app.get("/movies", async (req, res) => {
  try {
    const allMovies = await Movies.find();
    res.status(200).json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/movies", async (req, res) => {
  try {
    const { movieTitle, director, genre } = req.body;
    const newMovie = new Movies({ movieTitle, director, genre });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const deletedMovie = await Movies.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ error: "Movies not found!" });
    }
    res.status(200).json({
      message: "Movie Deleted SuccessFully!!",
      movie: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
