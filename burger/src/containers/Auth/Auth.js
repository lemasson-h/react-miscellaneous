import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
      controls: {
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Mail address',
            },
            value: '',
            validation: {
              required: true,
              isEmail: true,
            },
            valid: false,
            errorMessage: '',
            touched: false,
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'Password',
            },
            value: '',
            validation: {
              required: true,
              minLength: 7,
            },
            valid: false,
            errorMessage: '',
            touched: false,
          },
      },
      formIsValid: false,
      isSignup: false,
  };

  componentWillMount()
  {
    console.log(this.state.isSignup);
  }

  componentDidMount()
  {
    console.log(this.state.isSignup);
  }

  /** START DUPLICATE - To be refactorize **/

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

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!pattern.test(value)) {
          return 'Invalid email';
        }
    }

    return '';
  }

  inputChangeHandler = (event, inputId) => {
    const updatedForm = {
      ...this.state.controls,
      [inputId]: {
        ...this.state.controls[inputId],
        value: event.target.value,
        touched: true,
      }
    };

    if (updatedForm[inputId].validation) {
      updatedForm[inputId].errorMessage = this.checkValidity(
        updatedForm[inputId].value,
        updatedForm[inputId].validation
      );
      updatedForm[inputId].valid = '' === updatedForm[inputId].errorMessage;
    }

    let formIsValid = true;

    for (let key in updatedForm) {
      if (!updatedForm[key].valid) {
        formIsValid = false;
      }
    }

    this.setState({
      controls: updatedForm,
      formIsValid: formIsValid,
    })
  }

  /** END DUPLICATE - To be refactorize **/

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAuthenticate(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <div>
          <form>
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
            {/* <Button buttonType="Success" disabled={!this.state.formIsValid} >ORDER</Button> */}
            <Button buttonType="Success" clickMethod={this.submitHandler}>Login</Button>
          </form>
          <Button
            clickMethod={this.switchAuthModeHandler}
            buttonType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP' }</Button>
        </div>
      );
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    return (
      <div className={classes.Auth}>
          {errorMessage}
          {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password, isSignup) => dispatch(actionCreators.authenticate(email, password, isSignup)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);