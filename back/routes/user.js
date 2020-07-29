const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const existUser = await User.findOne({ where: { email: req.body.email } });
    if (existUser) return res.status(403).json('이미 사용중인 이메일입니다.');

    console.log(req.body);

    const { email, nickname } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({ email, nickname, password: hashedPassword });
    res.status(201).send('ok');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
