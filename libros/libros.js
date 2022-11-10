const mongoose = require("mongoose");
const librosSchema = new mongoose.Schema({
  isbn: {
    type: Number,
    unique: true
  },
  titulo: String,
  autor: String,
  year: Number,
  pais: String,
  editorial: String
});
mongoose.model("libros", librosSchema);
module.exports = mongoose.model("libros");
