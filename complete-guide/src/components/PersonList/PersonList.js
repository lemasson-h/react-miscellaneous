import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Person from './Person/Person';

class PersonList extends Component {
  constructor(props) {
    super(props);

    console.log('[PersonList.js] Inside Constructor', props);
  }

  componentWillMount() {
    console.log('[PersonList.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[PersonList.js] Inside componentDidMount');
  }

  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE PersonList.js] Inside componentWillReceiveProps', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Update PersonList.js] Inside shouldComponentUpdate', nextProps, nextState);

    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE PersonList.js] Inside componentWillUpdate', nextProps, nextState);
  }

  render() {
    console.log('[PersonList.js] Inside render');

      let persons = null

      if (this.props.showPersons) {
        persons = (
            this.props.persons.map((person, index) => {
              return <ErrorBoundary key={person.id}>
                <Person
                  position={index}
                  name={person.name}
                  age={person.age}
                  click={() => this.props.clicked(index)}
                  changed={(event) => this.props.changed(event, person.id)} />
                </ErrorBoundary>
            })
          );
        }

      return <div>
        {persons}
      </div>;
  }
}

export default PersonList;
