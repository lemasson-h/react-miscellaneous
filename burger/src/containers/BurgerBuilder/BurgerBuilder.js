import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index'; //This will load index.js in the directory
import Aux from '../../hoc/Aux/Aux';
import AxiosOrder from '../../AxiosOrder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 4,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.props.onLoadIngredients();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.onAuthChangeRedirectPath('/checkout');
      this.props.history.push('/login');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();

    this.props.history.push(
      '/checkout'
    );
  }

  render (props) {
    const disabledInfo = {
      ...this.props.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls
             price={this.props.totalPrice}
             ingredients={this.props.ingredients}
             disabledInfo={disabledInfo}
             moreMethod={this.props.onAddIngredient}
             lessMethod={this.props.onRemoveIngredient}
             purchasable={this.props.purchasable}
             orderMethod={this.purchaseHandler}
             isAuthenticated={this.props.isAuthenticated}/>
         </Aux>
      );
      orderSummary = <OrderSummary
        price={this.props.totalPrice}
        ingredients={this.props.ingredients}
        cancelMethod={this.purchaseCancelHandler}
        continueMethod={this.purchaseContinueHandler}
      />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchasable: state.burger.purchasable,
    error: state.burger.error,
    isAuthenticated: null !== state.auth.token,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (name) => dispatch(actionCreators.addIngredient(name)),
    onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient(name)),
    onLoadIngredients: () => dispatch(actionCreators.loadIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onAuthChangeRedirectPath: (path) => dispatch(actionCreators.authChangeRedirectPath(path)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, AxiosOrder));
