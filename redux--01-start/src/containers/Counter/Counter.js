import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={() => this.props.onAddCounter(5)}  />
                <CounterControl label="Subtract 5" clicked={() => this.props.onSubstractCounter(5)}  />
                <hr />
                <button onClick={() => { this.props.onStoreResult(this.props.counter) } }>Store Result</button>
                <ul>
                  {this.props.storedResults.map(storeResult => {
                    return <li key={storeResult.id} onClick={() => { this.props.onDeleteResult(storeResult.id) }}>{storeResult.value}</li>;
                  })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    counter: state.counterReducerState.counter,
    storedResults: state.resultsReducerState.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
    onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
    onAddCounter: (value) => dispatch({type: actionTypes.ADD, value: value}),
    onSubstractCounter: (value) => dispatch({type: actionTypes.SUBSTRACT, value: value}),
    onStoreResult: (counter) => dispatch({type: actionTypes.STORE_RESULT, counter: counter}),
    onDeleteResult: (id) => dispatch({type: actionTypes.DELETE, id: id}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
