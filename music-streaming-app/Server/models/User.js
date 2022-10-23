const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

// Schema for a user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter your name"]
  },
  phone: {
    type: Number,
    // required: [true, "Please enter your phone number"]
  },
  email: {
    type: String,
    // required: [true, 'Please enter an email'],
    // unique: true,
    // lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    // required: [true, 'Please enter a password'],
    // minlength: [6, 'Minimum password length is 6 characters'],
    // validate: [isStrongPassword, "Weak Password"]
  },
  googleId: String,
  role: String,
  oAuthUser: Boolean
});

userSchema.plugin(findOrCreate);

// fire a function to encrypt the password before doc saved to db
userSchema.pre('save', async function(next) {
  if (this.password) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
  }
});

// Static method to login user
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({email});
  if(user) {
    if(user.password) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth){
      return user;
    }
    return {
      success: false,
      message: "Incorrect password"
    }
   
}
  if(user.googleId){
  return user;
}
}
return {
      success: false,
      message: "Incorrect email"
    }
  
}
const User = mongoose.model('user', userSchema);

module.exports = User;