import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

// Allows modification and error handling globally for all requests sent
axios.interceptors.request.use( request => {
    // console.log( request );
    return request;
}, error => {
    console.log( error );
    return Promise.reject(error);
});

// Allows modification and error handling globally for all responses received
axios.interceptors.response.use ( response => {
    // console.log( response );
    return response;
}, error => {
    console.log( error );
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
