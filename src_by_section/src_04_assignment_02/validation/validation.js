import React from 'react';

const validation = (props) => {
    let message = "Good length";
    
    if (props.len === 0 ){
      message = "";
    }
    else if(props.len < 5){
      message = "Too short";
    } else if ( props.len > 10 ) {
      message = "Too long"
    }
  
    return (
      <p>{message}</p>
    )
  };

  export default validation;