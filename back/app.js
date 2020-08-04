const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
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

app.use(
  cors({
    origin: 'http://localhost:3060',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('qwer1234'));

app.use(
  session({
    secret: 'qwer1234',
    resave: true,
    saveUninitialized: true,
    // saveUninitialized: true,
    // resave: true,
    // secret: 'nodejsreact',
    // cookie: {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 30,
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

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
