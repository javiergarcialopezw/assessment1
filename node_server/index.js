const express = require("express");
const appConfig = require("./config/app");
var cors = require("cors");

// Configure app
const app = express();
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const router = require("./routes/route");
app.use(router);
app.listen(appConfig.PORT);
