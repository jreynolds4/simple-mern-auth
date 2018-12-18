import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import LogIn from './LogIn'
import SignUp from './SignUp'
import Home from './Home'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import NavBar from './NavBar';


function PrivateRoute ({component: Component, loggedIn, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => loggedIn === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {  
  
  constructor(props) {
    super(props);
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  isAuthenticated(){
    return localStorage.getItem('JWT') != null;
  }

  render() {
    
    return (
        <div>
          <NavBar />
          <Switch>
            <PrivateRoute loggedIn={this.isAuthenticated()} exact path='/' component={Home} />
            <Route exact path="/login" component={LogIn}/>
            <Route exact path="/signup" component={SignUp}/>
          </Switch>
        </div>
    );
  }
}

export default hot(module)(withRouter(App));
