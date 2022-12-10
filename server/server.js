const express = require('express');
const app = express();
const path = require('path');
var cookieParser = require('cookie-parser');

//mostly for 3rd party api calls from backend middleware
app.use(cookieParser()).use(express.json());

//define routers
const userRouter = require('./routes/user');
const pinRouter = require('./routes/pins');

//define controller and db models
const controllers = require('./controllers/controller.js');

// app.get('/signup', (req, res, err) => {
//   // res.sendFile(path.resolve(__dirname, '../client/signup.html'));
// });

// app.get('/login', (req, res, err) => {
//   // res.sendFile(path.resolve(__dirname, '../client/login.html'));
// });

app.post('/login', controllers.login, (req, res, err) => {
  console.log('SUCCESS!');
  res.send();
});

app.post('/signup', controllers.login, (req, res, err) => {
  console.log('SUCCESS!');
  res.send();
});

app.use('/user', userRouter);
app.use('/pin', pinRouter);

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', controllers.checkAuth, (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  });
}

//delete when we start using webpack to debug fullstack
app.get('/', (req, res, err) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.log('ERROR: ', err);
});

console.log('Listening on 3000');
app.listen(3000);
