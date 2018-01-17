import React from 'react';

import classes from './BuildControl.css';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less}
        disabled={props.disabledInfo}
        onClick={props.lessMethod}>Less</button>
      <button className={classes.More}
        onClick={props.moreMethod}>More</button>
    </div>
);

export default buildControl;
