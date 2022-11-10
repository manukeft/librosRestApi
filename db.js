require("dotenv").config();

const mongoose = require("mongoose");
const conexion = process.env.MONGOURL;
mongoose.connect(conexion, { useNewUrlParser: true, useUnifiedTopology: true });
