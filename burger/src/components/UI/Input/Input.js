import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        onChange={props.changeMethod}
        className={ inputClasses.join(' ') }
       {...props.elementConfig}
      value={props.value}/>;
      break;
    case ('textarea'):
      inputElement = <textarea
        onChange={props.changeMethod}
        className={ inputClasses.join(' ') }
       {...props.elementConfig}
       value={props.value}/>;
      break;
    case ('select'):
      inputElement = (
        <select
          onChange={props.changeMethod}
          className={ inputClasses.join(' ') }
          value={props.value}>
          {props.elementConfig.options.map(option => {
            return <option key={option.value} value={option.value}>{option.displayValue}</option>;
          })}
       </select>
      );
      break;
    default:
      inputElement = <input
        onChange={props.changeMethod}
        className={ inputClasses.join(' ') }
       {...props.elementConfig}
       value={props.value}/>;
  }

  return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
      </div>
  );
};

export default input;