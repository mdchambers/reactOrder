import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentWillMount () {
            this.reqInter = axios.interceptors.request.use( 
                req => { this.setState({ error: null });
                return req;
            })
            this.resInter = axios.interceptors.response.use( 
                res => { return res },
                error => { this.setState({ error: error });
            })
        }

        // Remove interceptors when component unmounted to prevent multiple interceptors from being added (as this class is instanced for multiple components)
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.resInter);
        }
        
        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        <p>{ this.state.error ? this.state.error.message : "no error" }</p>
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler
