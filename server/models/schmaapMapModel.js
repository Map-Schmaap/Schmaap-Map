const { Pool } = require('pg');

const PG_URI =
  'postgres://vfdzrkhe:qKNAPsqKF0HaEDp9igXRSwXimtCGKcMy@raja.db.elephantsql.com/vfdzrkhe';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

/*
CREATE TABLE users (
  user_id serial PRIMARY KEY,
	username VARCHAR UNIQUE NOT NULL,
	password VARCHAR NOT NULL,
	email VARCHAR UNIQUE,
	created_on TIMESTAMP
);

CREATE TABLE pins (
  pin_id serial PRIMARY KEY,
	latitude FLOAT NOT NULL,
	longitude FLOAT NOT NULL,
	user_id VARCHAR NOT NULL,
	created_on TIMESTAMP 
);

// STRETCH
logins table
user id
date

// users_pins
random_id
person_id
pin_id

*/
