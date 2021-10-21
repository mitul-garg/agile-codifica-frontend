import React, { useContext } from "react";

import { AuthContext } from "../Authentication/AuthContext";

export const Home = () => {
  const auth = useContext(AuthContext);
  return (
    <div className="home-page">
      {!auth.isLoggedIn && <h1>NOT LOGGED IN</h1>}
      {auth.isLoggedIn && <h1>{auth.user.email}</h1>}
    </div>
  );
};
