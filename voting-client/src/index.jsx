import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Voting from './components/Voting'

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Switch>
          <Route exact path="/" component={Voting} />
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById('app')
);
