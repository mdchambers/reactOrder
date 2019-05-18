import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl => {
            return <BuildControl
                key={ctrl.type}
                label={ctrl.label}
                ingredientAdded={ () => props.ingredientAdded(ctrl.type, 1)}
                ingredientRemoved={ () => props.ingredientRemoved(ctrl.type, 1)}
                disabled={props.disabled[ctrl.type]}
            />
        })}
        <button 
            className={classes.OrderButton}
            disabled={ ! props.purchasable }
            onClick={ props.purchaseHandler }
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;