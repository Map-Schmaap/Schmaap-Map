import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import classes from './Map.module.css';

const containerStyle = {
  width: '60vw',
  height: '100%',
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };
const TestMapChildComponent = () => {
  return <div> THIS IS A TEST COMPONENT</div>;
};

function MyComponent() {
  //MAP CONFIG
  const [userCoords, setUserCoords] = useState({
    lat: 40.7128,
    lng: 74.006,
  });
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZqyNySlYBUy22gxbLwJbr2falvXopgVc',
  });

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(userCoords);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //getting users coords with navigator.geolocation API
  navigator.geolocation.getCurrentPosition(function (position) {
    setUserCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    console.log('Latitude is :', position.coords.latitude);
    console.log('Longitude is :', position.coords.longitude);
  });

  //EVENT HANDLERS
  const mapOnDblClickHandler = (e) => {
    console.log('latitide = ', e.latLng.lat());
    console.log('longitude = ', e.latLng.lng());
  };

  return isLoaded ? (
    <div className={classes.map}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userCoords}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDblClick={mapOnDblClickHandler}
      >
        <TestMapChildComponent />
      </GoogleMap>{' '}
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
