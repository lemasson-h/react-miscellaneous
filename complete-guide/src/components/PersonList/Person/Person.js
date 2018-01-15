import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

class Person extends PureComponent {
  constructor(props) {
    super(props);

    console.log('[Person.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[Person.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount');
    if (this.props.position === 0) {
      this.inputElement.focus();
    }
  }

  render() {
    console.log('[Person.js] Inside render');

    const rnd = Math.random();

    // if (rnd > 0.7) {
    //     throw new Error('Something went wrong');
    // }

    return (
      <Aux>
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        {!!this.props.children ? <p>{this.props.children}</p> : null }
        <input
          ref={(inp) => {this.inputElement = inp}}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}/>
      </Aux>
    )
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);
