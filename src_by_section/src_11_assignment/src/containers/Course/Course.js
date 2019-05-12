import React, { Component } from 'react';

class Course extends Component {
    state = {
        courseTitle: '',
}

    componentDidMount () {
        this.parseQueryParams();
    }

    componentDidUpdate () {
        this.parseQueryParams();
    }

    parseQueryParams () {
        // console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        // console.log(query.entries() );
        for(let param of query.entries() ){
            if(param[0] === "title" && param[1] !== this.state.courseTitle) {
                this.setState({ courseTitle: param[1]})
            }
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;