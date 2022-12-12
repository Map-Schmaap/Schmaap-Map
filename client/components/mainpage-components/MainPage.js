import React from 'react';
import Map from './Map';
import classes from './MainPage.module.css';
import Navbar from '../UI/Navbar';
import PinList from './PinList';

const MainPage = (props) => {
  return (
    <div>
      <Navbar user={props.user} />
      <Map
        center={props.center}
        user={props.user}
        changeMarker={props.changeMarker}
        newMarker={props.newMarker}
        onPinCreation={props.onPinCreation}
      />
      <PinList user={props.user}/>
    </div>
  );
};

export default MainPage;
