import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
    const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
          {/*<Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Anne Marie')}
            changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age}/>
            */}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I am a React app</h1>
        {/*The function binding can be inefficient, prefer the bind version: onClick={() => this.switchNameHandler('Ghislaine') }*/}
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
      </div>
    );
    // return React.createElement(
    //   'div',
    //   {className: 'App'},
    //   React.createElement(
    //     'h1',
    //     null,
    //     'Hi, I\'m a React App!!!'
    //   )
    // );
  }
}

export default App;
