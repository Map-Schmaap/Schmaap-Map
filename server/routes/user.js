const express = require('express');
const router = express.Router();

//require controllers and db models
const controllers = require('../controllers/controller.js');

router.get(
  '/',
  controllers.checkAuth,
  controllers.getUser,
  (req, res, next) => {
    return res.json(res.locals.response);
  }
);

router.post('/', controllers.createUser, (req, res, next) => {
  // console.log('REQ', req.body, res);
  res.send(res.locals.response);
});

router.put('/', (req, res, next) => {
  res.send('User successfully updated');
});

router.delete('/', controllers.deleteUser, (req, res, next) => {
  res.send('User successfully deleted');
});

module.exports = router;
