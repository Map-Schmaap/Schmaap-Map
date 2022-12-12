import React from 'react';
import Navbar from '../UI/Navbar';
import classes from './LandingPage.module.css';

const LandingPage = (props) => {
  return (
    <div>
      <Navbar user={props.user}/>
    </div>
  );
};

export default LandingPage;
