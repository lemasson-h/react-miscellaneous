import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    /**
      If we are on example.com/my-app
      We need to set the basename to the prefix of our app
      <BrowserRouter basename="/my-app">
    **/
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
    </BrowserRouter>
    );
  }
}

export default App;
