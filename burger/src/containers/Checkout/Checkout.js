import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
      ingredients: {
        salad: 1,
        meat: 1,
        bacon: 1,
        cheese: 1,
      },
      totalPrice: 0,
  };

  continueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  cancelMethod = () => {
      this.props.history.goBack();
  }

  componentDidMount() {
    let ingredients = {};
    const query = new URLSearchParams(this.props.location.search);
    const totalPrice = +query.get('totalPrice', 0);

    try {
      ingredients = JSON.parse(query.get('ingredients'));
    } catch (exception) {
    }

    if (null === ingredients) {
      ingredients = {};
    }

    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice
    });
  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
          cancelMethod={this.cancelMethod}
          continueMethod={this.continueHandler}/>
        <Route path={this.props.match.url + '/contact-data'}
          render={(props) => (<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)} />
      </div>
    );
  }
}

export default Checkout;
