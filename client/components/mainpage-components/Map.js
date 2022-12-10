import React, { useState, useEffect, useCallback } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindow,
  Marker,
} from '@react-google-maps/api';
import classes from './Map.module.css';
import Card from '../UI/Card';

const containerStyle = {
  width: '60vw',
  height: '100%',
};

const markers = [
  {
    id: 1,
    name: 'Chicago, Illinois',
    position: { lat: 41.881832, lng: -87.623177 },
    description: 'I went to Sears Tower',
  },
  {
    id: 2,
    name: 'Denver, Colorado',
    position: { lat: 39.739235, lng: -104.99025 },
  },
  {
    id: 3,
    name: 'Los Angeles, California',
    position: { lat: 34.052235, lng: -118.243683 },
  },
  {
    id: 4,
    name: 'New York, New York',
    position: { lat: 40.712776, lng: -74.005974 },
  },
  {
    id: 5,
    name: 'My Moms, House',
    position: { lat: 30.712776, lng: -74.005974 },
  },
];
// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

function MyComponent() {
  //MAP CONFIG
  const [userCoords, setUserCoords] = useState({
    lat: 40.7128,
    lng: 74.006,
  });
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
    const bounds = new window.google.maps.LatLngBounds(userCoords);
    markers.forEach(({ position }) => bounds.extend(position));
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
        {markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <Card className={classes.infowindow}>
                  <p>Name asfasdfasfasfasfasdfasfasfasf</p>
                  <p>Name </p>
                  <p>Name </p>
                  <p>Name </p>
                  <p>Name </p>
                  <p>Name </p>
                  <p>Name </p>
                </Card>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
