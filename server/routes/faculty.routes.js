const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// GET all faculties
router.get('/', async (req, res) => {
  const faculties = await Faculty.find();
  res.json(faculties);
});

// POST create faculty
router.post('/', async (req, res) => {
  const newFaculty = new Faculty({ name: req.body.name });
  await newFaculty.save();
  res.status(201).json(newFaculty);
});

module.exports = router;
