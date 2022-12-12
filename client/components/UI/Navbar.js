import React from 'react';
import Button from './Button';
import classes from './Navbar.module.scss';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <nav>
      <h1 className={classes.appTitle}>Schmaap-Map</h1>
      <ul>
        {!props.user.user_id && (
          <Button className={classes.navbarBtn}>
            <Link to="/login" className={classes.btnText}>
              Login
            </Link>
          </Button>
        )}
        {!props.user.user_id && (
          <Button className={classes.navbarBtn}>
            <Link to="/signup" className={classes.btnText}>
              Sign Up
            </Link>
          </Button>
        )}
        {props.user.user_id && (
          <Button className={classes.navbarBtn}>
            <Link to="/login" className={classes.btnText}>
              Log out
            </Link>
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
