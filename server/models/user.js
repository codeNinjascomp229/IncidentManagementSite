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
      required: 'username is required'
    },
    password: 
    {
      type: String,
      default: '',
      required: 'password is required'
    },
    email: 
    {
      type: String,
      default: '',
      trim: true,
      required: 'email address is required'
    },
    contactNumber: 
    {
      type: String,
      default: '',
      trim: true,
      required: 'Contact Number is required'
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