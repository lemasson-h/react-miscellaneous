import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import * as actionCreators from '../../store/actions';
import Button from '../../components/UI/Button/Button';
import { checkValidity } from '../../share/utility.js';
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
    if (!this.props.isBuildingBurger && this.props.redirectPath !== '/') {
      this.props.onAuthChangeRedirectPath();
    }
  }

  /** START DUPLICATE - To be refactorize **/

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
      updatedForm[inputId].errorMessage = checkValidity(
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
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.redirectPath} />;
    }

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
    isAuthenticated: null !== state.auth.token,
    redirectPath: state.auth.redirectPath,
    isBuildingBurger: state.burger.building
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (email, password, isSignup) => dispatch(actionCreators.authenticate(email, password, isSignup)),
    onAuthChangeRedirectPath: (path) => dispatch(actionCreators.authChangeRedirectPath('/')),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth));
