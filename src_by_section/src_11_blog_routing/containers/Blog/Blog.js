import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';


import Posts from './Posts/Posts';

// Standard
// import NewPost from './NewPost/NewPost';

// Implemented lazy loading
// import asyncComponent from '../../hoc/asyncComponent';
// const AsyncNewPost = asyncComponent( () => {
//     return import('./NewPost/NewPost')
// })

// Using react lazy
const NewPost = React.lazy( () => import('./NewPost/NewPost') );


class Blog extends Component {

    render () {
        return (
            <div>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                                to="/posts" 
                                exact 
                                activeClassName="my-active">Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: "#something",
                                search: "?a_thing",
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* Use render to render a function output */}
                {/* <Route path="/" exact render={ () => <h1>Home</h1> } /> */}
                {/* use component to render specific component */}
                <Switch>
                    {/* <Route path="/new-post" exact component={NewPost} /> */}
                    {/* If using lazy loading */}
                    <Route path="/new-post" exact render={ () => ( 
                        <Suspense fallback={ <div>Loading...</div> }>
                            <NewPost />
                        </Suspense> )} 
                    />
                    <Route path="/posts" component={Posts} />
                    {/* Redirect from / to /posts */}
                    {/* <Route path="/" component={Posts} /> */}
                    <Redirect from="/" to="/posts" />
                    {/* Route without path collects 404s */}
                    {/* <Route render={ () => <h1>404</h1> } /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;