let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

let userModel = require("../models/user");
let User = userModel.User; 
const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "secret";



//display home page
module.exports.displayHomePage = (req, res, next) => {
  res.render("content/home");
};

module.exports.processLoginPage = function (req, res, next)
{

  if (req.url.endsWith("/login") && req.method == "POST")
  {
    if (req.body && req.body.name == USERNAME && req.body.password == PASSWORD)
    {
      let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
      res.json({ success: true, token: token });
    }
    else
    {
      res.json({ success: false });
    }
    res.end();
    return;
  }
  else if (requiresAuth(req.method, req.url))
  {
    let token = req.headers["authorization"] || "";
    if (token.startsWith("Bearer<"))
    {
      token = token.substring(7, token.length - 1);
      try
      {
        jwt.verify(token, APP_SECRET);
        next();
        return;
      }
      catch (err)
      { }
    }
    res.statusCode = 401;
    res.end();
    return;
  }
  next();
}

function requiresAuth(method, url)
{
  return (mappings[method.toLowerCase()] || [])
    .find(p => url.startsWith(p)) !== undefined;
}

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({success: true, msg: 'User Successfully Logged out!'});
};

//display error page
module.exports.displayErrorPage = (req, res) => {
    res.render("errors/404", { title: "Error" });
  };