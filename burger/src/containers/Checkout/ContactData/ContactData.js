import React, { Component } from 'react';

import * as actionCreators from '../../../store/actions';
import AxiosOrder from '../../../AxiosOrder';
import Button from '../../../components/UI/Button/Button';
import { checkValidity } from '../../../share/utility.js';
import classes from './ContactData.css';
import { connect } from 'react-redux';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: '',
        touched: false,
      },
      street:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: '',
        touched: false,
      },
      zipCode:{
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        errorMessage: '',
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        errorMessage: '',
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        valid: true,
        value: 'fastest',
        errorMessage: '',
      },
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementId in this.state.orderForm) {
        formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onPurchase(order, this.props.userToken);
  }

  inputChangeHandler = (event, inputId) => {
    const updateElement = {
      ...this.state.orderForm[inputId],
      value: event.target.value,
      touched: true,
    };

    if (updateElement.validation) {
      updateElement.errorMessage = checkValidity(
        updateElement.value,
        updateElement.validation
      );
      updateElement.valid = '' === updateElement.errorMessage;
    }

    let formIsValid = true;

    for (let key in this.state.orderForm) {
      if (key === inputId) {
        if (!updateElement.valid) {
          formIsValid = false;
        }
      } else if (!this.state.orderForm[key].valid) {
        formIsValid = false;
      }
    }

    this.setState({
      orderForm: {
        ...this.state.orderForm,
        [inputId]: updateElement,
      },
      formIsValid: formIsValid,
    });
  }

  render () {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => {
            return <Input key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={formElement.config.touched && !formElement.config.valid}
              shouldValidate={formElement.config.validation}
              errorMessage={formElement.config.errorMessage}
              changeMethod={(event) => { this.inputChangeHandler(event, formElement.id); }}/>
          })}
          {/* <Input inputtype='input' type='text' name='name' placeholder="Your name" />
          <Input inputtype='input' type='text' name='email' placeholder="Your email" />
          <Input inputtype='input' type='text' name='street' placeholder="Your street" />
          <Input inputtype='input' type='text' name='postCode' placeholder="postCode" /> */}
          <Button buttonType="Success" disabled={!this.state.formIsValid} clickMethod={this.orderHandler}>ORDER</Button>
      </form>);

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.order.loading,
    userToken: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchase: (orderData, userToken) => dispatch(actionCreators.purchaseBurger(orderData, userToken)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, AxiosOrder));
