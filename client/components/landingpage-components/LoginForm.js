import React from "react";
import styles from './LoginForm.module.css'

const LoginForm = () => {

  console.log(styles)
  // define function handleValue which will use onchange of form to continuously update the state of data, until button is clicked, when state of data contains full strings of username and password
  const handleSubmit = (event) => {
    // event parameter is to target the value typed
    // event preventDefault to stop reload
    event.preventDefault()
    //use event.target[index of form].value to grab the values
    console.log('usename: ', event.target[0].value)
    console.log('password: ', event.target[1].value)
  }
  
  // this component will have a form, consisting of two inputs and a button
  // form will send data via request to back end, taking in the form input as query params
  // something something something export login form as default=
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" name="username" className={styles.textInput} placeholder="Username" />
          <input type="text" name="password" className={styles.textInput} placeholder="Password" />
          <button type="submit" className={styles.loginButton}>Login</button>
          <button onClick={(event) => {
            event.preventDefault()
            console.log('register button clicked')
          }} className={styles.loginButton}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm