const mongoose = require("mongoose");
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema(
  {
    name: {
     type: String,
     required: [true, 'Please enter your name']
    },
    email: {
      type: String,
      unique: [true, 'That email already exists'],
      required: [true, 'Please enter an email'],
      validate: [isEmail, 'Please enter a valid email'],
      lowercase: [true, 'Please use only lowercase']
    },
    password: {
      type: String,
      required:[true, 'Please enter a password'],
      minlength:[6, 'Minimum password length is 6 characters']
    },
    role: String,
    confirmed: Boolean,
    role: "",
    tokens: [],
  },
  { timestamps: true },

);
 //fire a function after doc saved to db
UserSchema.post('save', function (doc, next) {
  console.log('new user was created & saved', doc)
  next();
})

//fire a function before doc saved to db
UserSchema.pre('save', function(next){
  console.log('user about to be created & saved', this)
  next();
})

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique',doc));
  } else {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
