import React, { Component } from 'react';

import AxiosOrder from '../../../AxiosOrder';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

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
        value: '',
        errorMessage: '',
      },
    },
    formIsValid: false,
    loading: false,
  }

  checkValidity(value, rules) {
    if (rules.required && value.trim() === '') {
        return 'You must specify a value.';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return 'You must enter a value of at least ' + rules.minLength + ' characters';
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        return 'You must enter a value of at maximum ' + rules.minLength + ' characters';
    }

    return '';
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const formData = {};

    for (let formElementId in this.state.orderForm) {
        formData[formElementId] = this.state.orderForm[formElementId].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    };

    AxiosOrder.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
        });
        this.props.history.push('/');
        // console.log(response);
      })
      .catch(error => {
          this.setState({
            loading: false,
          });
          // console.log(error);
      });

  }

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    updatedOrderForm[inputId] = {
      ...this.state.orderForm[inputId]
    };
    updatedOrderForm[inputId].value = event.target.value;

    if (updatedOrderForm[inputId].validation) {
      updatedOrderForm[inputId].errorMessage = this.checkValidity(
        updatedOrderForm[inputId].value,
        updatedOrderForm[inputId].validation
      );
      updatedOrderForm[inputId].valid = '' === updatedOrderForm[inputId].errorMessage;
    }

    updatedOrderForm[inputId].touched = true;

    let formIsValid = true;

    for (let key in updatedOrderForm) {
      if (!updatedOrderForm[key].valid) {
        formIsValid = false;
      }
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    })
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

    if (this.state.loading) {
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

export default ContactData;