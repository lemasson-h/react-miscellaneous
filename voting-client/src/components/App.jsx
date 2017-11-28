import React, {Component} from 'react';
import {List} from 'immutable';
import Voting from './Voting';

const pair = List.of('Trainspotting', '28 Days Later');

export default class App extends Component {
  render() {
    var children = this.props.children;
    
    return React.cloneElement(children, {pair: pair});
  }
}
