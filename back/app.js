const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

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

if( process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
}else{
  app.use(morgan('dev'));
}

app.use(
  cors({    
    origin: ['http://localhost:3060', 'nodebird.com' , 'http://13.209.89.42'],
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

app.get('/', (req, res) => {
  res.send('hello express');
})

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

app.listen(80, () => {
  console.log('server started...');
});
