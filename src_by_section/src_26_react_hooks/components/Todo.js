import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useFormImput } from '../hooks/forms';
import axios from "axios";

import List from "./List";



const Todo = props => {
  // useState must only be called at root level of function
  // const [todoName, setTodoName] = useState("");
  // const [inputValid, setInputValid] = useState(false);
  const [submittedTodo, setSubmittedTodo] = useState(null);
  // const todoInputRef = useRef();


  ///////// Custom hook
  const todoInput = useFormImput();

  ///////// TODO Implementation - state or reducer
  // Using a state
  // const [todoList, setTodoList] = useState([]);
  // Using a reducer
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload.id);
      default:
        return state;
    }
  };
  const [todoList, dispatch] = useReducer(todoListReducer, []);

  // Can store as a single state call using an object
  // Calls do not merge objects, so must reset all object properties when state is set
  // const [todoState, setTodoState  ] = useState({userInput: '', todoList: [] })

  // Runs when object rendered or rerenders
  // Pass empty array as second arg to run only on first render
  // Pass variables to watch for changes to rerun only when they change
  useEffect(() => {
    axios.get("https://tempproj1-64b93.firebaseio.com/todos.json").then(res => {
      let todos = [];
      for (let key in res.data) {
        todos.push({ id: key, data: res.data[key].todo });
      }
      // console.log(todos)
      // setTodoList(todos);
      dispatch({ type: "SET", payload: todos });
    });
    // Return a function to run only when object unmounts
    return () => {
      console.log("cleanup");
    };
  }, []);

  const mouseMoveHandler = event => {
    // console.log(event.clientX, event.clientY)
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  // Adds the newest todo to the state everytime submittedTodo is called
  // Prevents the system from "missing" todos if they're added too fast, i.e. before the first one is sent to the db successfully
  useEffect(() => {
    if (submittedTodo) {
      // setTodoList(todoList.concat(submittedTodo));
      dispatch({ type: "ADD", payload: submittedTodo });
    }
  }, [submittedTodo]);

  // now using a ref so comment out
  // const inputChangeHandler = event => {
  //   setTodoName(event.target.value);
  // };

  // const inputValidationHandler = event => {
  //   setInputValid(event.target.value.trim() !== "");
  // };

  const addTodoHandler = () => {
    const todoName = todoInput.value;

    axios
      .post("https://tempproj1-64b93.firebaseio.com/todos.json", {
        todo: todoName
      })
      .then(res => {
        // console.log(res);
        const newTodo = { id: res.data.name, data: todoName };
        setSubmittedTodo(newTodo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const removeTodoHandler = todo => {
    axios
      .delete(
        "https://tempproj1-64b93.firebaseio.com/todos/" + todo.id + ".json"
      )
      .then(res => {
        dispatch({ type: "REMOVE", payload: todo });
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Todo</h1>
      <input
        type="text"
        placeholder="Todo"
        // onChange={inputValidationHandler}
        // ref={todoInputRef}
        onChange={todoInput.onChanage}
        value={todoInput.value}
        style={{ backgroundColor: todoInput.validity ? "white" : "pink" }}
      />
      <button type="button" onClick={addTodoHandler}>
        Add
      </button>
      <div>
        {/* <List items={todoList} clickHandler={removeTodoHandler} /> */}
        {useMemo(
          () => (
            <List items={todoList} clickHandler={removeTodoHandler} />
          ),
          [todoList]
        )}
      </div>
    </div>
  );
};

export default Todo;
