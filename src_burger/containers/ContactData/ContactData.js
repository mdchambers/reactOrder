import React, { Component } from 'react'
import dbase from '../../axios-orders';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

import classes from './ContactData.module.css';

export class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: "Mike",
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name',
                },
                value: "100 Foo St",
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP',
                },
                value: "12345",
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: "USA",
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: "foo@foo.com"
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [ { value: 'fastest', displayValue: 'Fastest'},
                                { value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: "Mike"
            },
        },
        loading: false,
    }

    orderHandler = (event) => {
        // Stop form from reloading page
        event.preventDefault();
        console.log(this.props);

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
        };
        console.log(order);
        dbase.post('/orders.json', order)
            .then( response => { 
                console.log(response);
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch( error => { 
                console.log(error);
                this.setState({ loading: false });
            })
    }

    render() {
        const order = ( 
            <React.Fragment>
            <h4>Enter your contact data</h4>
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Your Postal Code" />
                <Button btntype="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
            </React.Fragment>
        )
        return (
            <div className={classes.ContactData} >
                { this.state.loading ? <Spinner /> : order }
            </div>
        )
    }
}

export default ContactData
