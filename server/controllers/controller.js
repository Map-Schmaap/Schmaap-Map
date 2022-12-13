const db = require('../models/schmaapMapModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const sMController = {};

//--------------------CHECK-------AUTH------------------------------------------------------------
sMController.checkAuth = (req, res, next) => {
  //check cookie? to see if you're logged in
  next();
};

//--------------------LOGIN------------------------------------------------------------
sMController.login = (req, res, next) => {
  // console.log('SERVER===data==', req);
  const query = {
    text: 'SELECT user_id,password FROM users WHERE username = $1',
    values: [req.body.username],
  };

  db.query(query, (err, data) => {
    // console.log('SERVER======', query);
    // console.log('SERVER====', data);
    if (err) return res.status(404).send();
    if (data.rowcount === 0) return res.status(401).send();
    password = data.rows[0].password;
    user_id = data.rows[0].user_id;

    // console.log(
    //   '===from SERVER hashpass from postgresQL',
    //   password,
    //   req.body.password
    // );

    bcrypt.compare(req.body.password, password).then((result) => {
      if (!result) {
        console.log('=====from SERVER rehash DIDNT MATCH');
        //401 unauthorized - not known to server. send/end response.
        //403 - known to server, but not auth'd
        res.status(401).send();
      } else {
        console.log('=====from SERVER rehash WORKED');
        //store a logged in cookie???
        // res.cookie(req.body.username, 'AUTHD');
        //res.redirect('/')
        // next();
        res.locals.user_id = user_id;
        res.status(200);
        next();
      }
    });
  });
};

//--------------------SIGN-UP---(CREATE USER)--------------------------------------------------------
sMController.createUser = (req, res, next) => {
  // console.log('REWQUEST:', req.body);

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return next(err);
      req.body.password = hash;

      const addUserQuery = {
        text: 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
        values: [req.body.username, req.body.password, req.body.email],
      };

      db.query(addUserQuery, (err, data) => {
        if (err) return next({ err });
        // console.log(data);
        res.status(200);
        res.locals.response = data.rows[0];
        return next();
      });
    });
  });
};

//--------------------GET---USER and PINS MEGA QUERY---------------------------------------------------------
sMController.getUser = (req, res, next) => {
  const getUserQuery = {
    text: 'SELECT u.*, p.longitude,p.latitude, p.description, p.name, p.pin_id FROM users u LEFT JOIN pins p ON u.user_id = p.user_id WHERE u.user_id = $1',
    // text: 'SELECT u.*, p.longitude,p.latitude, p.description, p.name, p.pin_id',
    values: [req.body.user_id || res.locals.user_id],
  };

  db.query(getUserQuery, (err, data) => {
    if (err) return next({ err });
    // console.log(data);
    const sendBack = {
      user_id: data.rows[0].user_id,
      username: data.rows[0].username,
      pins: data.rows.map((x) => {
        return {
          pin_id: x.pin_id,
          position: { lat: x.latitude, lng: x.longitude },
          name: x.name,
          description: x.description,
        };
      }),
    };

    res.locals.response = sendBack;
    // res.locals.response = {
    //   id: 4,
    //   name: 'New York, New York',
    //   position: { lat: 40.712776, lng: -74.005974 },
    //   description: 'I went to the Big Apple',
    // };
    return next();
  });
};

//--------------------DELETE-----USER-------------------------------------------------------
sMController.deleteUser = (req, res, next) => {
  const deleteUserQuery = {
    text: 'DELETE FROM users WHERE user_id=$1',
    values: [req.body.user_id],
  };

  db.query(deleteUserQuery, (err, data) => {
    if (err) return next({ err });
    console.log(data);
    // res.locals.response = data.rows[0];
    return next();
  });
};

//--------------------CREATE-----PIN-------------------------------------------------------
sMController.createPin = (req, res, next) => {
  console.log('REQUEST:', req.body);
  const createPinQuery = {
    text: 'INSERT INTO pins (latitude, longitude, user_id, description, name) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [
      req.body.lat,
      req.body.lng,
      req.body.user_id,
      req.body.description,
      req.body.name,
    ],
  };

  db.query(createPinQuery, (err, data) => {
    if (err) return next({ err });
    console.log(data.rows);
    res.locals.response = data.rows[0];
    return next();
  });
};

//--------------------UPDATE-----PIN-------------------------------------------------------
sMController.updatePin = (req, res, next) => {
  const updatePinQuery = {
    text: 'UPDATE pins SET description = $1 WHERE pin_id = $2',
    values: [req.body.description, req.body.pin_id],
  };
  db.query(updatePinQuery, (err, data) => {
    if (err) return next({ err });
    res.locals.response = data.rows[0];
    return next();
  });
};

//--------------------DELETE-----PIN-------------------------------------------------------
sMController.deletePin = (req, res, next) => {
  const deletePinQuery = {
    text: 'DELETE FROM pins WHERE latitude=$1 AND longitude=$2 AND user_id=$3',
    values: [req.body.latitude, req.body.longitude, req.body.user_id],
  };

  db.query(deletePinQuery, (err, data) => {
    if (err) return next({ err });
    // res.locals.response = data.rows[0];
    return next();
  });
};

module.exports = sMController;
