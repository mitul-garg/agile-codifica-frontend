import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Navigation } from "./Navigation/Navigation";
import { Home } from "./HomePage/Home";
import { Editorials } from "./Editorials/Editorials";
import { Write } from "./WriteEditorials/Write";
import { Login } from "./Authentication/pages/Login";
import { AuthContext } from "./Authentication/AuthContext";
import { MyEditorials } from "./MyEditorials/MyEditorials";
import { UpdateEditorial } from "./MyEditorials/UpdateEditorial";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const login = useCallback((user) => {
    setUser(user);
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/editorials" exact>
          <Editorials />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/editorials" exact>
          <Editorials />
        </Route>
        <Route path="/write" exact>
          <Write />
        </Route>
        <Route path="/myeditorials" exact>
          <MyEditorials />
        </Route>
        <Route path="/update/:id">
          <UpdateEditorial />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        user: user,
      }}
    >
      <Router>
        <Navigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
