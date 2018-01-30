import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
      ingredients: {
        salad: 1,
        meat: 1,
        bacon: 1,
        cheese: 1,
      }
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

    try {
      ingredients = JSON.parse(query.get('ingredients'));
    } catch (exception) {
    }

    this.setState({
      ingredients: ingredients
    });
  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
          cancelMethod={this.cancelMethod}
          continueMethod={this.continueHandler}/>
      </div>
    );
  }
}

export default Checkout;
