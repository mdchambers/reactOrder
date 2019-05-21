import React, { Component } from 'react';
import './App.css';


const UserInput = (props) => {
    return (
        <input type="text" onChange={props.change} value={props.username}></input>
    )
}

const UserOutput = (props) => {
    return (
        <p>{props.username} {props.children}</p>
    )
}

class App extends Component {
    state = {
        username: "Bramble",
    }

    usernameChangeHandler = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    render() {
        return(
            <div className="App">
                <UserInput username={this.state.username} change={this.usernameChangeHandler} />
                <button onClick={this.usernameChangeHandler}>Change Username</button>
                <UserOutput username={this.state.username} >Paragraph 1</UserOutput>
                <UserOutput>Paragraph 2</UserOutput>
            </div>
        )
    }
}

export default App