const express = require('express');
const router = express.Router();

//require controllers and db models
const controllers = require('../controllers/controller.js');

router.post(
  '/',
  controllers.createPin,
  controllers.getUser,
  (req, res, next) => {
    // console.log('REQ', req.body, res);
    res.send(res.locals.response);
  }
);

router.put('/', controllers.updatePin, (req, res, next) => {
  res.send(res.locals.response);
});

router.delete('/', controllers.deletePin, (req, res, next) => {
  res.send('Pin successfully deleted');
});

module.exports = router;
