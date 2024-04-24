const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  name: { type: String },
  credits: { type: Number },
  teacher: {
    type: mongoose.ObjectId,
    ref: 'teachers'
  },
  career:{
    type: mongoose.ObjectId,
    ref: 'careers'
  }
});

module.exports = mongoose.model('courses', courseSchema);