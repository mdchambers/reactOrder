import React, { useEffect } from 'react';
import styles from './Cockpit.module.css';

const Cockpit = (props) => {

    // Run only on first render (eqiv to componentDidMount?)
    useEffect(() => {
        // console.log("[Cockpit.js] useEffect mount")
    }, []);
    // Run when props.people changes
    useEffect(() => {
        // console.log("[Cockpit.js] useEffect props.people");
    }, [props.people]);

    // console.log('[Cockpit.js] render');
    const classes = [];
    if(props.people.length <= 2){
      classes.push(styles.red);
    }
    if(props.people.length <= 1){
      classes.push(styles.bold);
    }

    const btnClass = props.showPersons ? null : styles.Red;
    return (
        <div className={styles.Cockpit}>
            <h1>Hello world</h1>
            <p className={classes.join(' ')}>This is a paragraph</p>
            <button
                className={btnClass}
                onClick={props.clicked}
            >
            Toggle names
            </button>
        </div>
    );
};

export default Cockpit;