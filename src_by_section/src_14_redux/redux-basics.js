const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  foo: 1,
  bar: "hello",
  counter: 0
};

// Reducer
// Initialize with default/initial state
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    // Always immutable
    return {
      ...state,
      counter: ++state.counter
    };
  }
  if (action.type === "ADD_COUNTER") {
    // Always immutable
    return {
      ...state,
      counter: state.counter + action.value
    };
  }
  return state;
};
// Store
// What is it?
const store = createStore(rootReducer);
console.log(store.getState());

///////////
// Subscription
// Notification if state values change

// Executed whenever state is updated
store.subscribe(() => {
  console.log("subscription");
});

// Dispatching action
// Always dispatch an obj with a type property
// By convention types are uppercase strings
// Whatever else you pass is personal pref; individual properties or bundled together into one obj
store.dispatch({ type: "INC_COUNTER" });
console.log(store.getState());
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log(store.getState());
