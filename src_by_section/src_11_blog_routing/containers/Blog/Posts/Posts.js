import React, { Component } from 'react'
import axios from '../../../axios';
import { Route, Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

export class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        // console.log(this.props);
        axios.get('/posts')
            .then( response => {
                // console.log(response)
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map( p => {
                    return {
                        ...p,
                        author: 'Ozymandius',
                    }
                });
                this.setState({
                    posts: updatedPosts,
                })
            })
            .catch( error => {
                console.log(error);
                // Handle errors with getting posts
                // this.setState({ hasError: true})
            })
    }

    postClickHandler (id) {
        console.log(id);
        this.setState({
            selectedPostID: id,
        })
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if( ! this.state.hasError ) {
            posts = this.state.posts.map( p => {
                return (
                    <Link to={'/posts/' + p.id} key={p.id}>
                        <Post 
                            title={p.title}
                            author={p.author}
                            body={p.body}
                            clicked={ () => this.postClickHandler(p.id) }
                        />
                    </Link>
                )
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />                
            </div>
        )
    }
}

export default Posts
