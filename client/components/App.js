import React, { useState } from 'react';
import Map from './mainpage-components/Map';
import Navbar from './UI/Navbar';
import LoginForm from './landingpage-components/LoginForm';
import SignUpForm from './landingpage-components/SignUpForm';

const App = () => {
  return (
    <div>
      <LoginForm />
      <SignUpForm />
    </div>
  );
};

export default App;
