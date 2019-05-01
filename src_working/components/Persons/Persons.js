import React, { Component } from 'react';

import Person from './Person/Person';
// import AuthContext from '../../context/auth-context';


class Persons extends Component {

    // static getDerivedStateFromProps(props, state){
    //     console.log("[Persons.js] getDerivedStateFromProps");
    //     return state;
    // }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("[Persons.js] shouldComponentUpdate")
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // console.log("[Persons.js] getsnapshotbeforeupdate");
        return {message: 'from snapshot'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('[Persons.js] componentDidUpdate with snapshot: ' + snapshot.message);
    }

    render() {
        // console.log('[Persons.js] render');    
        return this.props.people.map( (person, index) => {
            return ( 
                <Person 
                    click={() => this.props.clicked(index)}
                    name={person.name} 
                    age={person.age} 
                    key={person.id}
                    change={ (event) => this.props.changed(event, person.id)}
                />
            )    
        });    
    }
}

export default Persons;