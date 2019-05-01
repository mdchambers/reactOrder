import React from 'react';

const char = (props) => {
    const style = {
      display: 'inline-block',
      padding: '16px',
      textAlign: 'center',
      margin: '16px',
    //   width: '10px',
    //   height: '10px',
      border: '1px solid black',
    };
  
    return (
      <p 
        style={style}
        onClick={props.click}
      >
        {props.character}
      </p>
    )
  
  };

  export default char;