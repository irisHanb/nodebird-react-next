const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'nodebird-react-next',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    database: 'nodebird-react-next',
    password: process.env.DB_PASSWORD,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    database: 'nodebird-react-next',
    password: process.env.DB_PASSWORD,
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
