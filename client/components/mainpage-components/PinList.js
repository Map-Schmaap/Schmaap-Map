import React from 'react';
import Button from '../UI/Button';
import classes from './PinList.module.css';

const PinList = (props) => {
  const pinListArr = props.user.pins.map((pin, i) => {
    return (
      <li key={i * 100} className={classes.pinListItem}>
        <p
          onClick={props.setCurrentMapCenterCoords}
          className={classes.pinName}
        >
          {pin.name}
        </p>
        <p className={classes.pinDescription}>{pin.description}</p>
      </li>
    );
  });

  return <ul className={classes.pinListContainer}>{pinListArr}</ul>;
};

export default PinList;
