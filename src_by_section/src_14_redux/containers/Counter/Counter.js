import React, { Component } from "react";

import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

import * as actionTypes from '../../store/actions';

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label="Increment"
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label="Decrement"
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl
          label="Add 5"
          clicked={this.props.onAddCounter}
        />
        <CounterControl
          label="Subtract 5"
          clicked={this.props.onSubtractCounter}
        />
        <hr/>
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store result</button>
        <ul>
            {this.props.res.map( (r, i) => {
                return (
                    <li key={r.id} onClick={ () => this.props.onRemoveResult(i) }>{r.val}</li>
                )
            })}
        </ul>
      </div>
    );
  }
}

// Takes in Redux state and returns an obj which is passed to Counter as props
const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    res: state.res.results,
  };
};

// Takes in Redux actions and returns on obj which is passed to Counter as props
const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT, }),
    onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT, }),
    onAddCounter: () => dispatch({ type: actionTypes.ADD, val: 10}),
    onSubtractCounter: () => dispatch({ type: actionTypes.SUBTRACT, val: 10}),
    onStoreResult: (val) => dispatch({ type: actionTypes.STORE, val: val}),
    onRemoveResult: (id) => dispatch({type: actionTypes.DELETE, idx: id}),
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
