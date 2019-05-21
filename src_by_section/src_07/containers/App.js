import React, { Component } from 'react';
import styles from './App.module.css';
// import Person from '../components/Persons/Person/Person';
import Persons from '../components/Persons/Persons';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
// import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
// import Radium, { StyleRoot } from 'radium';
import _ from 'underscore';
import Cockpit from '../components/Cockpit/Cockpit';
import AuthContext from '../context/auth-context';

//// AS CLASS 
class App extends Component {
  // constructor(props){
  //   super(props);
  //   console.log("[App.js] constructor " + props);
  // }

  state = {
    people: [
      {id: 'p1', name: "Sam", age: 20},
      {id: 'p2', name: "Foo", age: 200},
      {id: 'p3', name: "Bar", age: 5},
    ],
    otherState: "some other value",
    showPersons: true,
    authenticated: false,
  }

  static getDerivedStateFromProps(props, state){
    // console.log("[App.js] Get derived state from props " + props);
    return state;
  }

  componentDidMount() {
    // console.log('[App.js] mounted');
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
    // Simulate random chance of throwing error
    // if(Math.random() > 0.7 ){
    //   throw new Error("bad shit");
    // }

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

  loginHandler = () => {
    this.setState((prevState, prevProps) => {
      return {
        authenticated: ! prevState.authenticated,
      }
    });
  }

  render() {
    // console.log('[App.js] render ');
    // Render persons if showPersons is true
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          people={this.state.people}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        />
      );

    }

    return (
      <Aux>
        <AuthContext.Provider value={{
          status: this.state.authenticated,
          login: this.loginHandler,
        }}>
        <Cockpit
          people={this.state.people}
          clicked={this.togglePersonHandler}
          showPersons={this.state.showPersons}
        />
        {persons}
        </AuthContext.Provider>
      </Aux>
    );  
  }
}

export default withClass(App, styles.App);
