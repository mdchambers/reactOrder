import React, { useEffect, useRef, useContext } from 'react';
import styles from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    const toggleBtnRef = useRef();

    const authContext = useContext(AuthContext);

    // Run only after first render (eqiv to componentDidMount?)
    useEffect(() => {
        // console.log("[Cockpit.js] useEffect mount")
        toggleBtnRef.current.click();
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
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}
            >
            Toggle names
            </button>
            <button onClick={authContext.login}>Log in</button>
        </div>
    );
};

export default Cockpit;