const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const httperror = require("http-errors");
var cors = require("cors");
const config = require("./config");
const routes = require("../routes/main_route");


const app = express();

if (config.env === "development") {
    app.use(logger("dev"));
}

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);
app.use((req, res, next) => {
  let error = new httperror(404);
  next(error);
});

app.use((err, req, res, next) => {
  if (err.isJoi) {
    err.message = err.details.map((e) => e.message).join(";");
    err.status = 400;
  }
  res.status(err.status || 500).json({
    message: err.message,
  });
  next(err);
});

module.exports = app;