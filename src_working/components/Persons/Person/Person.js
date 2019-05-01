import React from 'react';
import styles from './Person.module.css';
import Aux from '../../../hoc/Aux';

const person = (props) => {
    console.log('[Person.js] render');
    return (
        <Aux>
        <div className={styles.Person}>
            <p onClick={props.click} >This person is {props.name}</p>
            <p>Age: {props.age}</p>
            <input type="text" onChange={props.change} value={props.name}></input> 
        </div>
        </Aux>
    )
}

export default person;