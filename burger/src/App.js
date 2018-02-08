import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from './store/actions';
import Auth from './containers/Auth/Auth';
import Aux from './hoc/Aux/Aux';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import LazyLoad from './hoc/LazyLoad/LazyLoad';
import Logout from './containers/Auth/Logout/Logout';

const LazyLoadOrders = LazyLoad(
  () => {
    return import('./containers/Orders/Orders');
  }
);

const LazyLoadCheckout = LazyLoad(
  () => {
    return import('./containers/Checkout/Checkout');
  }
);

class App extends Component {
  state = {
    show: true,
  };

  componentWillMount() {
      this.props.onTryAutoSignup();
  }

  render() {
    let guardedRoutes = null;

    if (this.props.isAuthenticated) {
      guardedRoutes = (
        <Aux>
          <Route path="/orders" component={LazyLoadOrders} />
          <Route path="/checkout" component={LazyLoadCheckout} />
          <Route path="/logout" component={Logout} />
        </Aux>
      );
    }

    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/login" component={Auth} />
              {guardedRoutes}
              <Redirect to="/"/>
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: null !== state.auth.token,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
