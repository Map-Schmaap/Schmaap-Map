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
    props.user.pins.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  //EVENT HANDLERS
  const mapOnDblClickHandler = (e) => {
    props.changeMarker({
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      isOn: true,
    });
    console.log('latitide = ', e.latLng.lat());
    console.log('longitude = ', e.latLng.lng());
  };

  return isLoaded ? (
    <div className={classes.map}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDblClick={mapOnDblClickHandler}
      >
        {props.user.pins.map(({ id, name, position, description }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
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
            >
              <form>
                <input />
                <button type="submit">Submit</button>
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
