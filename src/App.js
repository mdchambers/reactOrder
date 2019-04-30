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
    ],
    otherState: "some other value",
    showPersons: false,
  }

  // Randomly selects new names
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
  };

  // Changes middle name to one provided by event
  nameChangeHandler = (event) => {
    this.setState({
      people: [
        {name: "Sam", age: 20},
        {name: event.target.value, age: 200},
        {name: "Bar", age: 5},
      ]
    })
  };

  togglePersonHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    })
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    // Render persons if showPersons is true
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
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

    return (
      <div className="App">
        <h1>Hello world</h1>
        <button
          onClick={this.togglePersonHandler}
          style={style}  
        >
          Switch name
        </button>
        {persons}
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
