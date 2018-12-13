import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import PropTypes from 'prop-types';
import SignIn from './SignIn'

class App extends Component { 

    

  handleRegister() {
    axios.post('/api/register' , {
      email: 'email',
      password: 'password',
    })
    .then(response => {
      console.log(response.data);
        localStorage.setItem('JWT', response.data.token);
        /*this.setState({
          loggedIn: true,
        });*/
    })
    .catch(error => {
      console.log(error);
    });
  };

  handleLogin() {
    axios.post('/api/login' , {
      email: 'email',
      password: 'password',
    })
    .then(response => {
      console.log(response.data);
        localStorage.setItem('JWT', response.data.token);
        /*this.setState({
          loggedIn: true,
        });*/
    })
    .catch(error => {
      console.log(error);
    });
  };
  

  render() {
    return (
        <div className="App">
          <Button variant="contained" color="primary" onClick={this.handleRegister}>
            Register
          </Button>
          <Button variant="contained" color="primary" onClick={this.handleLogin}>
            Log In
          </Button>
          <SignIn />
        </div>
    );
  }
}

export default hot(module)(App);
