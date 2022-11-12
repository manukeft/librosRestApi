const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const libros = require("./libros");

app.get("/", (req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  libros.find({}, {_id:0}, (err, libros) => {
    if (err)
      return res
        .status(500)
        .send({ error: "Problemas buscando todos los libros" });
    res.status(200).send(libros);
  });
});

app.get("/libro/:isbn", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  libros.findOne({ isbn: parseInt(req.params.isbn) }, (err, libro) => {
    if (err)
      return res.status(500).send({ error: "Problemas buscando el libro" });
    if (!libro) return res.status(404).send({ error: "404" });
    console.log(libro);
    res.status(200).send(libro);
  });
});

app.get("/autor/:autor", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  libros.findOne({ autor: req.params.autor }, (err, libro) => {
    if (err)
      return res
        .status(500)
        .send({ error: "Problemas buscando libros" });
    if (!libro)
      return res
        .status(404)
        .send({ error: "Libro no encontrado con el autor:" + req.params.autor });
    res.status(200).send(libro);
  });
});

app.get("/editorial/:editorial", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  libros.find({ editorial: req.params.editorial }, (err, libro) => {
    if (err) return res.status(500).send("Problemas buscando");
    if (!libro)
      return res
        .status(404)
        .send("Libro no encontrado con la editorial: " + req.params.editorial);
    res.status(200).send(libro);
  });
});

app.get("/year/:year", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  libros.findOne({ year: parseInt(req.params.year) }, (err, libro) => {
    if (err)
      return res.status(500).send({ error: "Problemas buscando el libro" });
    if (!libro) return res.status(404).send({ error: "404" });
    console.log(libro);
    res.status(200).send(libro);
  });
});

app.get("/search", function (req, res) {
  let search = req.query.search;

  let expSearch = new RegExp(search, "i");

  let busqueda = { "titulo": { $regex: expSearch } };

  res.header("Access-Control-Allow-Origin", "*");
  libros.find({ busqueda }, (err, libro) => {
    if (err) return res.status(500).send("Problemas buscando");
    if (!libro)
      return res
        .status(404)
        .send("Libro no encontrado con la editorial: " + req.params.editorial);
    res.status(200).send(libro);
  });
});



module.exports = app;
