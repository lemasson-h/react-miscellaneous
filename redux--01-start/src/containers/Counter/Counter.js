import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
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
    onIncrementCounter: () => dispatch(actionCreators.increment()),
    onDecrementCounter: () => dispatch(actionCreators.decrement()),
    onAddCounter: (value) => dispatch(actionCreators.add(value)),
    onSubstractCounter: (value) => dispatch(actionCreators.substract(value)),
    onStoreResult: (counter) => dispatch(actionCreators.storeResult(counter)),
    onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
