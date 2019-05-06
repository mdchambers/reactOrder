import React from 'react'

import classes from './NavigationItem.module.css';

const NavigationItem = (props) => {
    // if(props.active) { console.log("[NavigationItem.js] active") }
    return (
        <li className={classes.NavigationItem}>
            <a 
                className={props.active ? classes.active : null }
                href={props.link}
            >
                {props.children}
            </a>
        </li>
    )
}

export default NavigationItem
