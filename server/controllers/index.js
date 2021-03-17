let express = require("express");
let router = express.Router();

//display home page
module.exports.displayHomePage = (req, res, next) => {
  res.render("content/home");
};

//display error page
module.exports.displayErrorPage = (req, res) => {
    res.render("errors/404", { title: "Error" });
  };