import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
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
    error: false,
  };

  componentDidMount() {
    // AxiosOrder.get('https://burger-hl.firebaseio.com/ingredients.json')
    //   .then(response => {
    //       this.setState({
    //         ingredients: response.data
    //       });
    //   })
    //   .catch(error => {
    //     this.setState({error: true});
    //   });
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
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
    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

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
             orderMethod={this.purchaseHandler}/>
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (name) => dispatch({type: actions.ADD_INGREDIENT, ingredientName: name}),
    onRemoveIngredient: (name) => dispatch({type: actions.REMOVE_INGREDIENT, ingredientName: name}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, AxiosOrder));
