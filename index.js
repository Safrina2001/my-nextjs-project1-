const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  mongoose.connect('mongodb://localhost:27017/video_annotations')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
  const PORT = process.env.PORT || 3001;  // Change the port number to avoid conflict
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

