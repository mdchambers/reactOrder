import React from 'react';
import Radium from 'radium';
import './Person.css'

const person = (props) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '450px',
        }
    }
    return (
        <div className="Person" style={style}>
            <p onClick={props.click} >This person is {props.name}</p>
            <p>Age: {props.age}</p>
            <input type="text" onChange={props.change} value={props.name}></input> 
        </div>
    )
}

export default Radium(person);