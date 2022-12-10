import React from 'react';
import Button from './Button';
import classes from './Navbar.module.css';

const Navbar = (props) => {
  return (
    <nav>
      <h1 className={classes.appTitle}>SCHMAAP-MAP</h1>
      <Button className={classes.navbarBtn} onClick={() => {}}>
        Login
      </Button>
      <Button className={classes.navbarBtn} onClick={() => {}}>
        Signup
      </Button>
    </nav>
  );
};

export default Navbar;
