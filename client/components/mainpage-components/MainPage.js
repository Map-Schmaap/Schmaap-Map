import React from 'react';
import Map from './Map';
import classes from './MainPage.module.css';
import Navbar from '../UI/Navbar';
import PinList from './PinList';

const MainPage = (props) => {
  return (
    <div>
      <Navbar user={props.user} />
      <div className={classes.mapContentWrapper}>
        <PinList
          user={props.user}
          setCurrentMapCenterCoords={props.setCurrentMapCenterCoords}
        />
        <Map
          center={props.center}
          user={props.user}
          changeMarker={props.changeMarker}
          newMarker={props.newMarker}
          onPinCreation={props.onPinCreation}
        />
      </div>
    </div>
  );
};

export default MainPage;
