import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './hoc/Layout/Layout';

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
              <Route path="/checkout" component={Checkout} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
