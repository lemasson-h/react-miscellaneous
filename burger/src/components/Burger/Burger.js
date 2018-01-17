import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.css';

const burger = (props) => {
  let ingredients = Object.keys(props.ingredients)
    .map((ingredientName) => {
      console.log(ingredientName);
      return [...Array(props.ingredients[ingredientName])].map(
        (_, i) => {
          return <BurgerIngredient key={ingredientName + i} type={ingredientName} />
        }
      );
    })
    .reduce(
      (prev, next) => {
        return prev.concat(next);
      },
      []
    );

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {ingredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;
