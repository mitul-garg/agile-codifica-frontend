import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../Authentication/AuthContext";

import "./NavLinks.css";

export const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/editorials" exact>
          Editorials
        </NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login" exact>
            Login
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/write" exact>
            Write
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && <button onClick={auth.logout}>Logout</button>}
    </ul>
  );
};
