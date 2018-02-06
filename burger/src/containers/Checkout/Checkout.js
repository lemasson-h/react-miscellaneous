import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  continueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  cancelMethod = () => {
      this.props.history.goBack();
  }

  render () {
    let summary = <Redirect to="/"/>


    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary ingredients={this.props.ingredients}
            cancelMethod={this.cancelMethod}
            continueMethod={this.continueHandler}/>
          <Route path={this.props.match.url + '/contact-data'}
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased,
  };
}

export default connect(mapStateToProps)(Checkout);
