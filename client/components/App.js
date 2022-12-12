import React, { useState } from 'react';
import LoginForm from './landingpage-components/LoginForm';
import SignUpForm from './landingpage-components/SignUpForm';
import MainPage from './mainpage-components/MainPage';
import LandingPage from './landingpage-components/LandingPage';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  //DECLARING OUR STATES
  const [activeUser, setActiveUser] = useState({
    user_id: null,
    username: null,
    pins: [],
  });
  const [newMarker, setNewMarker] = useState({
    isOn: false,
    position: {},
  });

  const changeSetNewMarkerHandler = (newMarker) => {
    setNewMarker({ ...newMarker });
  };

  const setActiveUserSetter = (newUser) => {
    setActiveUser(newUser);
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

  // console.log('USER: ', activeUser);

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={activeUser}/>} />
      <Route
        path="/login"
        element={<LoginForm onLogin={setActiveUserSetter} />}
      />
      <Route path="/signup" element={<SignUpForm />} />
      <Route
        path="/main"
        element={
          activeUser.user_id ? (
            <MainPage
              center={currentMapCenterCoords}
              user={activeUser}
              changeMarker={changeSetNewMarkerHandler}
              newMarker={newMarker}
              onPinCreation={setActiveUserSetter}
            />
          ) : (
            <LoginForm onLogin={setActiveUserSetter} />
          )
          // element={ cartItems.length < 1 ? <Navigate to="/products" /> : <Checkout /> }
        }
      />
    </Routes>
  );
};

export default App;
