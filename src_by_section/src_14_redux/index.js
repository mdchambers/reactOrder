import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultsReducer,
})

// Custom middleware (executes when dispatch occurs)
// This middlware does nothing
const logger = state => {
    return next => {
        return action => {
            // console.log('[middleware] dispatching', action);
            const result = next(action);
            // console.log('[middlware] next state', state.getState() );
            return result;
        }
    }
}
// Define reduer in store/reducer.js but create store here
const store = createStore(rootReducer, applyMiddleware(logger, thunk) );


// Wrap App in Provider to give it access to redux store
ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));
registerServiceWorker();
