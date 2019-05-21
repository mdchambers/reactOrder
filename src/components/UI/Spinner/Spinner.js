import React from 'react'

import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <React.Fragment>
        {/* <p>Spinner</p> */}
        <div className={classes.DualRing}></div>
    </React.Fragment>
  )
}

export default Spinner
