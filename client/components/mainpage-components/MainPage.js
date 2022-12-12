import React from 'react';
import Map from './Map';
import classes from './MainPage.module.css';
import Navbar from '../UI/Navbar';

const MainPage = (props) => {
  return (
    <div>
      <Navbar />
      <Map
        center={props.center}
        user={props.user}
        changeMarker={props.changeMarker}
        newMarker={props.newMarker}
      />
    </div>
  );
};

export default MainPage;
