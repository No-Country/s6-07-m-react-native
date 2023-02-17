const dotenv = require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./connection");

const routes = require("./router/index");
const app = express();
const { errorHandler } = require("./middleware/error.handler");
const specs = require("./swagger.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", routes);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
