const express = require("express");
const app = express();

const db = require("./db");

const librosController = require("./libros/librosController");

// La Rest API queda en /
// app.use en este caso le indica que use lo que está en la constante librosController
app.use("/", librosController);

const port = "8080";

app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
