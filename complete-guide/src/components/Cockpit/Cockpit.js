import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Cockpit.css';

const cockpit = (props) => {
  const classesForP = [];
  let buttonClass = classes.Button;

  if (props.persons.length <= 2) {
    classesForP.push(classes.red);
  }

  if (props.persons.length <= 1) {
    classesForP.push(classes.bold);
  }

  if (props.showPersons) {
      buttonClass = [classes.Button, classes.red].join(' ');
  }

  return (
    <Aux>
      <h1>{props.title}</h1>
      <p className={classesForP.join(' ')}>This is working!</p>
      <button
        className={buttonClass}
        onClick={props.togglePersonsHandler}>Toggle Persons</button>
    </Aux>
  );
}

export default cockpit;
