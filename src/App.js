import React, { Component, useState } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';
import _ from 'underscore';

//// AS CLASS 
class App extends Component {
  state = {
    people: [
      {id: 'p1', name: "Sam", age: 20},
      {id: 'p2', name: "Foo", age: 200},
      {id: 'p3', name: "Bar", age: 5},
    ],
    otherState: "some other value",
    showPersons: true,
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
        {id: 'p1', name: newNames.pop(), age: 20},
        {id: 'p2', name: newNames.pop(), age: 200},
        {id: 'p3', name: newNames.pop(), age: 5},
      ]
    });  
  };

  // Changes middle name to one provided by event
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.people.findIndex(p => {
      return p.id === id;
    });
    // Use spread operator to copy object (immutability)
    const person = {
      ...this.state.people[personIndex]
    };
    person.name = event.target.value;

    const people = [...this.state.people]; 
    people[personIndex] = person;

    this.setState({
      people: people,
    })
  };

  togglePersonHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    })
  };

  // Removes a person from the state array
  deletePersonHandler = (index) => {
    // Slice method copies array so state change is immutable
    // const people = this.state.people.slice();
    // Or use spread operator
    const people = [...this.state.people];
    // Remove person to be deleted
    people.splice(index, 1);
    // Update state with new array
    this.setState({
      people: people,
    });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      // Radium module allows use of pseudoselectors
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black',
      }
    };

    // Render persons if showPersons is true
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.people.map( (person, index) => {
            return ( <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id}
              change={ (event) => this.nameChangeHandler(event, person.id)}
            /> )
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black',
      };
    }

    const classes = [];
    if(this.state.people.length <= 2){
      classes.push('red');
    }
    if(this.state.people.length <= 1){
      classes.push('bold');
    }


    return (
      <StyleRoot>
      <div className="App">
        <h1>Hello world</h1>
        <p className={classes.join(' ')}>This is a paragraph</p>
        <button
          onClick={this.togglePersonHandler}
          style={style}  
        >
          Switch name
        </button>
        {persons}
      </div>
      </StyleRoot>
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


export default Radium(App);
