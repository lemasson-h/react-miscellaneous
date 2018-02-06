import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  state = {
    show: true,
  };

  componentDidMount() {
      // setTimeout(
      //   () => {
      //     this.setState({show: false});
      //   },
      //   5000
      // );
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/orders" component={Orders} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/login" component={Auth} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
