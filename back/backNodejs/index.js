const dotenv = require('dotenv').config();
require("./connection");
const express = require("express");
const routes = require("./router/index")
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const createError = require("http-errors");
const { errorHandler } = require("./middleware/error.handler");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", routes )
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
