import React, { Component } from 'react';
import styles from './Person.module.css';
import Aux from '../../../hoc/Aux';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        console.log("[Person.js]" + this.inputElement);
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        // Can use 
        console.log(this.context.authenticated);
    }

    render() {
        return (
            <Aux>
            <div className={styles.Person}>
                { this.context.authenticated ? <p>AUTHENTICATED</p> : <p>NOT AUTHENTICATED</p> }
                <p onClick={this.props.click} >This person is {this.props.name}</p>
                <p>Age: {this.props.age}</p>
                <input 
                    type="text" 
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    onChange={this.props.change} 
                    value={this.props.name}>
                </input> 
            </div>
            </Aux>
        )
    }
}

// Uses prop-types package to enforce prop types during development
Person.propTypes = {
 click: PropTypes.func,
 name: PropTypes.string,
 age: PropTypes.number,
 change: PropTypes.func
};

export default Person;