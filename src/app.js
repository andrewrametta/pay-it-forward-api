require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const fileUpload = require("express-fileupload");
const uploadRouter = require("./uploads/upload-router");
const imgRouter = require("./img/img-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(express.json());
app.use(morgan(morganOption));
app.use(cors());
/*app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
*/
app.use(helmet());
app.use(fileUpload());

app.use("/api/uploads", uploadRouter);
app.use("/api/img", imgRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "product") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
