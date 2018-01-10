import React, { Component } from 'react';
import classes from './App.css';
import Cockpit from './components/Cockpit/Cockpit';
import PersonList from './components/PersonList/PersonList';
import Aux from './hoc/Aux';
import withClass from './hoc/withClass';

class App extends Component {
  constructor(props) {
    super(props);

    console.log('[App.js] Inside Constructor', props);

    this.state = {
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
      showPersons: false,
      toggleClicked: 0
    }
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }

  // state = {
  //   persons: [
  //     {
  //       id: 'person_1',
  //       name: 'Helene',
  //       age: 26
  //     },
  //     {
  //       id: 'person_2',
  //       name: 'Mathieu',
  //       age: 28
  //     },
  //     {
  //       id: 'person_3',
  //       name: 'Tobleron',
  //       age: 2
  //     }
  //   ],
  //   otherKey: "value",
  //   showPersons: false
  // }

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
    this.setState( (prevState, props) => {
      return {
        showPersons: !prevState.showPersons,
        toggleClicked: prevState.toggleClicked + 1
        };
    });
  }

  render() {
    console.log('[App.js] Inside render');

    return (
        <Aux>
            <button onClick={() => {this.setState({showPersons: true});}}>Show Persons</button>
            <Cockpit
              title={this.props.title}
              persons={this.state.persons}
              togglePersonsHandler={this.togglePersonsHandler}
              showPersons={this.state.showPersons} />
            <PersonList persons={this.state.persons}
              showPersons={this.state.showPersons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler}/>
        </Aux>
    );
  }
}

export default withClass(App, classes.App);
