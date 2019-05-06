import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostID: null,
        hasError: false,
    }
    componentDidMount() {
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
                // Handle errors with getting posts
                this.setState({ hasError: true})
            })
    }

    postClickHandler (id) {
        console.log(id);
        this.setState({
            selectedPostID: id,
        })
    }

    render () {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if( ! this.state.hasError ) {
            posts = this.state.posts.map( p => {
                return (
                    <Post 
                        title={p.title}
                        author={p.author}
                        body={p.body}
                        key={p.id}
                        clicked={ () => this.postClickHandler(p.id) }
                    />
                )
            });
        }
        // console.log(posts);

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostID} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;