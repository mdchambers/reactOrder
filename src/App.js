import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';
import _ from 'underscore';

//// AS CLASS 
class App extends Component {
  state = {
    people: [
      {name: "Sam", age: 20},
      {name: "Foo", age: 200},
      {name: "Bar", age: 5},
    ]
  }

  switchNameHandler = () => {
    // console.log("clicked");
    const randNames = [ "Grimley", "Garbo", "Grishmack", "Grubble", "Gaddlefly", "Gobble", "Greenhorn"];
    const newNames = _.sample(randNames, 3);  
    // if(newName){
    //   newNames[0] = newName;
    // }
    this.setState({
      people: [
        {name: newNames.pop(), age: 20},
        {name: newNames.pop(), age: 200},
        {name: newNames.pop(), age: 5},
      ]
    });  
  }

  nameChangeHandler = (event) => {
    this.setState({
      people: [
        {name: "Sam", age: 20},
        {name: event.target.value, age: 200},
        {name: "Bar", age: 5},
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    return (
      <div className="App">
        <h1>Hello world</h1>
        <button
          onClick={this.switchNameHandler}
          style={style}  
        >
          Switch name
        </button>
        <Person name={this.state.people[0].name} />
        <Person 
          name={this.state.people[1].name} 
          click={this.switchNameHandler}
          change={this.nameChangeHandler}
        />
        <Person name={this.state.people[2].name} />
      </div>
    );  
  }
}

//// AS FUNCTION
// const App = (props) => {
//   const [ personState, setPersonState ] = useState({
//     people: [
//       {name: "Sam", age: 20},
//       {name: "Foo", age: 200},
//       {name: "Bar", age: 5},
//     ],    
//   });

//   const [ otherState, setOtherState ] = useState("some data");

//   const switchNameHandler = () => {
//     // console.log("clicked");
//     const randNames = [ "Grimley", "Garbo", "Grishmack", "Grubble", "Gaddlefly", "Gobble", "Greenhorn"];
//     const newNames = _.sample(randNames, 3);
//     setPersonState({
//       people: [
//         {name: newNames[0], age: 20},
//         {name: newNames[1], age: 200},
//         {name: newNames[2], age: 5},
//       ]
//     });
//   }

//   return (
//     <div className="App">
//       <h1>Hello world</h1>
//       <button onClick={switchNameHandler}>Switch name</button>
//       <ul>
//         <li><Person 
//           name={personState.people[0].name} /></li>
//         <li><Person 
//           name={personState.people[1].name} /></li>
//         <li><Person 
//           name={personState.people[2].name} /></li>
//       </ul>
//     </div>
//   );
// }


export default App;
