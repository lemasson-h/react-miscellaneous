import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import AxiosOrder from '../../AxiosOrder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    AxiosOrder.get('https://burger-hl.firebaseio.com/ingredients.json')
      .then(response => {
          this.setState({
            ingredients: response.data
          });
      })
      .catch(error => {
        this.setState({error: true});
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(
        (ingredientName) => {
          return ingredients[ingredientName];
        }
      )
      .reduce(
        (prev, next) => {
          return prev + next;
        },
        0
      );

    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    const priceAddition = INGREDIENT_PRICES[type];
    const newTotalPrice = this.state.totalPrice + priceAddition;

    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return ;
    }

    const updatedCount = oldCount - 1;
    const priceAddition = INGREDIENT_PRICES[type];
    const newTotalPrice = this.state.totalPrice - priceAddition;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
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
      '/checkout?ingredients='
      + encodeURIComponent(JSON.stringify(this.state.ingredients))
      + '&totalPrice='
      + encodeURIComponent(this.state.totalPrice) 
    );
  }

  render (props) {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
             price={this.state.totalPrice}
             ingredients={this.state.ingredients}
             disabledInfo={disabledInfo}
             moreMethod={this.addIngredientHandler}
             lessMethod={this.removeIngredientHandler}
             purchasable={this.state.purchasable}
             orderMethod={this.purchaseHandler}/>
         </Aux>
      );
      orderSummary = <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, AxiosOrder);
