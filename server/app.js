/* Main Entry : app.js  Olivia Thomas  (301146636)  03-02-2021 */ 
const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  compress = require("compression"),
  session = require("express-session"),
  config = require("./server/config/env/development"),
  indexRoutes = require("./routes/index"),
  methodOverride = require('method-override'),
  passport = require('passport');

  
  let path = require('path');
  let cors = require('cors');
  let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
  //database setup 
  let mongoose = require('mongoose');
  let DB = require("./config/db");

  const app = express();

   //point mongoose to the DB URI 
   mongoose.connect(process.env.MONGODB_URI || DB.URI, 
   {useNewUrlParser: true,
    useUnifiedTopology: true
  }); 
   let mongoDB= mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'Connection Error: ')); 
    mongoDB.once('open',()=>{ 
      console.log('Connected to mongoDB...'); 
    });

    let indexRouter = require('../routes/index');
    let incidentsRouter = require('../routes/incidents');


process.env.NODE_ENV = process.env.NODE_ENV || "development";
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(compress());
}
app.use(cors());
//Serving static files
app.use(express.static("./public"));
app.use(methodOverride("_method"));

//Registering the middleware express-session
app.use(
  session({
    saveUninitialized: false,
    secret: config.sessionSecret,
    resave: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/api', indexRouter);
app.use('/api/incidents', incidentsRouter);

//* create a User Model Instance
let userModel = require('./models/user');
let User = userModel.User;

//* implement a User Authentication Strategy
passport.use(User.createStrategy());

//* serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//* To verify whether the token is being sent by the user and is valid*/
/* let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

//* find user from database
let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
  .then(user => {
    return done(null, user);
  })
  .catch(err => {
    return done(err, false);
  })
});

passport.use(strategy); */
 





app.use(function isLoggedIn(req,res,next){
  res.locals.user = req.user;
  next();
});
// set the view engine to ejs
app.set('views', path.join(__dirname, 'server/views'));
app.set("view engine", "ejs");

// Registering the routes 
app.use('/api', indexRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client/src/index.html"));
}); 

//Rerouting in case of non-existent routes
app.use((req, res, next) => {
  res.status(404).redirect('/error');
 })

 //Creates a Node.js web server at the specified port
app.listen(port, () =>
  console.log(`Express portfolio app listening on port ${port}!`)
);
