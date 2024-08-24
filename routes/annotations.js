const express = require('express');
const Annotation = require('../models/Annotation');

const router = express.Router();

// Create a new annotation
router.post('/', async (req, res) => {
  const { videoId, timestamp, position, comment, text } = req.body;
  const annotation = new Annotation({ videoId, timestamp, position, comment, text });
  await annotation.save();
  res.json(annotation);
});

// Get all annotations for a video
router.get('/:videoId', async (req, res) => {
  const annotations = await Annotation.find({ videoId: req.params.videoId });
  res.json(annotations);
});

// Update an annotation
router.put('/:id', async (req, res) => {
  const { timestamp, position, comment, text } = req.body;
  const annotation = await Annotation.findByIdAndUpdate(
    req.params.id,
    { timestamp, position, comment, text },
    { new: true }
  );
  res.json(annotation);
});

// Delete an annotation
router.delete('/:id', async (req, res) => {
  await Annotation.findByIdAndDelete(req.params.id);
  res.json({ message: 'Annotation deleted' });
});

module.exports = router;
