import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      {
        id: 'person_1',
        name: 'Helene',
        age: 26
      },
      {
        id: 'person_2',
        name: 'Mathieu',
        age: 28
      },
      {
        id: 'person_3',
        name: 'Tobleron',
        age: 2
      }
    ],
    otherKey: "value",
    showPersons: false
  }

  deletePersonHandler = (key) => {
    const persons = this.state.persons;

    this.state.persons.splice(key, 1);
    this.setState({
      persons: persons
    });
  }

  nameChangedHandler = (event, id) => {
    const personIdx = this.state.persons.findIndex((p) => p.id  === id);
    const person = {
      ...this.state.persons[personIdx]
    };
    //Alternative
    //const person = Object.assign({}, this.state.persons[personIdx]);

    person.name = event.target.value;
    const persons = [...this.state.persons];

    persons[personIdx] = person;
    this.setState({
        persons: persons
      });
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  render() {
    const classesForP = [];
    let persons = null
    let buttonClass = null;

    if (this.state.persons.length <= 2) {
      classesForP.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      classesForP.push(classes.bold);
    }

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}>
              <Person
                name={person.name}
                age={person.age}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangedHandler(event, person.id)} />
              </ErrorBoundary>
          })}
        </div>)

        buttonClass = classes.red;
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I am a React app</h1>
          <p className={classesForP.join(' ')}>This is working!</p>
          <button
            className={buttonClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>
            {persons}
        </div>
    );
  }
}

export default App;
