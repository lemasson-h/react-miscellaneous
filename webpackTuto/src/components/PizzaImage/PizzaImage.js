import React from 'react';

import classes from './PizzaImage.css';
import PizzaImage from '../../assets/pizza.jpg';

const pizza = (props) => {
  return (
    <div className={classes.PizzaImageWrapper}>
      <img src={PizzaImage} className={classes.PizzaImage}/>
    </div>
  );
}

export default pizza;
