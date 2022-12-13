import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';
import classes from './Map.module.css';
import Card from '../UI/Card';

const containerStyle = {
  width: '65vw',
  height: '100%',
};

function MyComponent(props) {
  //MAP CONFIG

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZqyNySlYBUy22gxbLwJbr2falvXopgVc',
  });

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(props.center);
    if (props.user.pins[0].pin_id) {
      props.user.pins.forEach(({ position }) => bounds.extend(position));
    }
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //EVENT HANDLERS
  const onNewPinCreationHandler = (e) => {
    e.preventDefault();
    const newPin = {
      user_id: props.user.user_id,
      lat: props.newMarker.position.lat,
      lng: props.newMarker.position.lng,
      name: e.target[0].value,
      description: e.target[1].value,
    };
    // POST REQUest to MAKE NEW MARKER HEEERE
    axios({
      method: 'post',
      url: 'http://localhost:3000/pin',
      data: newPin,
    })
      .then((responseData) => {
        console.log(responseData.data);
        // props.onLogin(responseData.pins)
        if (responseData.status === 200) {
          props.onPinCreation(responseData.data);
          props.changeMarker({ isOn: false, position: {} });
        }
        //if success update activeUserState
        //redirect to mainpage

        //redirect to signup page
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mapOnDblClickHandler = (e) => {
    props.changeMarker({
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      isOn: true,
    });
    console.log('latitide = ', e.latLng.lat());
    console.log('longitude = ', e.latLng.lng());
  };
  console.log(props.user);

  return isLoaded ? (
    <div className={classes.mapWrapper}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDblClick={mapOnDblClickHandler}
      >
        {props.user.pins.map(({ pin_id, name, position, description }) => (
          <Marker
            key={pin_id}
            position={position}
            onClick={() => handleActiveMarker(pin_id)}
          >
            {activeMarker === pin_id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <Card className={classes.infowindow}>
                  <p>{name}</p>
                  <p>{description}</p>
                </Card>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
        {props.newMarker.isOn && (
          <Marker
            key={'fakeId'}
            position={{
              lat: props.newMarker.position.lat,
              lng: props.newMarker.position.lng,
            }}
          >
            <InfoWindow
              position={{
                lat: props.newMarker.position.lat,
                lng: props.newMarker.position.lng,
              }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <form onSubmit={onNewPinCreationHandler}>
                <input type="text" placeholder="Enter Name" />
                <input type="text" placeholder="Enter Description" />
                <button type="submit">Create Pin</button>
              </form>
            </InfoWindow>
          </Marker>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
