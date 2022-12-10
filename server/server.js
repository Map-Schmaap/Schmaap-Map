var express = require('express'); // Express web server framework
var app = express();
// var request = require('request'); // "Request" library
// var cors = require('cors');
// var querystring = require('querystring');
var cookieParser = require('cookie-parser');
// const Buffer = require('buffer').Buffer;
const path = require('path');

//mostly for 3rd party api calls from backend middleware
app.use(cookieParser()).use(express.json());

const db = require('./models/schmaapMapModel');
const controllers = require('./controllers/controller.js');
// const cs = require('./clientSecret');

// const apiRouter = require('./routes/api');
// app.use('/api', apiRouter);

app.get(
  '/user',
  controllers.checkAuth,
  controllers.getUser,
  (req, res, err) => {
    return res.json(res.locals.response);
  }
);

// const userAPI = express.Route();
// app.use('/user', userAPI);

app.post('/user', controllers.createUser, (req, res, err) => {
  // console.log('REQ', req.body, res);
  res.send(res.locals.response);
});

// app.put('/user');

app.delete('/user', controllers.deleteUser, (req, res, err) => {
  res.send('user deleted');
});

/////////

app.get('/pin');

app.post('/pin');

// app.put('/pin')

app.delete('/pin');

//////////

// app.get('/tag');

// app.post('/tag');

// // app.put('/tag')

// app.delete('/tag');

/////////

app.get('/signup');

app.post('/signup');

app.get('/login');

app.post('/login');

//////

// app.get('/login', (req, res) => {});

// app.post(
//   '/login',
//   sqlController.authorize,
//   sqlController.getUserData,
//   (req, res, err) => {
//     return res.json(res.local.response);
//   }
// );

// app.get(
//   '/getUserData',
//   sqlController.checkAuth,
//   sqlController.getUserData,
//   (req, res, err) => {
//     return res.json(res.locals.response);
//   }
// );

app.use((err, req, res, next) => {
  console.log('ERROR: ', err);
});

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../index.html'));
  });
}

console.log('Listening on 3000');
app.listen(3000);
