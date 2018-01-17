import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

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
  }

  render (props) {
    const disabledInfo = {
      ...this.state.ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
           price={this.state.totalPrice}
           ingredients={this.state.ingredients}
           disabledInfo={disabledInfo}
           moreMethod={this.addIngredientHandler}
           lessMethod={this.removeIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
