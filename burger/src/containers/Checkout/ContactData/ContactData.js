import React, { Component } from 'react';

import AxiosOrder from '../../../AxiosOrder';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
    });

    // alert('You continue!');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'H L',
        address: {
          street: 'Teststreet 1',
          zipCode: '12345',
          country: 'United Kingdom',
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest',
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

  render () {
    let form = (
        <form>
          <input className={classes.Input} type='text' name='name' placeholder="Your name" />
          <input className={classes.Input} type='text' name='email' placeholder="Your email" />
          <input className={classes.Input} type='text' name='street' placeholder="Your street" />
          <input className={classes.Input} type='text' name='postCode' placeholder="postCode" />
          <Button buttonType="Success" clickMethod={this.orderHandler}>ORDER</Button>
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
