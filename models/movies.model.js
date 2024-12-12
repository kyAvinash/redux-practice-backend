const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieTitle: String,
  director: String,
  genre: String,
});

const Movies = mongoose.model("Movies", movieSchema);

module.exports = { Movies };
