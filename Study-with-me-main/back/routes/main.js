const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Study = require('../models/Study');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('요청 userId:', userId);
    const studies = await Study.find({ members: new mongoose.Types.ObjectId(userId) });
    console.log('조회된 스터디:', studies);
    res.json({ studies });
  } catch (err) {
    console.error('스터디 목록 조회 오류:', err);
    res.status(500).json({ message: '서버 오류', error: err.message });
  }
});

module.exports = router;