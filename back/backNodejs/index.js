require("./connection");
const express = require("express");
const Book = require("./models/Book");
const User = require("./models/User");
const routes = require("./router/index")
const app = express();

app.use(express.json());
app.use("/", routes )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
