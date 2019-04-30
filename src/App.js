import React, { Component } from 'react';
import './App.css';
import Validation from './validation/validation';
import Char from './char/char';





class App extends Component {
  state = {
    input: "",
    inputLength: 0,
  };

  changeHandler = (event) => {
    const newInput = event.target.value;
    const newLen = newInput.length;
    this.setState({
      input: newInput,
      inputLength: newLen,
    });
  };

  deleteCharHandler = (idx) => {
    const newArr = this.state.input.split('');
    newArr.splice(idx, 1);
    const newInput = newArr.join('');
    this.setState({
      input: newInput,
      inputLength: newInput.length
    });
  };

  render(){
    const inputArr = this.state.input.split('');
    const inputCharComponents = inputArr.map( (c, idx) => {
      return (
        <Char
          character={c}
          click={ () => this.deleteCharHandler(idx) }
          key={idx}
        />
      );
    });

    return (
      <div className="App">
        <input 
          type="text" 
          value={this.state.input}
          onChange={this.changeHandler}
        ></input>
        <p>Input length: {this.state.inputLength}</p>
        <Validation len={this.state.inputLength} />
        {inputCharComponents}
      </div>
    );  
  }
}

export default App;
