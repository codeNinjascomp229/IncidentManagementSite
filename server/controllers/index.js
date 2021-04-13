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

// * controller for processing Login page
module.exports.processLoginPage = (req,res, next) =>{
    // define a new user object
    
  
  passport.authenticate('local',
  (err, user, info) => {
      // server err?
      if(err)
      {
          return next(err);
      }
      //is there a user login error?
      if(!user)
      {
          return res.json({success: false, msg: 'Error: Failed to log in user!'});
      }

      req.login(user, (err) => {
          // server error?
          if(err)
          {
              return next(err);
          }

          const payload = 
          {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email
          }

          const authToken = jwt.sign(payload, DB.Secret, {
              expiresIn: 604800 // 1 week
          });
          
          return res.json({success: true, msg: 'User Logged in Successfully!', user: {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email
          }, token: authToken});

      });
  })(req, res, next);
}



// module.exports.processLoginPage = function (req, res, next) {

//   if (req.url.endsWith("/login") && req.method == "POST") {
//     if (req.body && req.body.name == USERNAME && req.body.password == PASSWORD) {
//       let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
//       res.json({ success: true, token: token });
//     }
//     else {
//       res.json({ success: false });
//     }
//     res.end();
//     return;
//   }
//   else if (requiresAuth(req.method, req.url)) {
//     let token = req.headers["authorization"] || "";
//     if (token.startsWith("Bearer<")) {
//       token = token.substring(7, token.length - 1);
//       try {
//         jwt.verify(token, APP_SECRET);
//         next();
//         return;
//       }
//       catch (err) { }
//     }
//     res.statusCode = 401;
//     res.end();
//     return;
//   }
//   next();
// }

function requiresAuth(method, url) {
  return (mappings[method.toLowerCase()] || [])
    .find(p => url.startsWith(p)) !== undefined;
}



module.exports.processRegisterPage = (req, res, next) => {
  // define a new user object
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    contactNumber: req.body.contactNumber
  });

  User.register(newUser, req.body.password, (err) => {
    if (err) {
      if (err.name == "UserExistsError") {
        //return res.json({success: false, msg: 'Username taken, please choose another username.'});
      }
      return res.json({ success: false, msg: 'Error: failed to create user.' });
    } else {
      // if no error exists, then registration is successful
      return res.json({ success: true, msg: 'User Registered Successfully!' });
      
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({ success: true, msg: 'User Successfully Logged out!' });
};

//display error page
module.exports.displayErrorPage = (req, res) => {
  res.render("errors/404", { title: "Error" });
};