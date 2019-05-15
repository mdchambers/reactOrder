import React from 'react'

import classes from './Input.module.css';

const Input = (props) => {
    // console.log(props);

    const inpClassArr = [];
    inpClassArr.push(classes.InputElement);
    if(! props.valid) {
        inpClassArr.push(classes.Invalid);
    }  
    const inpClass = inpClassArr.join(' ' );
    // console.log(inpClass);

    let inputElement = null;
    switch(props.elementType){
        case('input'):
            inputElement = <input 
                className={inpClass} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case('textarea'):
            inputElement = <textarea 
                className={inpClass} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />;
            break;
        case('select'):
            inputElement = (
                <select
                    className={inpClass}
                    onChange={props.changed}
                    {...props.elementConfig}
                    value={props.value}>
                    {props.elementConfig.options.map( (opt) => {
                        // console.log(opt);
                        return <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    })}
                </select>
            ) 
        break
        default:
            inputElement = <input 
                className={inpClass} 
                {...props.elementConfig} 
                value={props.value}
            />;
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input