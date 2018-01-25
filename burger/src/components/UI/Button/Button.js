import React from 'react';

import classes from './Button.css';

const button = (props) => (
  <button
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clickMethod}>{props.children}</button>
);

export default button;