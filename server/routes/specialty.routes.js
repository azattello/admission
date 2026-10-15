const express = require('express');
const router = express.Router();
const Specialty = require('../models/Specialty');

// GET specialties by faculty
router.get('/:facultyId', async (req, res) => {
  const specialties = await Specialty.find({ faculty: req.params.facultyId });
  res.json(specialties);
});

// POST create specialty
router.post('/', async (req, res) => {
  const newSpecialty = new Specialty({
    name: req.body.name,
    faculty: req.body.facultyId
  });
  await newSpecialty.save();
  res.status(201).json(newSpecialty);
});

module.exports = router;
