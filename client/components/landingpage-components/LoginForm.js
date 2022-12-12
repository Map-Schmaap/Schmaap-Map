import React from 'react';
import styles from './LoginForm.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = (props) => {
  const navigate = useNavigate();
  console.log(styles);
  // define function handleValue which will use onchange of form to continuously update the state of data, until button is clicked, when state of data contains full strings of username and password
  const handleSubmit = (event) => {
    // event parameter is to target the value typed
    // event preventDefault to stop reload
    event.preventDefault();
    //use event.target[index of form].value to grab the values
    console.log('usename: ', event.target[0].value);
    console.log('password: ', event.target[1].value);

    //make fetch request and then update state
    const userLoggingIn = {
      username: event.target[0].value,
      password: event.target[1].value,
    };
    // make the axios request to auth, passing in the username and password
    // axios request here
    console.log(props);
    axios({
      method: 'post',
      url: 'http://localhost:3000/login',
      data: userLoggingIn,
    })
      .then((responseData) => {
        console.log(responseData.data);
        // props.onLogin(responseData.pins)
        if (responseData.status === 200) {
          //if success update activeUserState
          console.log('response data: ', responseData.data);
          props.onLogin(responseData.data);
          navigate('/main');
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/signup');
      });

    // callback is props.onLogin
  };

  // this component will have a form, consisting of two inputs and a button
  // form will send data via request to back end, taking in the form input as query params
  // something something something export login form as default=
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="username"
            className={styles.textInput}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            className={styles.textInput}
            placeholder="Password"
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate('/signup');
            }}
            className={styles.loginButton}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
