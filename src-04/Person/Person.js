import React from 'react';
import './Person.css'

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click} >This person is {props.name}</p>
            <p>Age: {props.age}</p>
            <input type="text" onChange={props.change} value={props.name}></input> 
        </div>
    )
}

export default person;