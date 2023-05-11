const mongoose = require('mongoose');

/**
 * Admin User Schema
 * @private
 */
const adminUserSchema = new mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
   // required: true,
    minlength: 6,
    maxlength: 128,
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  gender: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  question: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  answer: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },

}, {
  timestamps: true,
});


/**
 * @typedef admin_users
 */
module.exports = mongoose.model('users', adminUserSchema);
