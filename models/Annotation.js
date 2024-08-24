const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  videoId: String,
  timestamp: Number,
  position: {
    x: Number,
    y: Number,
  },
  comment: String,
  text: String,
});

module.exports = mongoose.model('Annotation', annotationSchema);
