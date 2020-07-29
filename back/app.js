const express = require('express');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const app = express();
const cors = require('cors');

const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공이지롱');
  })
  .catch(console.error);

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.post('/login');

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('server started...');
});
