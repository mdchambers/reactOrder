import React from 'react';


// Use as in React.Fragment to wrap a piece of JSX
// const withClass = props => (
//     <div className={props.classes}>
//         {props.children}
//     </div>
// );

// Use as a function that returns a function; wrap around the export statement of each component
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
}

export default withClass;