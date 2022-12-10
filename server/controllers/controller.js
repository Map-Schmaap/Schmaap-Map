const db = require('../models/schmaapMapModel');

const sMController = {};

sMController.checkAuth = (req, res, next) => {};

sMController.getUser = (req, res, next) => {
  const getUserQuery = {
    text: 'SELECT * FROM users u LEFT JOIN pins p ON u.user_id = p.user_id WHERE user_id = $1',
    values: [req.body.user_id],
  };

  db.query(getUserQuery, (err, data) => {
    res.status(200);
    res.locals.response = data.rows[0];
    return next();
  });
};

/*  user_id serial PRIMARY KEY,
	username VARCHAR UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	email VARCHAR UNIQUE,
	created_on TIMESTAMP */

sMController.createUser = (req, res, next) => {
  console.log('REWQUEST:', req.body);
  const addUserQuery = {
    text: 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
    values: [req.body.username, req.body.password, req.body.email],
  };

  db.query(addUserQuery, (err, data) => {
    console.log(data);
    res.locals.response = data.rows[0];
    return next();
  });
};

sMController.deleteUser = (req, res, next) => {
  console.log('REWQUEST:', req.body);
  const deleteUserQuery = {
    text: 'DELETE FROM users WHERE user_id=$1',
    values: [req.body.user_id],
  };

  db.query(deleteUserQuery, (err, data) => {
    console.log(data);
    res.locals.response = data.rows[0];
    return next();
  });
};

module.exports = sMController;
