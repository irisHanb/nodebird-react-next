const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');

const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공이지롱');
  })
  .catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(
  cors({
    // origin: 'http://localhost:3060', // client
    origin: true,
    credentials: true,
  })
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

app.get('/debug', (req, res) => {
  res.json({
    'req.session': req.session, // 세션 데이터
    'req.user': req.user, // 유저 데이터(뒷 부분에서 설명)
    'req._passport': req._passport, // 패스포트 데이터(뒷 부분에서 설명)
  });
});

app.listen(3065, () => {
  console.log('server started...');
});
