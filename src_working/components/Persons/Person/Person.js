import React from 'react';
import styles from './Person.module.css'

const person = (props) => {
    return (
        <div className={styles.Person}>
            <p onClick={props.click} >This person is {props.name}</p>
            <p>Age: {props.age}</p>
            <input type="text" onChange={props.change} value={props.name}></input> 
        </div>
    )
}

export default person;