import React, { useState } from "react";
import "./App.css";

import Todo from "./components/Todo";
import Header from "./components/Header";
import Auth from "./components/Auth";

import AuthContext from "./auth-context";

const views = {
  auth: "auth",
  todo: "todo"
};

const App = props => {
  const [page, setPage] = useState(views.todo);
  const [authStatus, setAuthStatus] = useState(false);

  const toggleTodoHandler = () => {
    setPage(views.todo);
  };

  const toggleAuthHandler = () => {
    setPage(views.auth);
  };

  const login = () => {
    setAuthStatus(!authStatus);
  };

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          status: authStatus,
          login: login
        }}
      >
        <Header
          onLoadTodos={toggleTodoHandler}
          onLoadAuth={toggleAuthHandler}
        />
        {page === views.todo ? <Todo /> : null}
        {page === views.auth ? <Auth /> : null}
      </AuthContext.Provider>
    </div>
  );
};

// const App = props => {

//   const [ layout, setLayout ] = useState({ authVisible: false, todoVisible: false })

//   const toggleTodoHandler = () => {
//     setLayout({
//       todoVisible: !layout.todoVisible,
//       authVisible: layout.authVisible
//     })
//   }

//   const toggleAuthHandler = () => {
//     setLayout({
//       todoVisible: layout.todoVisible,
//       authVisible: !layout.authVisible
//     })
//   }

//   return (
//     <div className="App">
//       <Header onLoadTodos={toggleTodoHandler} onLoadAuth={toggleAuthHandler} />
//       {layout.todoVisible ? <Todo /> : null }
//       {layout.authVisible ? <Auth /> : null }
//     </div>
//   );
// };

export default App;
