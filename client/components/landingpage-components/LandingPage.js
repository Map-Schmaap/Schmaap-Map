import React from 'react';
// import Navbar from '../UI/Navbar';
import './LandingPage.scss';
import LoginForm from './LoginForm';

// const LandingPage = (props) => {
//   return (
//     <div className={classes.landingPageContainer}>
//       <Navbar user={props.user} />
//     </div>
//   );
// };

const LandingPage = (props) => {
  return (
    <div id="landingPage">
      <div className="trapdoor">
        <div className="top door">ENTER THE SCHMAAPMAP</div>
        {/* <Navbar className="navbar" user={props.user} /> */}
        <LoginForm onLogin={props.onLogin} />

        <div className="bottom door"></div>
      </div>
    </div>
  );
};

export default LandingPage;
