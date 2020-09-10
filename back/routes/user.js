const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

const getFullUser = async (id) => {
  return await User.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Post,
        attributes: ['id'],
      },
      {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      },
      {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      },
    ],
  });
};

// GET /user
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUser = await getFullUser(req.user.id);
      res.status(200).json(fullUser);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /user/login
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUser = await getFullUser(user.id);
      return res.status(200).json(fullUser);
    });
  })(req, res, next);
});

// POST /user/
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

const msg = {
  notExistUser: '존재하지 않는 사용자입니다.',
};

// PATCH  /user/1/follow
router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId * 1 },
    });
    if (!user) {
      res.status(403).send(msg.notExistUser);
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: user.id * 1 });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /user/1/follow
router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId * 1 },
    });
    if (!user) {
      res.status(403).send(msg.notExistUser);
    }
    await user.removeFollowers(req.user.id * 1);
    res.status(200).json({ UserId: user.id * 1 });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE /user/follower/1
router.delete('/follower/:followerId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id * 1 } });
    if (!user) {
      return res.status(401).send(msg.notExistUser);
    }
    await user.removeFollowers(req.params.followerId * 1);
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/followings
router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(403).send(msg.notExistUser);
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/followers
router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id * 1 },
    });
    if (!user) {
      return res.status(403).send(msg.notExistUser);
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET /user/1
router.get('/:userId', async (req, res, next) => {
  try {
    const fullUser = await getFullUser(req.params.userId);
    const finalUser = fullUser.toJSON();
    finalUser.Posts = fullUser.Posts.length;
    finalUser.Followings = fullUser.Followings.length;
    finalUser.Followers = fullUser.Followers.length;

    if (fullUser) {
      res.status(200).json(finalUser);
    } else {
      res.status(404).json('존재하지 않는 사용자 입니다.');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
