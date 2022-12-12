import React, { useState } from 'react';
import LoginForm from './landingpage-components/LoginForm';
import SignUpForm from './landingpage-components/SignUpForm';
import MainPage from './mainpage-components/MainPage';
import LandingPage from './landingpage-components/LandingPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  //DECLARING OUR STATES
  const [activeUser, setActiveUser] = useState({
    _id: 0,
    Fname: 'Fake',
    pins: [
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
        description: 'I went skiing',
      },
      {
        id: 3,
        name: 'Los Angeles, California',
        position: { lat: 34.052235, lng: -118.243683 },
        description: 'I went to Hollywood',
      },
      {
        id: 4,
        name: 'New York, New York',
        position: { lat: 40.712776, lng: -74.005974 },
        description: 'I went to the Big Apple',
      },
      {
        id: 5,
        name: 'My Moms, House',
        position: { lat: 30.712776, lng: -74.005974 },
        description: 'I went to for dinner',
      },
    ],
  });
  const [newMarker, setNewMarker] = useState({
    isOn: false,
    position: { lat: 40.7128, lng: 74.006 },
  });

  const changeSetNewMarkerHandler = (newMarker) => {
    setNewMarker({ ...newMarker });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMapCenterCoords, setCurrentMapCenterCoords] = useState({
    lat: 40.7128,
    lng: 74.006,
  });

  //setting currentMapCenterCoords using geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    setCurrentMapCenterCoords({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  });

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="/main"
        element={
          <MainPage
            center={currentMapCenterCoords}
            user={activeUser}
            changeMarker={changeSetNewMarkerHandler}
            newMarker={newMarker}
          />
        }
      />
    </Routes>
  );
};

export default App;
