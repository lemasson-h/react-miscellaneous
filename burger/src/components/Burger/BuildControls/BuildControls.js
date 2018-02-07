import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad'},
  { label: 'Bacon', type: 'bacon'},
  { label: 'Cheese', type: 'cheese'},
  { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(
        ctrl => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            disabledInfo={props.disabledInfo[ctrl.type]}
            moreMethod={() => props.moreMethod(ctrl.type)}
            lessMethod={() => props.lessMethod(ctrl.type)} />
        )
      )}
      <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.orderMethod}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN IN TO ORDER' }</button>
    </div>
);

export default buildControls;
