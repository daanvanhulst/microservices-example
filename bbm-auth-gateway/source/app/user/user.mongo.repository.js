'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://192.168.99.100:28003/User');

const UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

UserSchema.pre('save', function(next) {
    var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

// create a user a new user
var testUser = new User({
    username: 'daanvanhulst',
    password: 'supersafe'
});

// save user to database
testUser.save(() => {
    console.log("added user");
    console.log(testUser);
});

exports.getUser = (username) => {
    console.log('Callin getUser in repo %s', username);
// fetch user and test password verification
  return User.findOne({ username: username });
};