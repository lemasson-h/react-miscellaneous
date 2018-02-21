import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import lazyLoad from './hoc/LazyLoad';
import Users from './containers/Users';

const Pizza = lazyLoad(() => {
  return import('./containers/Pizza');
});

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <NavLink to="/">Users</NavLink>
          <NavLink to="/pizza">Pizza</NavLink>
        </div>
        <div>
          <Switch>
            <Route path="/" exact component={Users} />
            <Route path="/pizza" component={Pizza} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
