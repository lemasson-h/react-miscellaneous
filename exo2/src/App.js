import React, { Component } from 'react';
import './App.css';
import CharComponent from './CharComponent/CharComponent';
import Input from './Input/Input';
import ValidationComponent from './ValidationComponent/ValidationComponent';

class App extends Component {
  state = {
      inputSize: 0,
      characters: [],
      currentInput: ""
  };

  inputChangedHandler = (event) => {
    this.setState({
      inputSize: event.target.value.length,
      characters: event.target.value.split(""),
      currentInput: event.target.value
    })
  }

  removeCharacterHandler = (index) => {
    const characters = [...this.state.characters];
    characters.splice(index, 1);

    this.setState({
      characters: characters,
      currentInput: characters.join("")
    });
  }

  render() {
    const chars = this.state.characters.map((c, index) => {
        return <CharComponent char={c} key={index} removeHandler={() => this.removeCharacterHandler(index)}/>;
    });

    return (
      <div className="App">
        <Input changeHandler={this.inputChangedHandler} currentValue={this.state.currentInput}/>
        <ValidationComponent inputSize={this.state.inputSize} />
        <p>Current text size: {this.state.inputSize}.</p>
        {chars}
      </div>
    );
  }
}

export default App;
