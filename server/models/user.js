//* modules for user Model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

//***schema for users
let userSchema = mongoose.Schema
(
  {
    username: 
    {
      type: String,
      default: '',
      trim: true,
      
    },
    password: 
    {
      type: String,
      default: '',
      
    },
    email: 
    {
      type: String,
      default: '',
      trim: true,
      
    },
    contactNumber: 
    {
      type: String,
      default: '',
      trim: true,
      
    }
},
  {
    collection: "users"
  }
);

  //***configure options for User Model

let options = ({ missingPasswordError: 'Wrong/ Missing Password'});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);