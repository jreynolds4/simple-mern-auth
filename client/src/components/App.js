import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class App extends Component { 

  render() {
    return (
        <div className="App">
            <p>Hello World!</p>
        </div>
    );
  }
}

export default hot(module)(App);
