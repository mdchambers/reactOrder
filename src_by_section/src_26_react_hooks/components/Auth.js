import React, { useContext } from 'react'

import AuthContext from '../auth-context';

const Auth = () => {

  const auth = useContext(AuthContext);

  return (
    <div>
      <h1>Auth</h1>
      <button onClick={auth.login}>Login</button>
    </div>
  )
}

export default Auth
