const mongoose = require('mongoose');

// define the User model schema
const UserSchema = new mongoose.Schema({

  local: {
      email        : {
        type: String,
        index: {unique: true}
      },
      password     : String,
      firstName    : String,
      lastName     : String,
      resetPasswordToken: String,
      resetPasswordExpires: Date
  }
});


module.exports = mongoose.model('User', UserSchema);