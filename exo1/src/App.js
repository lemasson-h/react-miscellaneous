import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './Components/UserInput/UserInput';
import UserOutput from './Components/UserOutput/UserOutput';

class App extends Component {
  state = {
      username: "Ana"
  }

  changeUsernameHandler = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <UserInput onChangeHandler={this.changeUsernameHandler} defaultValue={this.state.username}/>
        <UserOutput username={this.state.username}/>
      </div>
    );
  }
}

export default App;
