import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

class OrderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map((ingredientName) => {
        return (
          <li key={ingredientName}>
          <span style={{textTransform: 'capitalize'}}>{ingredientName}</span>: {this.props.ingredients[ingredientName]}
          </li>
        );
      })

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button
          buttonType="Danger"
          clickMethod={this.props.cancelMethod}>CANCEL</Button>
        <Button
          buttonType="Success"
          clickMethod={this.props.continueMethod}>CONTINUE</Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.shape({
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
  }),
  price: PropTypes.number.isRequired,
  cancelMethod: PropTypes.func.isRequired,
  continueMethod: PropTypes.func.isRequired,
};

export default OrderSummary;
