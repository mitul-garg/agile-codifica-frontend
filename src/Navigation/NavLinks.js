import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../Authentication/AuthContext";

import "./NavLinks.css";

export const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/editorials" exact className="nav-link">
          Editorials
        </NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login" exact className="nav-link">
            Login
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/write" exact className="nav-link">
            Write
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/myeditorials" exact className="nav-link">
            My Editorials
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={auth.logout} className="nav-link">
          Logout
        </li>
      )}
    </ul>
  );
};
