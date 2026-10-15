const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const config = require("config");
const authMiddleware = require('../middleware/auth.middleware');

router.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;

  try {
    const startIndex = (page - 1) * limit;

    const users = await User.find()
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .skip(startIndex)
      .select('-password');

    const totalCount = await User.countDocuments();

    res.json({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const allowedUpdates = [
      'name',
      'surname',
      'status',
      'passportData',
      'academicInfo',
      'profilePhoto',
      'stages'
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    user.passportStatus = user.passportData && user.passportData.passportNumber ? 'pending' : 'notFilled';
    await user.save();

    return res.json({ message: 'Profile updated', user: user.toObject() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get('/stages', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      stages: user.stages || {}
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/stage', authMiddleware, async (req, res) => {
  try {
    const { stage, value } = req.body;
    const allowedStages = ['registration', 'personal', 'documents', 'selection', 'agreement', 'payment', 'actionCheck', 'prikaz', 'visaInvitation', 'arrivalNotification'];

    if (!allowedStages.includes(stage)) {
      return res.status(400).json({ message: 'Invalid stage' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.stages[stage] = value;
    await user.save();

    return res.json({ message: 'Stage updated', stages: user.stages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
