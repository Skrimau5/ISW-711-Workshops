const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const career = new Schema({
  name: { type: String },
  description: { type: String },
  code: { type: String }
});

module.exports = mongoose.model('careers', career);